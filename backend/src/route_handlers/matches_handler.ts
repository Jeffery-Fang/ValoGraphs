import { Request, Response } from 'express'
import { retrieveMatchData } from '../services/val_api_service.js'
import { createManyMatchStat } from '../services/match_stat_service.js'
import { getFromMatchId, saveManyMatchStat } from '../services/data_access_service.js'
import { MatchStat } from '../entities/MatchStat.js'

export default async function matchesHandler(req: Request, res: Response): Promise<void> {
    try {
        const response: MatchStat[] = await getFromMatchId(req.params.match_id)

        if (response.length < 10) {
            let data = await retrieveMatchData(req.params.match_id)
            let matchStats: MatchStat[] = createManyMatchStat(data)

            res.status(200).json(matchStats)
            await saveManyMatchStat(matchStats)
        } else {
            res.status(200).json(response)
        }
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
