import express, { Request, Response, Router } from 'express'
import 'dotenv/config'
import { MatchStat } from '../entities/MatchStat.js'
import { getPlayersFromMatchId } from '../services/matchStatServices.js'

const router: Router = express.Router()

/**
 * Route that given a match_id will return a list of MatchStats associated with
 * that match
 */
router.get('/:match_id', async (req: Request, res: Response): Promise<void> => {
    try {
        const response: MatchStat[] = await getPlayersFromMatchId(req.params.match_id)

        if (response === undefined) {
            throw 'Error retrieving match stats from the database'
        }

        res.status(200).json(response)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

export default router
