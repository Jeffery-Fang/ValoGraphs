import { createManyMatchStat, createOneMatchStat } from '../src/services/match_stat_service'
import { MatchStat } from '../src/entities/MatchStat'

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
    rounds_blue_won: 13,
    rounds_red_won: 9,
    won: true,
    numRounds: 22,
    date: new Date(),
}

describe('testing createOneMatchStat()', (): void => {
    test('should return a MatchStat object with specified values if successful', (): void => {
        const response: MatchStat = createOneMatchStat(
            testData.playerData,
            testData.match_id,
            testData.map,
            testData.mode,
            testData.rounds_blue_won,
            testData.rounds_red_won,
            testData.won,
            testData.numRounds,
            testData.date
        )

        expect(response.player.id).toBe(testData.playerData.puuid)
        expect(response.match_id).toBe(testData.match_id)
        expect(response.map).toBe(testData.map)
        expect(response).toBeInstanceOf(MatchStat)
    })

    test('should throw an error with invalid input', (): void => {
        expect(() => {
            createOneMatchStat(
                undefined,
                testData.match_id,
                testData.map,
                testData.mode,
                testData.rounds_blue_won,
                testData.rounds_red_won,
                testData.won,
                testData.numRounds,
                testData.date
            )
        }).toThrow('error creating a matchstat')
    })
})

describe('testing createManyMatchStat()', (): void => {
    test('should return an array of MatchStat objects with specified values if successful', (): void => {
        const testArray = [testData, testData]
        const response: MatchStat[] = createManyMatchStat(testArray)

        for (let i: number = 0; i < testArray.length; i++) {
            expect(response[i].player.id).toBe(testArray[i].playerData.puuid)
            expect(response[i].match_id).toBe(testArray[i].match_id)
            expect(response[i].map).toBe(testArray[i].map)
            expect(response[i]).toBeInstanceOf(MatchStat)
        }
    })

    test('should throw an error with invalid input', (): void => {
        const testArray = [testData, testData, {}]

        expect(() => {
            createManyMatchStat(testArray)
        }).toThrow('error creating many matchstats')
    })
})
