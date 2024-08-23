import 'dotenv/config'

const PLAYER_URL_ROOT: string = <string>process.env.USER_URL_ROOT
const API_KEY: string = <string>process.env.API_KEY

/**
 * Retrieves match data associated with the specified player a trims it down to important fields
 *
 * @param name - The name of the player whos matches the data will be from
 * @param tag - The tag of the player whos matches the data will be from
 * @param mode - The mode the matches
 * @param size - The number of matches to be retrieved
 * @returns
 */
export async function retrievePlayerDataForPlayer(name: string, tag: string, mode: string, size: number): Promise<any> {
    try {
        let url: string = (PLAYER_URL_ROOT + '/' + name + '/' + tag + '?mode=' + mode + '&size=' + size) as string
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
