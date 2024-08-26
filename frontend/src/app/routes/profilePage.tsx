import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../components/Header'
import ProfileColumn from '../../components/ProfileColumn'
import MatchHistory from '../../components/MatchHistory'
import MatchDetails from '../../components/MatchDetails'
import {
    handleProfileSearch,
    retrievePlayerData,
    retrieveMatchData,
    calculateAverageStats,
    countMatchsPerDay,
} from '../../utils/commonFunctions'

const gameModes: string[] = ['unrated', 'competitive', 'team deathmatch']

function App() {
    /**
     *  name, tag - The name and tag used to initialize the profile page
     *  currentMode - The current mode being displayed, when match data is retrieved it will for matches of this type
     *  data - An array of objects representing individual matches
     *  filter - The text that is going to be used to filter the matches via regex
     *  imageMap - A dictionary mapping an asset name to a link to its image
     *  matchDetails - An array of objects representing player performance for a particular match
     *  showMatchDetails - A variable keeping track of the visibility of the match details offcanvas element
     */
    const { name, tag } = useParams()
    const [currentMode, updateCurrentMode] = useState('competitive')
    const [data, updateData] = useState<{ [stat: string]: any }[]>([])
    const [filter, updateFilter] = useState('')
    const [imageMap, updateimageMap] = useState<{ [id: string]: string }>({})
    const [matchDetails, updateMatchDetails] = useState<{ [playerName: string]: any }[]>([])
    const [showMatchDetails, updateShowMatchDetails] = useState(false)

    useEffect((): void => {
        init()
    }, [])

    /**
     * Initializes the page by retrieving match data for the player and all required assets
     */
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

    /**
     * Updates match data and asset information if the new mode is different from the current one
     *
     * @param mode - The mode that the new data will be associated with
     */
    async function handleChangeMode(mode: string): Promise<void> {
        if (mode !== currentMode) {
            let response: any = await (await retrievePlayerData(name + '#' + tag, mode)).json()
            let newimageMap: { [id: string]: string } = { ...imageMap }

            if (!Object.keys(newimageMap).includes('card')) {
                let assetData: any = await (
                    await fetch('https://valorant-api.com/v1/playercards/' + response[0].card_id, { method: 'GET' })
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
            updateCurrentMode(mode)
        }
    }

    /**
     * Updates the filter for match entries
     */
    function handleFilter(): void {
        let input: HTMLInputElement = document.getElementById('agentSearchInput') as HTMLInputElement

        updateFilter(input.value.trim())
    }

    /**
     * Retrieves all the players associated with a match_id and toggles a offcanvas element
     * to display them
     *
     * @param match_id - The match_id that players are being retrieved for
     */
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

    /**
     * Sorts the player entries in the match details page by some parameter
     *
     * @param stat - The stat that player entries will be sorted by
     */
    function sortMatchDetails(stat: string): void {
        let newMatchDetails = [...matchDetails]
        switch (stat) {
            case 'name':
                newMatchDetails.sort((a, b): number => {
                    return a['player']['name'].localeCompare(b['player']['name'])
                })
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

    //A javascript object that maps text to handlers, to be used by the Header component
    //to determine what option are available in the offcanvas
    const handlerMap: { [id: string]: any } = {
        'Back to Homepage': '/',
        'View Profile Page': handleProfileSearch,
        'Change Game Mode': handleChangeMode,
        'View GitHub Repository': import.meta.env.VITE_GITHUB_LINK,
    }

    return (
        <>
            <Container fluid className="p-0 vh-100 bg-dark overflow-y-auto">
                <Header handlerMap={handlerMap} gameModes={gameModes}></Header>
                <Container fluid className="p-0 d-flex flex-wrap overflow-x-hidden">
                    <ProfileColumn
                        mode={currentMode}
                        nameAndTag={name + '#' + tag}
                        imageMap={imageMap}
                        averageStats={calculateAverageStats(data, filter, currentMode)}
                        matchDates={countMatchsPerDay(data, filter)}
                    ></ProfileColumn>
                    <div className="flex-fill" style={{ minWidth: '80%' }}>
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
