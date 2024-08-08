import { MatchStat } from '../src/entities/MatchStat'
import { createDummyMatchStat, createManyMatchStat, createOneMatchStat } from '../src/services/matchStatServices.js'
import { AppDataSource } from '../src/data-source.js'
import { createDummyPlayer } from '../src/services/playerServices'

jest.mock('../src/data-source.js', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}))

const testData = {
    playerData: {
        puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
        name: 'Hexennacht',
        tag: 'NA1',
        stats: {
            score: 3645,
            kills: 14,
            deaths: 12,
            assists: 3,
            headshots: 12,
            bodyshots: 27,
            legshots: 2,
            damage: {
                dealt: 2773,
                received: 2378,
            },
        },
        agent: {
            name: 'Cypher',
        },
        team_id: 'Blue',
    },
    match_id: 'a9a6fb43-3094-4568-9180-046116d39eab',
    map: 'Pearl',
    mode: 'Unrated',
    won: true,
    numRounds: 22,
    date: new Date(),
}

describe('testing createDummyMatchStat()', (): void => {
    test('should return MatchStat object with dummy values if successful', (): void => {
        const response: MatchStat = createDummyMatchStat()

        expect(response.player).toStrictEqual(createDummyPlayer())
        expect(response).toBeInstanceOf(MatchStat)
    })
})

describe('testing createOneMatchStat()', (): void => {
    beforeEach((): void => {
        const mockRepository = {
            save: jest.fn().mockResolvedValue(true),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
    })

    test('should return a Match Stat object with specified values if successful', async (): Promise<void> => {
        const response: MatchStat = await createOneMatchStat(
            testData.playerData,
            testData.match_id,
            testData.map,
            testData.mode,
            testData.won,
            testData.numRounds,
            testData.date
        )

        expect(response.player.id).toBe(testData.playerData.puuid)
        expect(response.match_id).toBe(testData.match_id)
        expect(response.map).toBe(testData.map)
        expect(response).toBeInstanceOf(MatchStat)
    })

    test('should return a Match Stat object with dummy values if there is an error', async (): Promise<void> => {
        const mockRepository = {
            save: jest.fn().mockImplementationOnce(() => {
                throw new Error('Error saving MatchStat to the database')
            }),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)

        const response: MatchStat = await createOneMatchStat(
            testData.playerData,
            testData.match_id,
            testData.map,
            testData.mode,
            testData.won,
            testData.numRounds,
            testData.date
        )

        expect(response.player.id).toBe(createDummyPlayer().id)
        expect(response.player.name).toBe(createDummyPlayer().name)
        expect(response.player.tag).toBe(createDummyPlayer().tag)
        expect(response).toBeInstanceOf(MatchStat)
    })
})

describe('testing createManyMatchStat()', (): void => {
    beforeEach((): void => {
        const mockRepository = {
            save: jest.fn().mockResolvedValue(true),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
    })

    test('should return a array of MatchStat objects with specified values if successful', async (): Promise<void> => {
        const testArray = [testData, testData]
        const response: MatchStat[] = await createManyMatchStat(testArray)

        for (let i: number = 0; i < testArray.length; i++) {
            expect(response[i].player.id).toBe(testArray[i].playerData.puuid)
            expect(response[i].match_id).toBe(testArray[i].match_id)
            expect(response[i].map).toBe(testArray[i].map)
            expect(response[i]).toBeInstanceOf(MatchStat)
        }
    })

    test('should return a array of MatchStat with a dummy MatchStat if there is an error', async (): Promise<void> => {
        const mockRepository = {
            save: jest.fn().mockImplementationOnce(() => {
                throw new Error('Error saving MatchStat to the database')
            }),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)

        const testArray = [testData, testData]
        const response: MatchStat[] = await createManyMatchStat(testArray)

        expect(response.length).toBe(1)
        expect(response[0].player.id).toBe(createDummyPlayer().id)
        expect(response[0].player.name).toBe(createDummyPlayer().name)
        expect(response[0].player.tag).toBe(createDummyPlayer().tag)
        expect(response[0]).toBeInstanceOf(MatchStat)
    })
})
