/**
 * Convert a input string into a colour
 *
 * @param str - The string to be converted
 * @returns The calculated colour code
 */
export function stringToColour(str: string): string {
    let hash: number = 0
    let colour: string = '#'

    str.split('').forEach((char: string): void => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })

    for (let i: number = 0; i < 3; i++) {
        const value: number = (hash >> (i * 8)) & 0xff
        colour += value.toString(16).padStart(2, '0')
    }

    return colour
}

/**
 * Makes an API call based on the input name, tag and mode and return the response
 *
 * @param nameAndTag - The name and tag of the player you are retrieving data for
 * @param mode - The mode that the matches will be of
 * @returns The API response where the body will be a list of objects representing matches the player played in of the given mode
 */
export async function retrievePlayerData(nameAndTag: string, mode: string): Promise<any> {
    let [name, tag]: string[] = nameAndTag.split('#')
    let url: string =
        import.meta.env.VITE_PLAYER_API_URL + name + '?tag=' + tag + '&mode=' + mode.replace(' ', '') + '&size=10'
    let response: any = await fetch(url, { method: 'GET' })

    if (response.status !== 200) {
        alert('Error retrieving ' + name + "'s " + mode + ' data')
    }

    return response
}

/**
 * Makes an API call based on the input match_id
 *
 * @param match_id - The match_id of the match you are retrieving data for
 * @returns The API response where the body will be a list of 10 objects representing the players who played in the match
 */
export async function retrieveMatchData(match_id: string): Promise<any> {
    let url: string = import.meta.env.VITE_MATCH_API_URL + match_id
    let response: any = await fetch(url, { method: 'GET' })

    if (response.status !== 200) {
        alert('Error retrieving match details for match ' + match_id)
    }

    return response
}

/**
 * Opens a new window to the link /profile/:name/:tag where the values are retrieved from a input element
 */
export function handleProfileSearch(): void {
    let temp: string[]
    let input: HTMLInputElement = document.getElementById('profileSearchInput') as HTMLInputElement

    if (input && input.value.includes('#')) {
        let inputValue: string = input.value.trim()

        temp = inputValue.split('#')
        window.open(`/profile/${temp[0]}/${temp[1]}`, '_blank')
    } else {
        alert('Invalid Input')
    }
}

/**
 * Calculates the number of days between 2 dates
 *
 * @param date1 - The first day
 * @param date2 - The second day
 * @returns The number of days between the two days
 */
export function calculateDateDiff(date1: Date, date2: Date): number {
    const oneDay: number = 24 * 60 * 60 * 1000

    return Math.round(Math.abs(((new Date(date1) as any) - (new Date(date2) as any)) / oneDay))
}

/**
 * Calculated the average stats given a data object
 *
 * @param data - A list of objects representing a players performance in a match the key is always a stat and the value is the value
 * @param filter - A string that represents how the matches will be filtered (agent or map matching with regex)
 * @param currentMode - The mode of which the data is for
 * @returns A list of object with each one representing a unique stat and the average value of that stat
 */
export function calculateAverageStats(
    data: { [stat: string]: any }[],
    filter: string,
    currentMode: string
): { [statName: string]: string | number }[] {
    let avgHS: number = 0
    let avgKDR: number = 0
    let avgKDA: number = 0
    let avgADR: number = 0
    let avgACS: number = 0
    let avgDD: number = 0
    let length: number = 0

    for (let match of data) {
        const agentRegex = new RegExp(filter, 'i')
        const mapRegex = new RegExp(filter, 'i')

        if (agentRegex.test(match.agent) || mapRegex.test(match.map)) {
            avgHS += match.hs
            avgKDR += match.kills / (match.deaths || 1)
            avgKDA += (match.kills + match.assists) / (match.deaths || 1)
            avgADR += match.adr
            avgACS += match.acs
            avgDD += match.dd
            length += 1
        }
    }
    avgHS /= length || 1
    avgKDR /= length || 1
    avgKDA /= length || 1
    avgADR /= length || 1
    avgACS /= length || 1
    avgDD /= length || 1

    let averageStats: { [statName: string]: string | number }[] = [
        {
            statName: 'HS%',
            value: avgHS.toFixed(2),
            relative: avgHS / 25 > 1.5 ? 1.5 : (avgHS / 25).toFixed(2),
        },
        {
            statName: 'KDR',
            value: avgKDR.toFixed(2),
            relative: avgKDR / (17.05 / 15.67) > 1.5 ? 1.5 : (avgKDR / (17.05 / 15.67)).toFixed(2),
        },
        {
            statName: 'KDA',
            value: avgKDA.toFixed(2),
            relative: avgKDA / ((17.05 + 3.53) / 15.67) > 1.5 ? 1.5 : (avgKDA / ((17.05 + 3.53) / 15.67)).toFixed(2),
        },
        {
            statName: 'ADR',
            value: avgADR.toFixed(2),
            relative:
                currentMode === 'team deathmatch'
                    ? avgADR / 4000 > 1.5
                        ? 1.5
                        : (avgADR / 4000).toFixed(2)
                    : avgADR / 130 > 1.5
                    ? 1.5
                    : (avgADR / 130).toFixed(2),
        },
        {
            statName: 'ACS',
            value: avgACS.toFixed(2),
            relative:
                currentMode === 'team deathmatch'
                    ? avgACS / 6000 > 1.5
                        ? 1.5
                        : (avgACS / 6000).toFixed(2)
                    : avgACS / 238 > 1.5
                    ? 1.5
                    : (avgACS / 238).toFixed(2),
        },
        {
            statName: 'DDΔ',
            value: avgDD.toFixed(2),
            relative:
                currentMode === 'team deathmatch'
                    ? avgDD / 500 > 1.5
                        ? 1.5
                        : avgDD < 0
                        ? 0
                        : (avgDD / 500).toFixed(2)
                    : avgDD / 25 > 1.5
                    ? 1.5
                    : avgDD < 0
                    ? 0
                    : (avgDD / 25).toFixed(2),
        },
    ]

    return averageStats
}

/**
 * Counts the number of matches played on each day
 *
 * @param data - A list of objects representing matches played
 * @param filter - A string that represents how the matches will be filtered (agent or map matching with regex)
 * @returns A list of objects representing unique dates an how many games were played on those days
 */
export function countMatchsPerDay(
    data: { [stat: string]: any }[],
    filter: string
): { date: string; 'games played': number }[] {
    let dates: {} = {}
    for (let match of data) {
        const agentRegex = new RegExp(filter, 'i')
        const mapRegex = new RegExp(filter, 'i')

        if (agentRegex.test(match.agent) || mapRegex.test(match.map)) {
            let time = new Date(match.date)
            let timeString = time.toLocaleDateString()
            if (Object.keys(dates).includes(timeString)) {
                ;(dates as any)[timeString] += 1
            } else {
                ;(dates as any)[timeString] = 1
            }
        }
    }

    let matchDates = Object.keys(dates).map((date: string) => {
        return { date: date, 'games played': (dates as any)[date] }
    })
    matchDates.sort((a, b): number => new Date(a['date']).getTime() - new Date(b['date']).getTime())

    return matchDates
}
