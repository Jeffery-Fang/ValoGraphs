import 'dotenv/config'
import { retrievePlayerData, retrieveProfileData, retrieveMatchData } from '../src/services/val_api_service'
import { mockPlayerApiResponse, mockProfileApiResponse, mockMatchApiResponses } from './mockData'
const mockFetch = jest.fn()
global.fetch = mockFetch

const PLAYER_URL_ROOT: string = <string>process.env.PLAYER_URL_ROOT
const PROFILE_URL_ROOT: string = <string>process.env.PROFILE_URL_ROOT
const MATCH_URL_ROOT: string = <string>process.env.MATCH_URL_ROOT
const API_KEY: string = <string>process.env.API_KEY

describe('testing retrievePlayerData()', (): void => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should return an object containing searched_player_id and match_data if successful', async (): Promise<void> => {
        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: mockPlayerApiResponse,
            }),
        })
        let name = 'Hexennacht'
        let tag = 'NA1'
        let mode = 'unrated'
        let size = 10
        let region = 'na'
        let response = await retrievePlayerData(name, tag, mode, size, region)

        expect(mockFetch).toHaveBeenCalledWith(
            PLAYER_URL_ROOT + region + '/pc/' + name + '/' + tag + '?mode=' + mode + '&size=' + size,
            {
                method: 'GET',
                headers: {
                    Authorization: API_KEY,
                },
            }
        )
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(Object.keys(response)).toContain('searched_player_id')
        expect(Object.keys(response)).toContain('match_data')
    })

    test('should throw an error if the fetch responds with undefined', async (): Promise<void> => {
        try {
            mockFetch.mockResolvedValue(undefined)
            let name = 'Hexennacht'
            let tag = 'NA1'
            let mode = 'unrated'
            let size = 10
            let region = 'na'
            let response = await retrievePlayerData(name, tag, mode, size, region)

            expect(mockFetch).toHaveBeenCalledWith(
                PLAYER_URL_ROOT + region + '/pc/' + name + '/' + tag + '?mode=' + mode + '&size=' + size,
                {
                    method: 'GET',
                    headers: {
                        Authorization: API_KEY,
                    },
                }
            )
            expect(mockFetch).toHaveBeenCalledTimes(1)
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
            let name = 'Hexennacht'
            let tag = 'NA1'
            let mode = 'unrated'
            let size = 10
            let region = 'na'
            let response = await retrievePlayerData(name, tag, mode, size, region)

            expect(mockFetch).toHaveBeenCalledWith(
                PLAYER_URL_ROOT + region + '/pc/' + name + '/' + tag + '?mode=' + mode + '&size=' + size,
                {
                    method: 'GET',
                    headers: {
                        Authorization: API_KEY,
                    },
                }
            )
            expect(mockFetch).toHaveBeenCalledTimes(1)
        } catch (e) {
            expect(e).toBe('some errors')
        }
    })

    test("should throw an error if the player being searched for isn't contained in the response", async (): Promise<void> => {
        try {
            mockFetch.mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    data: mockPlayerApiResponse,
                }),
            })
            let name = 'NonePlayer'
            let tag = 'NA1'
            let mode = 'unrated'
            let size = 10
            let region = 'na'
            let response = await retrievePlayerData(name, tag, mode, size, region)

            expect(mockFetch).toHaveBeenCalledWith(
                PLAYER_URL_ROOT + region + '/pc/' + name + '/' + tag + '?mode=' + mode + '&size=' + size,
                {
                    method: 'GET',
                    headers: {
                        Authorization: API_KEY,
                    },
                }
            )
            expect(mockFetch).toHaveBeenCalledTimes(1)
        } catch (e) {
            expect(e).toBe('specified player was not in retrieved data')
        }
    })
})

describe('testing retrieveProfileData()', (): void => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should return data with correct fields if successful', async (): Promise<void> => {
        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: mockProfileApiResponse,
            }),
        })
        let name = 'Hexennacht'
        let tag = 'NA1'
        let mode = 'unrated'
        let page = 1
        let region = 'na'
        let response = await retrieveProfileData(name, tag, mode, page, region)
        let options: RequestInit = {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
            },
        }
        expect(mockFetch).toHaveBeenCalledWith(
            PROFILE_URL_ROOT + region + '/' + name + '/' + tag + '?mode=' + mode + '&page=' + page + '&size=10',
            options
        )
        expect(mockFetch).toHaveBeenCalledWith(`https://api.henrikdev.xyz/valorant/v2/account/${name}/${tag}`, options)
        expect(mockFetch).toHaveBeenCalledTimes(2)
        expect(Object.keys(response[0])).toStrictEqual([
            'playerData',
            'match_id',
            'map',
            'mode',
            'rounds_blue_won',
            'rounds_red_won',
            'won',
            'numRounds',
            'date',
        ])
    })

    test('should throw an error if fetch responds with undefined', async (): Promise<void> => {
        try {
            mockFetch.mockResolvedValue(undefined)
            let name = 'Hexennacht'
            let tag = 'NA1'
            let mode = 'unrated'
            let page = 1
            let region = 'na'
            let response = await retrieveProfileData(name, tag, mode, page, region)
            let options: RequestInit = {
                method: 'GET',
                headers: {
                    Authorization: API_KEY,
                },
            }
            expect(mockFetch).toHaveBeenCalledWith(
                PROFILE_URL_ROOT + region + '/' + name + '/' + tag + '?mode=' + mode + '&page=' + page + '&size=10',
                options
            )
            expect(mockFetch).toHaveBeenCalledTimes(1)
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
            let name = 'Hexennacht'
            let tag = 'NA1'
            let mode = 'unrated'
            let page = 1
            let region = 'na'
            let response = await retrieveProfileData(name, tag, mode, page, region)
            let options: RequestInit = {
                method: 'GET',
                headers: {
                    Authorization: API_KEY,
                },
            }
            expect(mockFetch).toHaveBeenCalledWith(
                PROFILE_URL_ROOT + region + '/' + name + '/' + tag + '?mode=' + mode + '&page=' + page + '&size=10',
                options
            )
            expect(mockFetch).toHaveBeenCalledWith(
                `https://api.henrikdev.xyz/valorant/v2/account/${name}/${tag}`,
                options
            )
            expect(mockFetch).toHaveBeenCalledTimes(2)
        } catch (e) {
            expect(e).toBe('some errors')
        }
    })
})

describe('testing retrieveMatchData()', (): void => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should return data with correct fields if successful', async (): Promise<void> => {
        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: mockMatchApiResponses[0],
            }),
        })
        let match_id = 'b5435599-43af-48dd-b0ba-032260200f25'
        let region = 'na'
        let response = await retrieveMatchData(match_id, region)
        let options: RequestInit = {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
            },
        }

        expect(mockFetch).toHaveBeenCalledWith(MATCH_URL_ROOT + region + '/' + match_id, options)
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(Object.keys(response[0])).toStrictEqual([
            'playerData',
            'match_id',
            'map',
            'mode',
            'rounds_blue_won',
            'rounds_red_won',
            'won',
            'numRounds',
            'date',
        ])
    })

    test('should return data with correct fields if successful', async (): Promise<void> => {
        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: mockMatchApiResponses[1],
            }),
        })
        let match_id = 'b5435599-43af-48dd-b0ba-032260200f25'
        let region = 'na'
        let response = await retrieveMatchData(match_id, region)
        let options: RequestInit = {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
            },
        }

        expect(mockFetch).toHaveBeenCalledWith(MATCH_URL_ROOT + region + '/' + match_id, options)
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(Object.keys(response[0])).toStrictEqual([
            'playerData',
            'match_id',
            'map',
            'mode',
            'rounds_blue_won',
            'rounds_red_won',
            'won',
            'numRounds',
            'date',
        ])
    })

    test('should throw an error if the fetch responds with undefined', async (): Promise<void> => {
        try {
            mockFetch.mockResolvedValue(undefined)
            let match_id = 'b5435599-43af-48dd-b0ba-032260200f25'
            let region = 'na'
            let response = await retrieveMatchData(match_id, region)
            let options: RequestInit = {
                method: 'GET',
                headers: {
                    Authorization: API_KEY,
                },
            }

            expect(mockFetch).toHaveBeenCalledWith(MATCH_URL_ROOT + match_id + '?region=' + region, options)
            expect(mockFetch).toHaveBeenCalledTimes(1)
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
            let match_id = 'b5435599-43af-48dd-b0ba-032260200f25'
            let region = 'na'
            let response = await retrieveMatchData(match_id, region)
            let options: RequestInit = {
                method: 'GET',
                headers: {
                    Authorization: API_KEY,
                },
            }

            expect(mockFetch).toHaveBeenCalledWith(MATCH_URL_ROOT + match_id + '?region=' + region, options)
            expect(mockFetch).toHaveBeenCalledTimes(1)
        } catch (e) {
            expect(e).toBe('some errors')
        }
    })
})
