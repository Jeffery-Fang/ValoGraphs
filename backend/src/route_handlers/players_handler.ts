import { Request, Response } from 'express'
import { retrievePlayerData } from '../services/val_api_service.js'
import { createManyMatchStat } from '../services/match_stat_service.js'
import { saveManyMatchStat } from '../services/data_access_service.js'
import { MatchStat } from '../entities/MatchStat.js'

export default async function playersHandler(req: Request, res: Response): Promise<void> {
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

        let data = await retrievePlayerData(name, tag, mode, size)
        let matchStats: MatchStat[] = createManyMatchStat(data.match_data)
        const puuid: string = data.searched_player_id

        const response: MatchStat[] = matchStats.filter((stat: MatchStat): boolean => {
            return stat.player.id === puuid
        })

        res.status(200).json(response)
        await saveManyMatchStat(matchStats)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
