import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../components/Header'
import ProfileColumn from '../../components/ProfileColumn'
import MatchHistory from '../../components/MatchHistory'
import MatchDetails from '../../components/MatchDetails'
import { handleProfileSearch, retrievePlayerData, retrieveMatchData } from '../../utils/commonFunctions'

const gameModes: string[] = ['unrated', 'competitive', 'team deathmatch']

function App() {
    const [currentMode, updateCurrentMode] = useState('unrated')
    const [data, updateData] = useState<{ [playerName: string]: any }[]>([])
    const [filter, updateFilter] = useState('')
    const [imageMap, updateimageMap] = useState<{ [id: string]: string }>({})
    const { name, tag } = useParams()

    const [showMatchDetails, updateShowMatchDetails] = useState(false)
    const [matchDetails, updateMatchDetails] = useState<{ [playerName: string]: any }[]>([])

    useEffect((): void => {
        init()
    }, [])

    async function init(): Promise<void> {
        if (name && tag) {
            let response: any = await (await retrievePlayerData(name + '#' + tag, currentMode)).json()
            let newimageMap: { [id: string]: string } = { ...imageMap }

            if (!Object.keys(newimageMap).includes('card')) {
                let assetData: any = await (
                    await fetch(
                        'https://valorant-api.com/v1/playercards/' +
                            (response.length > 0 ? response[response.length - 1].card_id : response[0].card_id),
                        { method: 'GET' }
                    )
                ).json()

                newimageMap['card'] = assetData['data']['wideArt']
            }

            for (let element of response) {
                if (!Object.keys(imageMap).includes(element.agent)) {
                    let assetData: any = await (
                        await fetch('https://valorant-api.com/v1/agents/' + element.agent_id, { method: 'GET' })
                    ).json()

                    newimageMap[element.agent] = assetData['data']['displayIcon']
                }
            }

            updateimageMap(newimageMap)
            updateData(response)
        } else {
            alert('Invalid name and tag')
        }
    }

    async function handleChangeMode(mode: string): Promise<void> {
        if (mode !== currentMode) {
            let response: any = await (await retrievePlayerData(name + '#' + tag, mode)).json()
            let newimageMap: { [id: string]: string } = { ...imageMap }

            if (!Object.keys(newimageMap).includes('card')) {
                let assetData: any = await (
                    await fetch('https://valorant-api.com/v1/playercards/' + response[0].card_id, { method: 'GET' })
                ).json()

                newimageMap['card'] = assetData['data']['smallArt']
            }

            for (let element of response) {
                if (!Object.keys(imageMap).includes(element.agent)) {
                    let assetData: any = await (
                        await fetch('https://valorant-api.com/v1/agents/' + element.agent_id, { method: 'GET' })
                    ).json()

                    newimageMap[element.agent] = assetData['data']['displayIcon']
                }
            }

            updateimageMap(newimageMap)
            updateData(response)
            updateCurrentMode(mode)
        }
    }

    function handleFilter(): void {
        let input: HTMLInputElement = document.getElementById('agentSearchInput') as HTMLInputElement

        updateFilter(input.value)
    }

    async function handleShowMatchDetails(match_id: string): Promise<void> {
        if (match_id) {
            let response: any = await (await retrieveMatchData(match_id)).json()
            let newimageMap: { [id: string]: string } = { ...imageMap }

            for (let element of response) {
                if (!Object.keys(imageMap).includes(element.agent)) {
                    let assetData: any = await (
                        await fetch('https://valorant-api.com/v1/agents/' + element.agent_id, { method: 'GET' })
                    ).json()

                    newimageMap[element.agent] = assetData['data']['displayIcon']
                }
            }

            updateimageMap(newimageMap)
            updateMatchDetails(response)
            updateShowMatchDetails(true)
        }
    }

    function sortMatchDetails(stat: string): void {
        let newMatchDetails = [...matchDetails]
        switch (stat) {
            case 'name':
                //note working
                newMatchDetails.sort((a, b): number => b['player']['name'] - a['player']['name'])
                break
            case 'kda':
                newMatchDetails.sort(
                    (a, b): number =>
                        (b['kills'] + b['assists']) / b['deaths'] - (a['kills'] + a['assists']) / a['deaths']
                )
                break
            case 'hs':
                newMatchDetails.sort((a, b): number => b['hs'] - a['hs'])
                break
            case 'dd':
                newMatchDetails.sort((a, b): number => b['dd'] - a['d'])
                break
            case 'adr':
                newMatchDetails.sort((a, b): number => b['adr'] - a['adr'])
                break
            case 'acs':
                newMatchDetails.sort((a, b): number => b['acs'] - a['acs'])
                break
        }
        newMatchDetails.sort((a, b): number => b[stat] - a[stat])

        updateMatchDetails(newMatchDetails)
    }

    const handlerMap: { [id: string]: any } = {
        'Back to Homepage': '/',
        'View Profile Page': handleProfileSearch,
        'Change Game Mode': handleChangeMode,
        'View GitHub Repository': import.meta.env.VITE_GITHUB_LINK,
    }

    let avgHS: number = 0
    let avgKDR: number = 0
    let avgKDA: number = 0
    let avgADR: number = 0
    let avgACS: number = 0
    let avgDD: number = 0
    let dates: {} = {}
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

            let time = new Date(match.date)
            let timeString = time.toLocaleDateString()
            if (Object.keys(dates).includes(timeString)) {
                ;(dates as any)[timeString] += 1
            } else {
                ;(dates as any)[timeString] = 1
            }
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
            relative: (avgHS / 25).toFixed(2),
        },
        {
            statName: 'KDR',
            value: avgKDR.toFixed(2),
            relative: (avgKDR / (17.05 / 15.67)).toFixed(2),
        },
        {
            statName: 'KDA',
            value: avgKDA.toFixed(2),
            relative: (avgKDA / ((17.05 + 3.53) / 15.67)).toFixed(2),
        },
        {
            statName: 'ADR',
            value: avgADR.toFixed(2),
            relative:
                currentMode === 'team deathmatch'
                    ? Math.abs(avgADR / 4000).toFixed(2)
                    : Math.abs(avgADR / 130).toFixed(2),
        },
        {
            statName: 'ACS',
            value: avgACS.toFixed(2),
            relative:
                currentMode === 'team deathmatch' ? Math.abs(avgACS / 6000).toFixed(2) : (avgACS / 238).toFixed(2),
        },
        {
            statName: 'DDΔ',
            value: avgDD.toFixed(2),
            relative:
                currentMode === 'team deathmatch' ? Math.abs(avgADR / 500).toFixed(2) : Math.abs(avgDD / 25).toFixed(2),
        },
    ]

    let matchDates = Object.keys(dates).map((date: string) => {
        return { date: date, 'games played': (dates as any)[date] }
    })
    matchDates.sort((a, b): number => new Date(a['date']).getTime() - new Date(b['date']).getTime())

    return (
        <>
            <Container
                fluid
                className="p-0 vh-100 vw-100 d-flex flex-column bg-dark"
                style={{
                    overflowX: 'hidden',
                }}
            >
                <Header handlerMap={handlerMap} gameModes={gameModes}></Header>
                <Container fluid className="p-0 h-100 w-100 d-flex flex-row justify-content-center">
                    <div className="h-100" style={{ width: '20%' }}>
                        <ProfileColumn
                            mode={currentMode}
                            nameAndTag={name + '#' + tag}
                            imageMap={imageMap}
                            averageStats={averageStats}
                            matchDates={matchDates}
                        ></ProfileColumn>
                    </div>
                    <div className="h-100 flex-fill ps-2">
                        <MatchHistory
                            data={data}
                            imageMap={imageMap}
                            handleFilter={handleFilter}
                            filter={filter}
                            handleShowMatchDetails={handleShowMatchDetails}
                        ></MatchHistory>
                        <MatchDetails
                            matchDetails={matchDetails}
                            imageMap={imageMap}
                            sortMatchDetails={sortMatchDetails}
                            showMatchDetails={showMatchDetails}
                            updateShowMatchDetails={updateShowMatchDetails}
                        ></MatchDetails>
                    </div>
                </Container>
            </Container>
        </>
    )
}

export default App
