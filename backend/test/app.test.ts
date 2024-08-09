import { default as request } from 'supertest'
import http from 'http'
import 'dotenv/config'
import app from '../src/app.js'
import { MatchStat } from '../src/entities/MatchStat.js'
import { createManyMatchStat } from '../src/services/matchStatServices.js'
import { getIdFromNameTag } from '../src/services/playerServices'

let server: http.Server
const playerUrlRoot: string = <string>process.env.USER_URL_ROOT
const apiKey: string = <string>process.env.API_KEY

const mockFetch = jest.fn()
global.fetch = mockFetch

jest.mock('../src/services/matchStatServices')
jest.mock('../src/services/playerServices')

beforeAll((done): void => {
    server = app.listen(3000, (): void => {
        done()
    })
})

afterAll((done): void => {
    server.close((): void => {
        done()
    })
})

describe('testing GET /user', (): void => {
    beforeEach((): void => {
        const mockApiResponse = {
            data: [
                {
                    metadata: {
                        match_id: 'a9a6fb43-3094-4568-9180-046116d39eab',
                        map: {
                            name: 'Pearl',
                        },
                        queue: {
                            name: 'Unrated',
                        },
                    },
                    players: [
                        {
                            team_id: 'blue',
                        },
                    ],
                    teams: [
                        {
                            team_id: 'blue',
                            won: true,
                        },
                    ],
                    rounds: [
                        {
                            result: 'Defuse',
                        },
                    ],
                },
            ],
        }
        const mockStats = [
            {
                player: {
                    id: 'a9a6fb43-3094-4568-9180-046116d39eab',
                },
            },
        ]

        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockApiResponse),
        })
        ;(createManyMatchStat as jest.Mock).mockResolvedValue(mockStats)
        ;(getIdFromNameTag as jest.Mock).mockResolvedValue('a9a6fb43-3094-4568-9180-046116d39eab')
    })

    test('should return a list of MatchStat objects if successful', async (): Promise<void> => {
        const response = await request(app).get('/players/Hexennacht?tag=NA1&mode=unrated&size=5')
        const mockStats = [
            {
                player: {
                    id: 'a9a6fb43-3094-4568-9180-046116d39eab',
                },
            },
        ]

        expect(response.status).toBe(200)
        expect(mockFetch).toHaveBeenCalledWith(playerUrlRoot + '/Hexennacht/NA1?mode=unrated&size=5', {
            headers: { Authorization: apiKey },
            method: 'GET',
        })
        expect(response).toBeDefined()
        expect(response.body).toStrictEqual(mockStats)
    })

    test('should return 400 if require parameters are missing', async () => {
        const response = await request(app).get('/players/Hexennacht')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'invalid input' })
    })

    test('should return 400 if the external API returns errors', async () => {
        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                errors: 'Some API error',
            }),
        })
        const response = await request(app).get('/players/Hexennacht?tag=NA1&mode=unrated&size=5')

        expect(response.status).toBe(400)
        expect(mockFetch).toHaveBeenCalledWith(playerUrlRoot + '/Hexennacht/NA1?mode=unrated&size=5', {
            headers: { Authorization: apiKey },
            method: 'GET',
        })
        expect(response.body).toEqual({ error: 'Some API error' })
    })

    test('should return 400 if no response from the external API', async () => {
        mockFetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(undefined) })
        const response = await request(app).get('/players/Hexennacht?tag=NA1&mode=unrated&size=5')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'no response from henrikdev API' })
    })
})
