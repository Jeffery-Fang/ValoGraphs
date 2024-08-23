import 'dotenv/config'
import http from 'http'
import { default as request } from 'supertest'
import app from '../src/app.js'
import { retrievePlayerDataForPlayer } from '../src/services/val_api_service.js'
import { createManyMatchStat } from '../src/services/match_stat_service.js'
import { saveManyMatchStat } from '../src/services/data_access_service.js'
import { getMatchStatsFromMatchId } from '../src/services/data_access_service.js'

let server: http.Server
const mockMatchStat = {
    player: {
        id: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
        name: 'Hexennacht',
        tag: 'NA1',
    },
    match_id: 'e5467da1-f1d3-4a49-bebc-f790b0f34959',
    acs: 166.06,
    kills: 10,
    deaths: 12,
    assists: 3,
    dd: -42.35,
    adr: 110.24,
    hs: 37,
    agent: 'Jett',
    map: 'Icebox',
    mode: 'Unrated',
    won: true,
    side: 'Blue',
    date: '2024-08-11T21:20:01.025Z',
    agent_id: 'add6443a-41bd-e414-f6ad-e58d267f4e95',
    card_id: 'bb6ae873-43ec-efb4-3ea6-93ac00a82d4e',
}

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
        ;(retrievePlayerDataForPlayer as jest.Mock).mockResolvedValue({
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
        const name = 'Hexennacht'
        const tag = 'NA1'
        const mode = 'unrated'
        const size = 10
        const url = '/players/' + name + '?tag=' + tag + '&mode=' + mode + '&size=' + size
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrievePlayerDataForPlayer).toHaveBeenCalledWith(name, tag, mode, size)
        expect(retrievePlayerDataForPlayer).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
        expect(saveManyMatchStat).toHaveBeenCalledWith([mockMatchStat, mockMatchStat])
        expect(saveManyMatchStat).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 with an invalid input', async (): Promise<void> => {
        const name = 'Hexennacht'
        const tag = 'NA1'
        const mode = 'unrated'
        const size = 10
        const url = '/players/' + name + '&mode=' + mode + '&size=' + size
        const response = await request(app).get(url)

        expect(response.status).toBe(400)
        expect(retrievePlayerDataForPlayer).toHaveBeenCalledTimes(0)
        expect(createManyMatchStat).toHaveBeenCalledTimes(0)
        expect(saveManyMatchStat).toHaveBeenCalledTimes(0)
    })

    test('should return status 200 with an out of bounds mode', async (): Promise<void> => {
        const name = 'Hexennacht'
        const tag = 'NA1'
        const mode = 'spike rush'
        const size = 10
        const url = '/players/' + name + '?tag=' + tag + '&mode=' + mode + '&size=' + size
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrievePlayerDataForPlayer).toHaveBeenCalledWith(name, tag, 'competitive', size)
        expect(retrievePlayerDataForPlayer).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
        expect(saveManyMatchStat).toHaveBeenCalledWith([mockMatchStat, mockMatchStat])
        expect(saveManyMatchStat).toHaveBeenCalledTimes(1)
    })

    test('should return status 200 with an out of bounds size', async (): Promise<void> => {
        const name = 'Hexennacht'
        const tag = 'NA1'
        const mode = 'unrated'
        const size = 15
        const url = '/players/' + name + '?tag=' + tag + '&mode=' + mode + '&size=' + size
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(retrievePlayerDataForPlayer).toHaveBeenCalledWith(name, tag, mode, 5)
        expect(retrievePlayerDataForPlayer).toHaveBeenCalledTimes(1)
        expect(createManyMatchStat).toHaveBeenCalledWith({})
        expect(createManyMatchStat).toHaveBeenCalledTimes(1)
        expect(saveManyMatchStat).toHaveBeenCalledWith([mockMatchStat, mockMatchStat])
        expect(saveManyMatchStat).toHaveBeenCalledTimes(1)
    })
})

describe('testing GET /matches', (): void => {
    beforeEach((): void => {
        ;(getMatchStatsFromMatchId as jest.Mock).mockResolvedValue([])
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should return status 200 with a valid input', async (): Promise<void> => {
        const match_id = 'e5467da1-f1d3-4a49-bebc-f790b0f34959'
        const url = '/matches/' + match_id
        const response = await request(app).get(url)

        expect(response.status).toBe(200)
        expect(getMatchStatsFromMatchId).toHaveBeenCalledWith(match_id)
        expect(getMatchStatsFromMatchId).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 if there is a database error', async (): Promise<void> => {
        const match_id = 'e5467da1-f1d3-4a49-bebc-f790b0f34959'
        const url = '/matches/' + match_id

        ;(getMatchStatsFromMatchId as jest.Mock).mockRejectedValueOnce('database error')
        const response = await request(app).get(url)

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: 'database error' })
    })
})

describe('testing GET /', (): void => {
    test('should return status 200 with a valid input', async (): Promise<void> => {
        const response = await request(app).get('/')

        expect(response.status).toBe(200)
        expect(response.body).toBeDefined()
    })
})
