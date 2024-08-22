import { retrieveDataForPlayer } from '../src/services/val_api_service'

const mockFetch = jest.fn()
global.fetch = mockFetch
const mockData = [
    {
        metadata: {
            match_id: ' e5467da1-f1d3-4a49-bebc-f790b0f34959',
            map: {
                name: 'Fracture',
            },
            queue: {
                name: 'unrated',
            },
        },
        players: [
            {
                puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
                name: 'Hexennacht',
                tag: 'NA1',
                team_id: 'Blue',
            },
        ],
        teams: [
            {
                team_id: 'Red',
                rounds: {
                    won: 4,
                    lost: 13,
                },
                won: true,
                premier_roster: null,
            },
        ],
        rounds: [
            {
                result: 'Elimination',
            },
        ],
    },
    {
        metadata: {
            match_id: ' e5467da1-f1d3-4a49-bebc-f790b0f34959',
            map: {
                name: 'Fracture',
            },
            queue: {
                name: 'unrated',
            },
        },
        players: [
            {
                puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
                name: 'Hexennacht',
                tag: 'NA1',
                team_id: 'Blue',
            },
        ],
        teams: [
            {
                team_id: 'Blue',
                rounds: {
                    won: 4,
                    lost: 13,
                },
                won: true,
                premier_roster: null,
            },
        ],
        rounds: [
            {
                result: 'Elimination',
            },
        ],
    },
]

describe('testing retrieveDataForPlayer()', (): void => {
    test('should return an object containing searched_player_id and match_data if successful', async (): Promise<void> => {
        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: mockData,
            }),
        })
        let response = await retrieveDataForPlayer('Hexennacht', 'NA1', 'unrated', 10)

        expect(Object.keys(response)).toContain('searched_player_id')
        expect(Object.keys(response)).toContain('match_data')
    })

    test('should throw an error if the api call responds with an error', async (): Promise<void> => {
        try {
            mockFetch.mockResolvedValue(undefined)

            await retrieveDataForPlayer('Hexennacht', 'NA1', 'unrated', 10)
        } catch (e) {
            expect(e).toBe('no response from henrikdev API')
        }
    })

    test('should throw an error if the api call responds with an error', async (): Promise<void> => {
        try {
            mockFetch.mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    errors: 'some errors',
                }),
            })

            await retrieveDataForPlayer('Hexennacht', 'NA1', 'unrated', 10)
        } catch (e) {
            expect(e).toBe('some errors')
        }
    })

    test("should throw an error if the player being searched for isn't contained in the response", async (): Promise<void> => {
        try {
            mockFetch.mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    data: mockData,
                }),
            })

            await retrieveDataForPlayer('OtherGuy', 'NA1', 'unrated', 10)
        } catch (e) {
            expect(e).toBe('specified player was not in retrieved data')
        }
    })
})
