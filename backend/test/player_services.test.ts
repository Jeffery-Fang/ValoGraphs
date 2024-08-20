import { Player } from '../src/entities/Player.js'
import {
    createDummyPlayer,
    createManyPlayer,
    createOnePlayer,
    getIdFromNameTag,
} from '../src/services/player_services.js'
import { AppDataSource } from '../src/data-source.js'

jest.mock('../src/data-source.js', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}))

describe('testing createDummyPlayer', (): void => {
    test('should return Player object with dummy values if successful', (): void => {
        const response: Player = createDummyPlayer()

        expect(response.id).toBe('dummy_player_id')
        expect(response).toBeInstanceOf(Player)
    })
})

describe('testing createOnePlayer()', (): void => {
    beforeEach((): void => {
        const mockRepository = {
            save: jest.fn().mockResolvedValue(true),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
    })

    test('should return a Player object with specified values if successful', async (): Promise<void> => {
        const response: Player = await createOnePlayer('8918b04d-9034-5838-b3ed-dd7ae3efe5e5', 'Hexennacht', 'NA1')

        expect(response.id).toBe('8918b04d-9034-5838-b3ed-dd7ae3efe5e5')
        expect(response.name).toBe('Hexennacht')
        expect(response.tag).toBe('NA1')
        expect(response).toBeInstanceOf(Player)
    })

    test('should return a Player object with dummy values if there is an error', async (): Promise<void> => {
        const mockRepository = {
            save: jest.fn().mockImplementationOnce(() => {
                throw new Error('Error saving to the database')
            }),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const response: Player = await createOnePlayer('8918b04d-9034-5838-b3ed-dd7ae3efe5e5', 'Hexennacht', 'NA1')

        expect(response.id).toBe('dummy_player_id')
        expect(response).toBeInstanceOf(Player)
    })
})

describe('testing createManyPlayer()', (): void => {
    beforeEach((): void => {
        const mockRepository = {
            createQueryBuilder: jest.fn(),
        }
        mockRepository.createQueryBuilder.mockReturnValue({
            insert: () => ({
                into: () => ({
                    values: () => ({
                        orIgnore: () => ({
                            execute: jest.fn().mockResolvedValue(true),
                        }),
                    }),
                }),
            }),
        })
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
    })

    test('should return an array of Player objects with specified values if successful', async (): Promise<void> => {
        {
            const player1 = new Player('8918b04d-9034-5838-b3ed-dd7ae3efe5e5', 'Hexennacht', 'NA1')
            const player2 = new Player('e7642965-86e7-5be2-9926-cb42d7ebca0e', 'Ratman123', 'Rat')
            const players: Player[] = [player1, player2]
            const response: Player[] = await createManyPlayer(players)

            expect(response[0].id).toBe(player1.id)
            expect(response[0].name).toBe(player1.name)
            expect(response[0].tag).toBe(player1.tag)
            expect(response[0]).toBeInstanceOf(Player)
            expect(response[1].id).toBe(player2.id)
            expect(response[1].name).toBe(player2.name)
            expect(response[1].tag).toBe(player2.tag)
            expect(response[1]).toBeInstanceOf(Player)
            expect(response.length).toBe(players.length)
        }
    })

    test('should return an array of Player objects with dummy values if there is an error', async (): Promise<void> => {
        const mockRepository = {
            save: jest.fn().mockResolvedValue(true),
            createQueryBuilder: jest.fn(),
        }
        mockRepository.createQueryBuilder.mockReturnValue({
            insert: () => ({
                into: () => ({
                    values: () => ({
                        orIgnore: () => ({
                            execute: jest.fn().mockImplementationOnce(() => {
                                throw new Error('Error saving to the database')
                            }),
                        }),
                    }),
                }),
            }),
        })
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const player1 = new Player('8918b04d-9034-5838-b3ed-dd7ae3efe5e5', 'Hexennacht', 'NA1')
        const player2 = new Player('e7642965-86e7-5be2-9926-cb42d7ebca0e', 'Ratman123', 'Rat')
        const players: Player[] = [player1, player2]
        const response: Player[] = await createManyPlayer(players)

        expect(response[0].id).toBe('dummy_player_id')
        expect(response[0]).toBeInstanceOf(Player)
    })
})

describe('testing getIdFromNameTag()', (): void => {
    beforeEach((): void => {
        const mockRepository = {
            findOne: jest.fn().mockImplementation(() => {
                throw new Error('Error getting finding player in the database')
            }),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
    })

    test('should return correct player_id if the player exists', async (): Promise<void> => {
        const mockRepository = {
            findOne: jest.fn().mockResolvedValueOnce({ id: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5' }),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const response: string = await getIdFromNameTag('Hexennacht', 'NA1')

        expect(response).toBe('8918b04d-9034-5838-b3ed-dd7ae3efe5e5')
    })

    test("should return dummy player_id if the player doesn't exist", async (): Promise<void> => {
        const response: string = await getIdFromNameTag('Elsa Kanzaki', 'COLD')

        expect(response).toBe('dummy_player_id')
    })

    test('should return dummy player_id if there is a database error', async (): Promise<void> => {
        const mockRepository = {
            findOne: jest.fn().mockResolvedValueOnce(null),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const response: string = await getIdFromNameTag('Elsa Kanzaki', 'COLD')

        expect(response).toBe('dummy_player_id')
    })
})
