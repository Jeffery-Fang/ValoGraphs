import express, { Request, Response, Router } from 'express'
import 'dotenv/config'
import { MatchStat } from '../entities/MatchStat.js'
import { createManyMatchStat } from '../services/matchStatServices.js'
import { getIdFromNameTag } from '../services/playerServices.js'

const playerUrlRoot: string = <string>process.env.USER_URL_ROOT
const apiKey: string = <string>process.env.API_KEY
const router: Router = express.Router()

/**
 * Route that given a player name, player tag, gamemode and size(number of results to return)
 * retrives that number of matches of the specified gamemode for the specified player from the
 * henrikDev API and saves them to a database before returning those results
 */
router.get('/:name', async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.query.tag === undefined || req.query.mode === undefined || req.query.size === undefined) {
            throw 'invalid input'
        }

        let name: string = <string>req.params.name
        let tag: string = <string>req.query.tag
        let mode: string = ['unrated', 'competitive', 'teamdeathmatch'].includes(<string>req.query.mode)
            ? <string>req.query.mode
            : 'competitive'
        let size: number = Number(req.query.size) <= 10 && Number(req.query.size) > 0 ? Number(req.query.size) : 5
        let url: string = (playerUrlRoot + '/' + name + '/' + tag + '?mode=' + mode + '&size=' + size) as string
        let options: RequestInit = {
            method: 'GET',
            headers: {
                Authorization: apiKey,
            },
        }

        const apiResponse = await (await fetch(url, options)).json()
        let data = []

        console.log(url, apiResponse)

        if (apiResponse === undefined) {
            throw 'no response from henrikdev API'
        }
        if (Object.keys(apiResponse).includes('errors')) {
            throw apiResponse.errors
        }

        for (let match of apiResponse['data']) {
            for (let playerData of match['players']) {
                let won: boolean = false
                let numRounds: number = 0

                for (let team of match['teams']) {
                    if (playerData['team_id'] === team['team_id']) {
                        won = team['won']
                    }
                }

                for (let round of match['rounds']) {
                    if (round['result'] != 'Surrendered') {
                        numRounds += 1
                    }
                }

                data.push({
                    playerData: playerData,
                    match_id: match['metadata']['match_id'],
                    map: match['metadata']['map']['name'],
                    mode: match['metadata']['queue']['name'],
                    won: won,
                    numRounds: numRounds,
                    date: new Date(match['metadata']['started_at']),
                })
            }
        }

        const stats: MatchStat[] = await createManyMatchStat(data)
        const puuid: string = await getIdFromNameTag(name, tag)
        const response: MatchStat[] = stats.filter((stat: MatchStat): boolean => {
            return stat.player.id === puuid
        })

        res.status(200).send(response)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

export default router
