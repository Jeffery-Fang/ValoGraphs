import { Request, Response } from 'express'
import { getMatchStatsFromMatchId } from '../services/data_access_service.js'
import { MatchStat } from '../entities/MatchStat.js'

export default async function matchesHandler(req: Request, res: Response): Promise<void> {
    try {
        const response: MatchStat[] = await getMatchStatsFromMatchId(req.params.match_id)

        res.status(200).json(response)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
