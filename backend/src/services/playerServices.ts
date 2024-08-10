import { Player } from '../entities/Player.js'
import { AppDataSource } from '../data-source.js'

/**
 * Creates a single Player object in the database with associated values
 *
 * @param playerID - The player_id of the player
 * @param playerName The name of the player
 * @param playerTag - The tag of the player
 * @returns The Player object that was created from the input data
 */
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

/**
 * Saves each Player object in the array to the database
 *
 * @param players - An array of Player Objects
 * @returns An array containing the Player objects saved to the database
 */
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

/**
 * Gets the player_id associated with the name and tag provided
 *
 * @param playerName - The name of the player
 * @param playerTag - The tag of the player
 * @returns The player_id of the player associated with the input name and tag
 */
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

/**
 * Creates a Player object with dummy values
 *
 * @returns A Player object with dummy values
 */
export function createDummyPlayer(): Player {
    const dummy: Player = new Player('dummy_player_id', 'dummy_player_name', 'dummy_player_tag')

    return dummy
}
