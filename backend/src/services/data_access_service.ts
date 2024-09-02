import { AppDataSource } from '../data-source.js'
import { MatchStat } from '../entities/MatchStat.js'

/**
 * Gets the MatchStat objects associated for the match for each of the 10 player in the match
 *
 * @param match_id - The match_id of the match
 * @returns An array of 10 MatchStat objects, one for each of the players that participated in the match
 */
export async function getFromMatchId(match_id: string): Promise<MatchStat[]> {
    try {
        const matchStatRepository = AppDataSource.getRepository(MatchStat)
        const players: MatchStat[] | null = await matchStatRepository.find({
            relations: {
                player: true,
            },
            where: {
                match_id: match_id,
            },
        })

        return players
    } catch (err) {
        throw err
    }
}

/**
 * Saves the MatchStat object to the database
 *
 * @param matchStat - The MatchStat to be saved
 */
export async function saveOneMatchStat(matchStat: MatchStat): Promise<void> {
    try {
        const matchStatRepository = AppDataSource.getRepository(MatchStat)
        await matchStatRepository.save(matchStat)
    } catch (err) {
        throw 'error saving one matchstat'
    }
}

/**
 *  Saves multiple MatchStat objects to the database
 *
 * @param matchStats - The array of MatchStat objects to be saved
 */
export async function saveManyMatchStat(matchStats: MatchStat[]): Promise<void> {
    try {
        const matchStatRepository = AppDataSource.getRepository(MatchStat)
        await matchStatRepository.save(matchStats)
    } catch (err) {
        throw 'error saving many matchstats'
    }
}
