import { MatchStat } from '../entities/MatchStat.js'
import { Player } from '../entities/Player.js'

/**
 * @param playerData - Generic data about a match extracted from the response of the henkrikDev Api
 * @param match_id - The match_id of the match
 * @param map - The map the match was played on
 * @param mode - The mode of the match
 * @param rounds_blue_won - The number of rounds the blue team won
 * @param rounds_red_won - The number of rounds the red team won
 * @param won - Whether the player associated with this data won or not
 * @param numRounds - The number of rounds the game lasted
 * @param date - The date the game was played
 * @returns The MatchStat object that was created from the input data
 */
export function createOneMatchStat(
    playerData: any,
    match_id: string,
    map: string,
    mode: string,
    rounds_blue_won: number,
    rounds_red_won: number,
    won: boolean,
    numRounds: number,
    date: Date
): MatchStat {
    try {
        const matchStat: MatchStat = new MatchStat(
            new Player(playerData['puuid'], playerData['name'], playerData['tag']),
            match_id,
            Number((playerData['stats']['score'] / numRounds).toFixed(2)),
            playerData['stats']['kills'],
            playerData['stats']['deaths'],
            playerData['stats']['assists'],
            Number(
                (
                    (playerData['stats']['damage']['dealt'] - playerData['stats']['damage']['received']) /
                    numRounds
                ).toFixed(2)
            ),
            Number((playerData['stats']['damage']['dealt'] / numRounds).toFixed(2)),
            Math.round(
                (playerData['stats']['headshots'] /
                    (playerData['stats']['headshots'] +
                        playerData['stats']['bodyshots'] +
                        playerData['stats']['legshots'])) *
                    100
            ),
            playerData['agent']['name'],
            map,
            mode,
            rounds_blue_won,
            rounds_red_won,
            won,
            playerData['team_id'],
            date,
            playerData['agent']['id'],
            playerData['customization']['card']
        )

        return matchStat
    } catch (err) {
        throw 'error creating a matchstat'
    }
}

/**
 * Creates a MatchStat object with associated data from each element in the input array and saves them to the database
 *
 * @param packagedData - An array of objects with the same parameters as createOneMatchStat()
 * @returns An array containing all the MatchStat objects created from the input data
 */
export function createManyMatchStat(packagedData: any): MatchStat[] {
    try {
        let stats: MatchStat[] = []

        for (let data of packagedData) {
            const matchStat: MatchStat = createOneMatchStat(
                data.playerData,
                data.match_id,
                data.map,
                data.mode,
                data.rounds_blue_won,
                data.rounds_red_won,
                data.won,
                data.numRounds,
                data.date
            )
            stats.push(matchStat)
        }

        stats.sort((a: MatchStat, b: MatchStat): number => b.date.getTime() - a.date.getTime())

        return stats
    } catch (err) {
        throw 'error creating many matchstats'
    }
}
