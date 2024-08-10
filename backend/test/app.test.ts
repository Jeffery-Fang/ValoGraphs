import { default as request } from 'supertest'
import http from 'http'
import 'dotenv/config'
import app from '../src/app.js'
import { createManyMatchStat, getPlayersFromMatchId } from '../src/services/matchStatServices.js'
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

describe('testing GET /players', (): void => {
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

    test('should return status 200 and a list of MatchStat objects if successful', async (): Promise<void> => {
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

    test('should return status 400 if require parameters are missing', async (): Promise<void> => {
        const response = await request(app).get('/players/Hexennacht')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'invalid input' })
    })

    test('should return status 400 if the external API returns errors', async (): Promise<void> => {
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

    test('should return status 400 if no response from the external API', async () => {
        mockFetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(undefined) })
        const response = await request(app).get('/players/Hexennacht?tag=NA1&mode=unrated&size=5')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'no response from henrikdev API' })
    })
})

describe('testing GET /matches', (): void => {
    test('should return status 200 and a list of MatchStat objects if successful', async (): Promise<void> => {
        const mockMatchStats = [
            {
                match_id: 'a9a6fb43-3094-4568-9180-046116d39eab',
            },
            {
                match_id: 'a9a6fb43-3094-4568-9180-046116d39eab',
            },
        ]
        ;(getPlayersFromMatchId as jest.Mock).mockResolvedValue(mockMatchStats)
        const response = await request(app).get('/matches/a9a6fb43-3094-4568-9180-046116d39eab')

        expect(response.status).toBe(200)
        expect(response).toBeDefined()
    })

    test('should return status 400 if there is a database error', async (): Promise<void> => {
        ;(getPlayersFromMatchId as jest.Mock).mockResolvedValue(undefined)
        const response = await request(app).get('/matches/a9a6fb43-3094-4568-9180-046116d39eab')

        expect(response.status).toBe(400)
        expect(Object.keys(response.body)).toContain('error')
    })
})
