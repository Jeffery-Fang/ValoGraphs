import express, { Request, Response, Router } from 'express'
import 'dotenv/config'
import { MatchStat } from '../entities/MatchStat.js'
import { createManyMatchStat } from '../services/matchStatServices.js'
import { getIdFromNameTag } from '../services/playerServices.js'

const userUrlRoot: string = <string>process.env.USER_URL_ROOT
const apiKey: string = <string>process.env.API_KEY
const router: Router = express.Router()

router.get('/:name', async (req: Request, res: Response): Promise<void> => {
    try {
        if (
            req.params.name == undefined ||
            req.query.tag == undefined ||
            req.query.mode == undefined ||
            req.query.size == undefined
        ) {
            throw 'invalid input'
        }

        let name: string = <string>req.params.name
        let tag: string = <string>req.query.tag
        let mode: string = ['unrated', 'competitive', 'teamdeathmatch'].includes(<string>req.query.mode)
            ? <string>req.query.mode
            : 'competitive'
        let size: number = Number(req.query.size) <= 10 && Number(req.query.size) > 0 ? Number(req.query.size) : 5
        let url: string = (userUrlRoot + '/' + name + '/' + tag + '?mode=' + mode + '&size=' + size) as string
        let options: RequestInit = {
            method: 'GET',
            headers: {
                Authorization: apiKey,
            },
        }
        const response = await (await fetch(url, options)).json()
        let data = []

        //console.log(url);

        if (response == undefined) {
            throw 'no response from henrikdev API'
        }
        if (Object.keys(response).includes('errors')) {
            throw response.errors
        }

        //console.log(response["data"].length, size);

        for (let match of response['data']) {
            for (let playerData of match['players']) {
                let won: boolean = false
                let numRounds: number = 0

                for (let team of match['teams']) {
                    if (playerData['team_id'] == team['team_id']) {
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

        //await createManyPlayer(Object.values(players));

        const stats: MatchStat[] = await createManyMatchStat(data)
        const puuid: string = await getIdFromNameTag(name, tag)

        //console.log(name, tag, puuid);
        const out = stats.filter((stat: MatchStat): boolean => {
            return stat.player.id == puuid
        })

        //console.log(out);
        res.status(200).send(out)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

export default router
