import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { default as Header } from '../../components/Header'
import { default as ProfileColumn } from '../../components/ProfileColumn'
import { handleProfileSearch } from '../../utils/commonFunctions'
import { retrieveData } from '../../utils/commonFunctions'

const gameModes: string[] = ['unrated', 'competitive', 'team deathmatch']

function App() {
    const { name, tag } = useParams()
    const [data, updateData] = useState<{ [playerName: string]: any }[]>([])
    const [currentMode, updateCurrentMode] = useState('unrated')
    const [imagesMap, updateImagesMap] = useState<{ [id: string]: string }>({})
    const [filter, updateFilter] = useState('')

    useEffect((): void => {
        init()
    }, [])

    async function init(): Promise<void> {
        if (name && tag) {
            let response: any = await (await retrieveData(name + '#' + tag, currentMode)).json()
            let newImagesMap: { [id: string]: string } = { ...imagesMap }

            if (!Object.keys(newImagesMap).includes('card')) {
                let assetData: any = await (
                    await fetch('https://valorant-api.com/v1/playercards/' + response[0].card_id, { method: 'GET' })
                ).json()

                newImagesMap['card'] = assetData['data']['wideArt']
            }

            for (let element of response) {
                if (!Object.keys(imagesMap).includes(element.agent)) {
                    let assetData: any = await (
                        await fetch('https://valorant-api.com/v1/agents/' + element.agent_id, { method: 'GET' })
                    ).json()

                    newImagesMap[element.agent] = assetData['data']['displayIcon']
                }
            }

            updateImagesMap(newImagesMap)
            updateData(response)
        } else {
            alert('Invalid name and tag')
        }
    }

    async function handleChangeMode(mode: string): Promise<void> {
        if (mode !== currentMode) {
            let response: any = await (await retrieveData(name + '#' + tag, mode)).json()
            let newImagesMap: { [id: string]: string } = { ...imagesMap }

            if (!Object.keys(newImagesMap).includes('card')) {
                let assetData: any = await (
                    await fetch('https://valorant-api.com/v1/playercards/' + response[0].card_id, { method: 'GET' })
                ).json()

                newImagesMap['card'] = assetData['data']['smallArt']
            }

            for (let element of response) {
                if (!Object.keys(imagesMap).includes(element.agent)) {
                    let assetData: any = await (
                        await fetch('https://valorant-api.com/v1/agents/' + element.agent_id, { method: 'GET' })
                    ).json()

                    newImagesMap[element.agent] = assetData['data']['displayIcon']
                }
            }

            updateImagesMap(newImagesMap)
            updateData(response)
            updateCurrentMode(mode)
        }
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

    for (let match of data) {
        avgHS += match.hs
        avgKDR += match.kills / (match.deaths || 1)
        avgKDA += (match.kills + match.assists) / (match.deaths || 1)
        avgADR += match.adr
        avgACS += match.acs
        avgDD += match.dd

        let time = new Date(match.date)
        let timeString = time.toLocaleDateString()
        if (Object.keys(dates).includes(timeString)) {
            ;(dates as any)[timeString] += 1
        } else {
            ;(dates as any)[timeString] = 1
        }
    }

    avgHS /= data.length
    avgKDR /= data.length
    avgKDA /= data.length
    avgADR /= data.length
    avgACS /= data.length
    avgDD /= data.length

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
            relative: Math.abs(avgADR / 130).toFixed(2),
        },
        {
            statName: 'ACS',
            value: avgACS.toFixed(2),
            relative: (avgACS / 238).toFixed(2),
        },
        {
            statName: 'DDΔ',
            value: avgDD.toFixed(2),
            relative: Math.abs(avgDD / 25).toFixed(2),
        },
    ]

    let matchDates = Object.keys(dates).map((date: string) => {
        return { date: date, 'games played': (dates as any)[date] }
    })
    matchDates.sort((a, b): number => new Date(a['date']).getTime() - new Date(b['date']).getTime())

    return (
        <>
            <Container fluid className="p-0 vh-100 vw-100 d-flex flex-column">
                <Header handlerMap={handlerMap} gameModes={gameModes}></Header>
                <Container fluid className=" p-0 h-100 d-flex flex-row justify-content-center">
                    <div className="w-75 h-100 border-start border-end border-dark border-3">
                        <ProfileColumn
                            mode={currentMode}
                            nameAndTag={name + '#' + tag}
                            imageMap={imagesMap}
                            averageStats={averageStats}
                            matchDates={matchDates}
                        ></ProfileColumn>
                    </div>
                </Container>
            </Container>
        </>
    )
}

export default App
