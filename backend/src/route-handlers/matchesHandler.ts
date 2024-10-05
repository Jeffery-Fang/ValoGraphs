import { Request, Response } from 'express'
import { retrieveMatchData } from '../services/valApiService.js'
import { createManyMatchStat } from '../services/matchStatService.js'
import { getFromMatchId, saveManyMatchStat } from '../services/dataAccessService.js'
import { MatchStat } from '../entities/MatchStat.js'

export default async function matchesHandler(req: Request, res: Response): Promise<void> {
    try {
        const response: MatchStat[] = await getFromMatchId(req.params.match_id)

        if (response.length < 10) {
            if (req.query.region === undefined) {
                throw 'invalid input'
            }

            let region: string = ['na', 'eu', 'latam', 'br', 'ap', 'kr'].includes(<string>req.query.region)
                ? <string>req.query.region
                : 'na'
            let data = await retrieveMatchData(req.params.match_id, region)
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
