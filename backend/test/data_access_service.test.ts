import { AppDataSource } from '../src/data-source'
import { getMatchStatsFromMatchId, saveOneMatchStat, saveManyMatchStat } from '../src/services/data_access_service'
import { MatchStat } from '../src/entities/MatchStat'

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
            id: '569fdd95-4d10-43ab-ca70-79becc718b46',
        },
        customization: {
            card: '7cf06550-432c-8840-f9c7-a6b71ee8521a',
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

describe('testing getMatchStatsFromMatchId()', (): void => {
    test('should call find with the input match_id', async (): Promise<void> => {
        const mockRepository = {
            find: jest.fn(),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const match_id: string = 'a9a6fb43-3094-4568-9180-046116d39eab'
        const response: MatchStat[] = await getMatchStatsFromMatchId(match_id)

        expect(mockRepository.find).toHaveBeenCalledWith({
            relations: {
                player: true,
            },
            where: {
                match_id: match_id,
            },
        })
    })

    test('should throw an error if no players are found', async (): Promise<void> => {
        try {
            const mockRepository = {
                find: jest.fn().mockResolvedValue(null),
            }
            ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
            const match_id: string = 'a9a6fb43-3094-4568-9180-046116d39eab'
            const response: MatchStat[] = await getMatchStatsFromMatchId(match_id)
        } catch (e) {
            expect(e).toBe('found no players associated with provided match_id')
        }
    })

    test('should throw an error if no players are found', async (): Promise<void> => {
        try {
            const mockRepository = {
                find: jest.fn().mockResolvedValue(null),
            }
            ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
            const match_id: string = 'a9a6fb43-3094-4568-9180-046116d39eab'
            const response: MatchStat[] = await getMatchStatsFromMatchId(match_id)
        } catch (e) {
            expect(e).toBe('found no players associated with provided match_id')
        }
    })

    test('should throw an error if there is a database error', async (): Promise<void> => {
        try {
            const mockRepository = {
                find: jest.fn().mockImplementation(() => {
                    throw 'database error'
                }),
            }
            ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
            const match_id: string = 'a9a6fb43-3094-4568-9180-046116d39eab'
            const response: MatchStat[] = await getMatchStatsFromMatchId(match_id)
        } catch (e) {
            expect(e).toBe('database error')
        }
    })
})

describe('testing saveOneMatchStat()', (): void => {
    test('should have been called with the matchstat inputted if successful', async (): Promise<void> => {
        const mockRepository = {
            save: jest.fn(),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const response = await saveOneMatchStat({} as MatchStat)

        expect(mockRepository.save).toHaveBeenCalledWith({})
        expect(mockRepository.save).toHaveBeenCalledTimes(1)
    })

    test('should throw error if there is a database error', async (): Promise<void> => {
        try {
            const mockRepository = {
                save: jest.fn().mockImplementation(() => {
                    throw 'database error'
                }),
            }
            ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
            const response = await saveOneMatchStat({} as MatchStat)
        } catch (e) {
            expect(e).toBe('error saving one matchstat')
        }
    })
})

describe('testing saveManyMatchStat()', (): void => {
    test('should have been called with the matchstats inputted if successful', async (): Promise<void> => {
        const mockRepository = {
            save: jest.fn(),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const response = await saveManyMatchStat([{} as MatchStat, {} as MatchStat])

        expect(mockRepository.save).toHaveBeenCalledWith([{}, {}])
        expect(mockRepository.save).toHaveBeenCalledTimes(1)
    })

    test('should throw error if there is a database error', async (): Promise<void> => {
        try {
            const mockRepository = {
                save: jest.fn().mockImplementation(() => {
                    throw 'database error'
                }),
            }
            ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
            const response = await saveManyMatchStat([{} as MatchStat, {} as MatchStat])
        } catch (e) {
            expect(e).toBe('error saving many matchstats')
        }
    })
})
