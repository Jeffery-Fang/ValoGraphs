import 'dotenv/config'

const PLAYER_URL_ROOT: string = <string>process.env.PLAYER_URL_ROOT
const PROFILE_URL_ROOT: string = <string>process.env.PROFILE_URL_ROOT
const MATCH_URL_ROOT: string = <string>process.env.MATCH_URL_ROOT
const API_KEY: string = <string>process.env.API_KEY

/**
 * Retrieves recent match data associated with the specified player and trims it down to important fields
 *
 * @param name - The name of the player whos matches the data will be from
 * @param tag - The tag of the player whos matches the data will be from
 * @param mode - The mode the matches
 * @param size - The number of matches to be retrieved
 * @returns An array of data that can be used to create MatchStat objects
 */
export async function retrievePlayerData(name: string, tag: string, mode: string, size: number): Promise<any> {
    try {
        let url: string = (PLAYER_URL_ROOT + name + '/' + tag + '?mode=' + mode + '&size=' + size) as string
        let options: RequestInit = {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
            },
        }
        let response: any = await fetch(url, options)
        let player_id: string | null = null
        let data = []

        if (response === undefined) {
            throw 'no response from henrikdev API'
        }

        response = await response.json()

        if (Object.keys(response).includes('errors')) {
            throw response.errors
        }

        for (let match of response['data']) {
            for (let playerData of match['players']) {
                let won: boolean = false
                let rounds_red_won: number = 0
                let rounds_blue_won: number = 0
                let numRounds: number = 0

                if (playerData['name'] == name && playerData['tag'] == tag) {
                    player_id = playerData['puuid']
                }

                for (let team of match['teams']) {
                    if (playerData['team_id'] === team['team_id']) {
                        won = team['won']
                    }

                    if (team['team_id'] === 'Blue') {
                        rounds_blue_won = team['rounds']['won']
                    } else {
                        rounds_red_won = team['rounds']['won']
                    }
                }

                for (let round of match['rounds']) {
                    if (round['result'] != 'Surrendered') {
                        numRounds += 1
                    }
                }

                data.push({
                    playerData: playerData,
                    match_id: match['metadata']['match_id'],
                    map: match['metadata']['map']['name'],
                    mode: match['metadata']['queue']['name'],
                    rounds_blue_won: rounds_blue_won,
                    rounds_red_won: rounds_red_won,
                    won: won,
                    numRounds: numRounds,
                    date: new Date(match['metadata']['started_at']),
                })
            }
        }

        if (player_id === null) {
            throw 'specified player was not in retrieved data'
        }

        return {
            searched_player_id: player_id,
            match_data: data,
        }
    } catch (err) {
        throw err
    }
}

/**
 * Retrieves stored match data associated with the specified player and trims it down to important fields
 *
 * @param name - The name of the player whos matches the data will be from
 * @param tag - The tag of the player whos matches the data will be from
 * @param mode - The mode the matches
 * @param page - The page the matches will be from(pages of size 10)
 * @returns An array of data that can be used to create MatchStat objects
 */
export async function retrieveProfileData(name: string, tag: string, mode: string, page: number) {
    try {
        let url: string = (PROFILE_URL_ROOT +
            name +
            '/' +
            tag +
            '?mode=' +
            mode +
            '&page=' +
            page +
            '&size=10') as string
        let options: RequestInit = {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
            },
        }
        let response: any = await fetch(url, options)
        let accountDetails: any = await fetch(`https://api.henrikdev.xyz/valorant/v2/account/${name}/${tag}`, options)
        let data = []

        if (response === undefined || accountDetails === undefined) {
            throw 'no response from henrikdev API'
        }

        response = await response.json()
        accountDetails = await accountDetails.json()

        if (Object.keys(response).includes('errors') || Object.keys(accountDetails).includes('errors')) {
            throw response.errors
        }

        for (let match of response['data']) {
            let rounds_red_won: number = 0
            let rounds_blue_won: number = 0

            rounds_blue_won = match['teams']['blue']
            rounds_red_won = match['teams']['red']

            data.push({
                playerData: {
                    puuid: match['stats']['puuid'],
                    name: name,
                    tag: tag,
                    stats: {
                        kills: match['stats']['kills'],
                        deaths: match['stats']['deaths'],
                        assists: match['stats']['assists'],
                        score: match['stats']['score'],
                        damage: {
                            dealt: match['stats']['damage']['made'],
                            received: match['stats']['damage']['received'],
                        },
                        headshots: match['stats']['shots']['head'],
                        bodyshots: match['stats']['shots']['body'],
                        legshots: match['stats']['shots']['leg'],
                    },
                    agent: match['stats']['character'],
                    team_id: match['stats']['team'],
                    customization: {
                        card: accountDetails.data.card,
                    },
                },
                match_id: match['meta']['id'],
                map: match['meta']['map']['name'],
                mode: match['meta']['mode'],
                rounds_blue_won: rounds_blue_won,
                rounds_red_won: rounds_red_won,
                won:
                    (match['stats']['team'] === 'Red' && rounds_red_won > rounds_blue_won) ||
                    (match['stats']['team'] === 'Blue' && rounds_red_won < rounds_blue_won),
                numRounds: rounds_red_won + rounds_blue_won,
                date: new Date(match['meta']['started_at']),
            })
        }

        return data
    } catch (err) {
        throw err
    }
}

/**
 * Retrieves match data for all players that participated in the specified match
 *
 * @param match_id - The match_id of the match we are retrieving data for
 * @returns An array of data that can be used to create MatchStat objects
 */
export async function retrieveMatchData(match_id: string): Promise<any> {
    try {
        let url: string = (MATCH_URL_ROOT + match_id) as string
        let options: RequestInit = {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
            },
        }
        let response: any = await fetch(url, options)
        let data = []

        if (response === undefined) {
            throw 'no response from henrikdev API'
        }

        response = await response.json()

        if (Object.keys(response).includes('errors')) {
            throw response.errors
        }

        for (let playerData of response['data']['players']) {
            let won: boolean = false
            let rounds_red_won: number = 0
            let rounds_blue_won: number = 0
            let numRounds: number = 0

            for (let team of response['data']['teams']) {
                if (playerData['team_id'] === team['team_id']) {
                    won = team['won']
                }

                if (team['team_id'] === 'Blue') {
                    rounds_blue_won = team['rounds']['won']
                } else {
                    rounds_red_won = team['rounds']['won']
                }
            }

            for (let round of response['data']['rounds']) {
                if (round['result'] != 'Surrendered') {
                    numRounds += 1
                }
            }

            data.push({
                playerData: playerData,
                match_id: response['data']['metadata']['match_id'],
                map: response['data']['metadata']['map']['name'],
                mode: response['data']['metadata']['queue']['name'],
                rounds_blue_won: rounds_blue_won,
                rounds_red_won: rounds_red_won,
                won: won,
                numRounds: numRounds,
                date: new Date(response['data']['metadata']['started_at']),
            })
        }

        return data
    } catch (err) {
        throw err
    }
}
