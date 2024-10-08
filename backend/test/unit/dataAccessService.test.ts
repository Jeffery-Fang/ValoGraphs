import { AppDataSource } from '../../src/data-source'
import { getFromMatchId, saveOneMatchStat, saveManyMatchStat } from '../../src/services/dataAccessService'
import { MatchStat } from '../../src/entities/MatchStat'
import { mockMatchStat } from '../mockData'

jest.mock('../../src/data-source.js', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}))

describe('testing getFromMatchId()', (): void => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should call getRepository() and find() with MatchStat and match_id respectively', async (): Promise<void> => {
        const mockRepository = {
            find: jest.fn(),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const match_id: string = 'a9a6fb43-3094-4568-9180-046116d39eab'
        const response: MatchStat[] = await getFromMatchId(match_id)

        expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
        expect(mockRepository.find).toHaveBeenCalledWith({
            relations: {
                player: true,
            },
            where: {
                match_id: match_id,
            },
        })
    })

    test('should throw an error if there is an error getting the repository', async (): Promise<void> => {
        try {
            ;(AppDataSource.getRepository as jest.Mock).mockImplementation(() => {
                throw 'error finding repository'
            })
            const match_id: string = 'a9a6fb43-3094-4568-9180-046116d39eab'
            const response: MatchStat[] = await getFromMatchId(match_id)

            expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
        } catch (e) {
            expect(e).toBe('error finding repository')
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
            const response: MatchStat[] = await getFromMatchId(match_id)

            expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
            expect(mockRepository.find).toHaveBeenCalledWith({
                relations: {
                    player: true,
                },
                where: {
                    match_id: match_id,
                },
            })
        } catch (e) {
            expect(e).toBe('database error')
        }
    })
})

describe('testing saveOneMatchStat()', (): void => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should call getRepository() and save() with MatchStat and mockMatchStat respectively', async (): Promise<void> => {
        test
        const mockRepository = {
            save: jest.fn(),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const response = await saveOneMatchStat(mockMatchStat)

        expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
        expect(mockRepository.save).toHaveBeenCalledWith(mockMatchStat)
    })

    test('should throw an error if there is an error getting the repository', async (): Promise<void> => {
        try {
            ;(AppDataSource.getRepository as jest.Mock).mockImplementation(() => {
                throw 'error finding repository'
            })
            const response = await saveOneMatchStat(mockMatchStat)

            expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
        } catch (e) {
            expect(e).toBe('error saving one matchstat')
        }
    })

    test('should throw error if there is a database error', async (): Promise<void> => {
        try {
            const mockRepository = {
                save: jest.fn().mockImplementation(() => {
                    throw 'database error'
                }),
            }
            ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
            const response = await saveOneMatchStat(mockMatchStat)

            expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
            expect(mockRepository.save).toHaveBeenCalledWith(mockMatchStat)
        } catch (e) {
            expect(e).toBe('error saving one matchstat')
        }
    })
})

describe('testing saveManyMatchStat()', (): void => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should call getRepository() and save() with MatchStat and [mockMatchStat, mockMatchStat] respectively', async (): Promise<void> => {
        const mockRepository = {
            save: jest.fn(),
        }
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
        const response = await saveManyMatchStat([mockMatchStat, mockMatchStat])

        expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
        expect(mockRepository.save).toHaveBeenCalledWith([mockMatchStat, mockMatchStat])
    })

    test('should throw an error if there is an error getting the repository', async (): Promise<void> => {
        try {
            ;(AppDataSource.getRepository as jest.Mock).mockImplementation(() => {
                throw 'error finding repository'
            })
            const response = await saveManyMatchStat([mockMatchStat, mockMatchStat])

            expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
        } catch (e) {
            expect(e).toBe('error saving many matchstats')
        }
    })

    test('should throw error if there is a database error', async (): Promise<void> => {
        try {
            const mockRepository = {
                save: jest.fn().mockImplementation(() => {
                    throw 'database error'
                }),
            }
            ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)
            const response = await saveManyMatchStat([mockMatchStat, mockMatchStat])

            expect(AppDataSource.getRepository).toHaveBeenCalledWith(MatchStat)
            expect(mockRepository.save).toHaveBeenCalledWith([mockMatchStat, mockMatchStat])
        } catch (e) {
            expect(e).toBe('error saving many matchstats')
        }
    })
})
