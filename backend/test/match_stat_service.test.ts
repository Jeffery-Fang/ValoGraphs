import { createManyMatchStat, createOneMatchStat } from '../src/services/match_stat_service'
import { MatchStat } from '../src/entities/MatchStat'
import { mockPackagedData } from './mockData'

describe('testing createOneMatchStat()', (): void => {
    test('should return a MatchStat object with specified values if successful', (): void => {
        const response: MatchStat = createOneMatchStat(
            mockPackagedData.playerData,
            mockPackagedData.match_id,
            mockPackagedData.map,
            mockPackagedData.mode,
            mockPackagedData.rounds_blue_won,
            mockPackagedData.rounds_red_won,
            mockPackagedData.won,
            mockPackagedData.numRounds,
            mockPackagedData.date
        )

        expect(response.player.id).toBe(mockPackagedData.playerData.puuid)
        expect(response.match_id).toBe(mockPackagedData.match_id)
        expect(response.map).toBe(mockPackagedData.map)
        expect(response.mode).toBe(mockPackagedData.mode)
        expect(response).toBeInstanceOf(MatchStat)
    })

    test('should throw an error with invalid input', (): void => {
        expect(() => {
            createOneMatchStat(
                undefined,
                mockPackagedData.match_id,
                mockPackagedData.map,
                mockPackagedData.mode,
                mockPackagedData.rounds_blue_won,
                mockPackagedData.rounds_red_won,
                mockPackagedData.won,
                mockPackagedData.numRounds,
                mockPackagedData.date
            )
        }).toThrow('error creating a matchstat')
    })
})

describe('testing createManyMatchStat()', (): void => {
    test('should return an array of MatchStat objects with specified values if successful', (): void => {
        const testArray = [mockPackagedData, mockPackagedData]
        const response: MatchStat[] = createManyMatchStat(testArray)

        for (let i: number = 0; i < testArray.length; i++) {
            expect(response[i].player.id).toBe(testArray[i].playerData.puuid)
            expect(response[i].match_id).toBe(testArray[i].match_id)
            expect(response[i].map).toBe(testArray[i].map)
            expect(response[i]).toBeInstanceOf(MatchStat)
        }
    })

    test('should throw an error with invalid input', (): void => {
        const testArray = [mockPackagedData, mockPackagedData, {}]

        expect(() => {
            createManyMatchStat(testArray)
        }).toThrow('error creating many matchstats')
    })
})
