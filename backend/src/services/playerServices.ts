import { Player } from '../entities/Player.js'
import { AppDataSource } from '../data-source.js'

export async function createOnePlayer(playerID: string, playerName: string, playerTag: string): Promise<Player> {
    try {
        const player: Player = new Player(playerID, playerName, playerTag)

        const playerRepository = AppDataSource.getRepository(Player)
        await playerRepository.save(player)

        return player
    } catch (err) {
        console.log('Error creating a Player', err)
        return createDummyPlayer()
    }
}

export async function createManyPlayer(players: Player[]): Promise<Player[]> {
    try {
        const playerRepository = AppDataSource.getRepository(Player)
        await playerRepository.createQueryBuilder().insert().into(Player).values(players).orIgnore().execute()

        return players
    } catch (err) {
        console.log('Error creating a Player', err)
        return [createDummyPlayer()]
    }
}

export async function getIdFromNameTag(playerName: string, playerTag: string): Promise<string> {
    try {
        const playerRepository = AppDataSource.getRepository(Player)
        const player: Player =
            (await playerRepository.findOne({
                where: {
                    name: playerName,
                    tag: playerTag,
                },
            })) || createDummyPlayer()

        return player.id
    } catch (err) {
        console.log('Error getting Id from name + tag', err)
        return createDummyPlayer().id
    }
}

export function createDummyPlayer(): Player {
    const dummy: Player = new Player('dummy_player_id', 'dummy_player_name', 'dummy_player_tag')

    return dummy
}
