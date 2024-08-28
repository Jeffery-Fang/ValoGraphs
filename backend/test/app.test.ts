import 'dotenv/config'
import http from 'http'
import app from '../src/app.js'
import { default as request } from 'supertest'
import { retrievePlayerData, retrieveProfileData, retrieveMatchData } from '../src/services/val_api_service.js'
import { createManyMatchStat } from '../src/services/match_stat_service.js'
import { saveManyMatchStat, getFromMatchId } from '../src/services/data_access_service.js'
import { mockMatchStat } from './mockData.js'

let server: http.Server

jest.mock('../src/services/val_api_service.js')
jest.mock('../src/services/match_stat_service.js')
jest.mock('../src/services/data_access_service.js')

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
        ;(retrievePlayerData as jest.Mock).mockResolvedValue({
            searched_player_id: mockMatchStat.player.id,
            match_data: {},
        })
        ;(createManyMatchStat as jest.Mock).mockReturnValue([mockMatchStat, mockMatchStat])
        ;(saveManyMatchStat as jest.Mock).mockResolvedValue(undefined)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should return status 200 with a valid input', async (): Promise<void> => {
        const name = mockMatchStat.player.name
        const tag = mockMatchStat.player.tag
        const mode = mockMatchStat.mode.toLowerCase()
        const size = 10
        const url = '/players/' + name + '?tag=' + tag + '&mode=' + mode + '&size=' + size
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrievePlayerData).toHaveBeenCalledWith(name, tag, mode, size)
        expect(retrievePlayerData).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
        expect(saveManyMatchStat).toHaveBeenCalledWith([mockMatchStat, mockMatchStat])
        expect(saveManyMatchStat).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 with an invalid input', async (): Promise<void> => {
        const name = mockMatchStat.player.name
        const tag = mockMatchStat.player.tag
        const mode = mockMatchStat.mode.toLowerCase()
        const size = 10
        const url = '/players/' + name + '&mode=' + mode + '&size=' + size
        const response = await request(app).get(url)

        expect(response.status).toBe(400)
        expect(retrievePlayerData).toHaveBeenCalledTimes(0)
        expect(createManyMatchStat).toHaveBeenCalledTimes(0)
        expect(saveManyMatchStat).toHaveBeenCalledTimes(0)
    })

    test('should return status 200 with an out of bounds mode', async (): Promise<void> => {
        const name = mockMatchStat.player.name
        const tag = mockMatchStat.player.tag
        const mode = 'spike rush'
        const size = 10
        const url = '/players/' + name + '?tag=' + tag + '&mode=' + mode + '&size=' + size
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrievePlayerData).toHaveBeenCalledWith(name, tag, 'competitive', size)
        expect(retrievePlayerData).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
        expect(saveManyMatchStat).toHaveBeenCalledWith([mockMatchStat, mockMatchStat])
        expect(saveManyMatchStat).toHaveBeenCalledTimes(1)
    })

    test('should return status 200 with an out of bounds size', async (): Promise<void> => {
        const name = mockMatchStat.player.name
        const tag = mockMatchStat.player.tag
        const mode = mockMatchStat.mode.toLowerCase()
        const size = 15
        const url = '/players/' + name + '?tag=' + tag + '&mode=' + mode + '&size=' + size
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrievePlayerData).toHaveBeenCalledWith(name, tag, mode, 5)
        expect(retrievePlayerData).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
        expect(saveManyMatchStat).toHaveBeenCalledWith([mockMatchStat, mockMatchStat])
        expect(saveManyMatchStat).toHaveBeenCalledTimes(1)
    })
})

describe('testing GET /matches', (): void => {
    beforeEach((): void => {
        ;(getFromMatchId as jest.Mock).mockResolvedValue([])
        ;(createManyMatchStat as jest.Mock).mockReturnValue([])
        ;(saveManyMatchStat as jest.Mock).mockResolvedValue(undefined)
        ;(retrieveMatchData as jest.Mock).mockResolvedValue([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("should call retrieveMatchData if the match hasn't been stored and should return status 200", async (): Promise<void> => {
        const match_id = mockMatchStat.match_id
        const url = '/matches/' + match_id
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(getFromMatchId).toHaveBeenCalledWith(match_id)
        expect(getFromMatchId).toHaveBeenCalledTimes(1)
        expect(retrieveMatchData).toHaveBeenCalledWith(match_id)
        expect(retrieveMatchData).toHaveBeenCalledTimes(1)
    })

    test('should not call retrieveMatchData if the match has already been stored and should return status 200', async (): Promise<void> => {
        ;(getFromMatchId as jest.Mock).mockResolvedValue([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
        const match_id = mockMatchStat.match_id
        const url = '/matches/' + match_id
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(getFromMatchId).toHaveBeenCalledWith(match_id)
        expect(getFromMatchId).toHaveBeenCalledTimes(1)
        expect(retrieveMatchData).toHaveBeenCalledTimes(0)
    })

    test('should return status 400 if there is a database error', async (): Promise<void> => {
        const match_id = mockMatchStat.match_id
        const url = '/matches/' + match_id

        ;(getFromMatchId as jest.Mock).mockRejectedValueOnce('database error')
        const response = await request(app).get(url)

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'database error' })
    })
})

describe('testing GET /profiles', (): void => {
    beforeEach((): void => {
        ;(retrieveProfileData as jest.Mock).mockResolvedValue({})
        ;(createManyMatchStat as jest.Mock).mockReturnValue([mockMatchStat, mockMatchStat])
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should call retrieveProfileData() and createManyMatchStat() and return status 200 with valid input', async (): Promise<void> => {
        const name = mockMatchStat.player.name
        const tag = mockMatchStat.player.tag
        const mode = mockMatchStat.mode.toLowerCase()
        const page = 1
        const url = '/profiles/' + name + '?tag=' + tag + '&mode=' + mode + '&page=' + page
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrieveProfileData).toHaveBeenCalledWith(name, tag, mode, page)
        expect(retrieveProfileData).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 with an invalid input', async (): Promise<void> => {
        const name = mockMatchStat.player.name
        const tag = mockMatchStat.player.tag
        const mode = mockMatchStat.mode.toLowerCase()
        const page = 1
        const url = '/profiles/' + name + '&mode=' + mode + '&page=' + page
        const response = await request(app).get(url)

        expect(response.status).toBe(400)
        expect(retrieveProfileData).toHaveBeenCalledTimes(0)
        expect(createManyMatchStat).toHaveBeenCalledTimes(0)
    })

    test('should call retrieveProfileData() and createManyMatchStat() and return status 200 with out of bounds mode', async (): Promise<void> => {
        const name = mockMatchStat.player.name
        const tag = mockMatchStat.player.tag
        const mode = 'spike rush'
        const page = 1
        const url = '/profiles/' + name + '?tag=' + tag + '&mode=' + mode + '&page=' + page
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrieveProfileData).toHaveBeenCalledWith(name, tag, 'competitive', page)
        expect(retrieveProfileData).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
    })

    test('should call retrieveProfileData() and createManyMatchStat() and return status 200 with out of bounds page', async (): Promise<void> => {
        const name = mockMatchStat.player.name
        const tag = mockMatchStat.player.tag
        const mode = mockMatchStat.mode.toLowerCase()
        const page = 0
        const url = '/profiles/' + name + '?tag=' + tag + '&mode=' + mode + '&page=' + page
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrieveProfileData).toHaveBeenCalledWith(name, tag, mode, 1)
        expect(retrieveProfileData).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
    })
})

describe('testing GET /', (): void => {
    test('should return status 200 with a valid input', async (): Promise<void> => {
        const response = await request(app).get('/')

        expect(response.status).toBe(200)
        expect(response.body).toBeDefined()
    })
})
