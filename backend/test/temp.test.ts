import request from 'supertest'
import express from 'express'
import router from '../src/controllers/playersRouter' // Adjust the path
import { createManyMatchStat } from '../src/services/matchStatServices'
import { getIdFromNameTag } from '../src/services/playerServices'

jest.mock('../src/services/matchStatServices')
jest.mock('../src/services/playerServices')

const mockFetch = jest.fn()
global.fetch = mockFetch

const app = express()
app.use(express.json())
app.use('/', router)

describe('GET /:name', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return 200 and match statistics when all inputs are valid', async () => {
        const mockApiResponse = {
            data: [
                {
                    metadata: {
                        match_id: '12345',
                        map: { name: 'Bind' },
                        queue: { name: 'competitive' },
                        started_at: '2022-01-01T00:00:00Z',
                    },
                    players: [{ team_id: 'blue' /* other player data */ }],
                    teams: [{ team_id: 'blue', won: true }],
                    rounds: [{ result: 'Defuse' }],
                },
            ],
        }
        const mockStats = [{ player: { id: 'some-puuid' } /* other stats */ }]

        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockApiResponse),
        })
        ;(createManyMatchStat as jest.Mock).mockResolvedValue(mockStats)
        ;(getIdFromNameTag as jest.Mock).mockResolvedValue('some-puuid')

        const response = await request(app).get('/playerName?tag=1234&mode=competitive&size=5')

        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockStats)
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
        expect(getIdFromNameTag).toHaveBeenCalledTimes(1)
    })

    it('should return 400 if required parameters are missing', async () => {
        const response = await request(app).get('/playerName?tag=1234')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'invalid input' })
    })

    it('should return 400 if the external API returns errors', async () => {
        const mockApiResponse = {
            errors: 'Some API error',
        }

        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockApiResponse),
        })

        const response = await request(app).get('/playerName?tag=1234&mode=competitive&size=5')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'Some API error' })
    })

    it('should return 400 if no response from the external API', async () => {
        mockFetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ errors: 'no response from henrikdev API' }) })

        const response = await request(app).get('/playerName?tag=1234&mode=competitive&size=5')

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'no response from henrikdev API' })
    })
})
