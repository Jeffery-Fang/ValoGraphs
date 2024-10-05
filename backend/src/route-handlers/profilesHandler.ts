import { Request, Response } from 'express'
import { retrieveProfileData } from '../services/valApiService.js'
import { createManyMatchStat } from '../services/matchStatService.js'
import { MatchStat } from '../entities/MatchStat.js'

export default async function profilesHandler(req: Request, res: Response): Promise<void> {
    try {
        if (
            req.query.tag === undefined ||
            req.query.mode === undefined ||
            req.query.page === undefined ||
            req.query.region === undefined
        ) {
            throw 'invalid input'
        }

        let name: string = <string>req.params.name
        let tag: string = <string>req.query.tag
        let mode: string = ['unrated', 'competitive', 'teamdeathmatch'].includes(<string>req.query.mode)
            ? <string>req.query.mode
            : 'competitive'
        let page: number = Number(req.query.page) > 0 ? Number(req.query.page) : 1
        let region: string = ['na', 'eu', 'latam', 'br', 'ap', 'kr'].includes(<string>req.query.region)
            ? <string>req.query.region
            : 'na'

        let data = await retrieveProfileData(name, tag, mode, page, region)
        let matchStats: MatchStat[] = createManyMatchStat(data)

        res.status(200).json(matchStats)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
