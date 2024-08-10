import { MatchStat } from '../entities/MatchStat.js'
import { AppDataSource } from '../data-source.js'
import { Player } from '../entities/Player.js'
import { createDummyPlayer } from './playerServices.js'

export async function createOneMatchStat(
    playerData: any,
    match_id: string,
    map: string,
    mode: string,
    won: boolean,
    numRounds: number,
    date: Date
): Promise<MatchStat> {
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
            won,
            playerData['team_id'],
            date
        )

        const matchStatRepository = AppDataSource.getRepository(MatchStat)
        await matchStatRepository.save(matchStat)

        return matchStat
    } catch (err) {
        console.log('Error creating a MatchStat', err)
        return createDummyMatchStat()
    }
}

export async function createManyMatchStat(packagedData: any): Promise<MatchStat[]> {
    try {
        let stats: MatchStat[] = []

        for (let data of packagedData) {
            const matchStat: MatchStat = new MatchStat(
                new Player(data.playerData['puuid'], data.playerData['name'], data.playerData['tag']),
                data.match_id,
                Number((data.playerData['stats']['score'] / data.numRounds).toFixed(2)),
                data.playerData['stats']['kills'],
                data.playerData['stats']['deaths'],
                data.playerData['stats']['assists'],
                Number(
                    (
                        (data.playerData['stats']['damage']['dealt'] - data.playerData['stats']['damage']['received']) /
                        data.numRounds
                    ).toFixed(2)
                ),
                Number((data.playerData['stats']['damage']['dealt'] / data.numRounds).toFixed(2)),
                Math.round(
                    (data.playerData['stats']['headshots'] /
                        (data.playerData['stats']['headshots'] +
                            data.playerData['stats']['bodyshots'] +
                            data.playerData['stats']['legshots'])) *
                        100
                ),
                data.playerData['agent']['name'],
                data.map,
                data.mode,
                data.won,
                data.playerData['team_id'],
                data.date
            )
            stats.push(matchStat)
        }

        const matchStatRepository = AppDataSource.getRepository(MatchStat)
        await matchStatRepository.save(stats)

        stats.sort((a: MatchStat, b: MatchStat): number => b.date.getTime() - a.date.getTime())

        return stats
    } catch (err) {
        console.log('Error creating a MatchStat', err)
        return [createDummyMatchStat()]
    }
}

export async function getPlayersFromMatchId(match_id: string): Promise<MatchStat[]> {
    try {
        const matchStatRepository = AppDataSource.getRepository(MatchStat)
        const players =
            (await matchStatRepository.find({
                relations: {
                    player: true,
                },
                where: {
                    match_id: match_id,
                },
            })) || []

        return players
    } catch (err) {
        console.log('Error getting MatchStats', err)
        return [createDummyMatchStat()]
    }
}

export function createDummyMatchStat(): MatchStat {
    const dummy: MatchStat = new MatchStat(
        createDummyPlayer(),
        'dummy_match_id',
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        'dummy_agent',
        'dummy_map',
        'dummy_mode',
        false,
        'red',
        new Date()
    )

    return dummy
}
