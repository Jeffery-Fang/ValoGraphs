import { Container } from 'react-bootstrap'
import { useState } from 'react'
import Header from '../../components/Header'
import PlayerStack from '../../components/PlayerStack'
import GraphContainer from '../../components/GraphContainer'
import { retrievePlayerData, handleProfileSearch } from '../../utils/commonFunctions'

const gameModes: string[] = ['unrated', 'competitive', 'team deathmatch']

function App() {
    /**
     * currentMode - The current mode being displayed, when match data is retrieved it will for matches of this type
     * playerMap - A dictionary mapping a player name to an array of their match data
     */
    const [currentMode, updateCurrentMode] = useState('competitive')
    const [playerMap, updatePlayerMap] = useState<{ [playerName: string]: any }>({})

    /**
     * Retrieves match data for the new player if the input is valid
     */
    async function handleAdd(): Promise<void> {
        let input: HTMLInputElement = document.getElementById('newPlayerInput') as HTMLInputElement

        if (input && input.value.includes('#')) {
            let inputValue: string = input.value.trim()

            if (Object.keys(playerMap).includes(inputValue)) {
                alert('Player is already graphed')
            } else {
                let response: any = await retrievePlayerData(inputValue, currentMode)

                if (response.status === 200) {
                    let data = await response.json()
                    let newPlayerMap = { ...playerMap }
                    newPlayerMap[inputValue] = { visible: true, data: data }
                    input.value = ''

                    updatePlayerMap(newPlayerMap)
                }
            }
        } else {
            alert('Invalid Input')
        }
    }

    /**
     * Updates the match data for all players  if the new mode is different from the current mode
     *
     * @param mode - The mode that the new data will be associated with
     */
    async function handleChangeMode(mode: string): Promise<void> {
        if (currentMode != mode) {
            let newPlayerMap = { ...playerMap }

            for (let player of Object.keys(playerMap)) {
                let response = await retrievePlayerData(player, mode)

                if (response.status === 200) {
                    let data = await response.json()
                    newPlayerMap[player].data = data
                } else {
                    newPlayerMap[player].data = []
                }
            }

            updatePlayerMap(newPlayerMap)
            updateCurrentMode(mode)
        }
    }

    /**
     * Deletes the data of the specified player
     *
     * @param name - The name of the player whose data is to be deleted
     */
    function handleDelete(name: string): void {
        let newPlayerMap = { ...playerMap }

        delete newPlayerMap[name]
        updatePlayerMap(newPlayerMap)
    }

    /**
     * Toggles visibility of lines associated with the name
     *
     * @param name - The name of the player whose data visibility is to be toggles
     */
    function handleToggle(name: string): void {
        let newPlayerMap = { ...playerMap }

        if (Object.keys(newPlayerMap).includes(name)) {
            newPlayerMap[name].visible = !newPlayerMap[name].visible
        }
        updatePlayerMap(newPlayerMap)
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
            <Container fluid className="p-0 vh-100 d-flex flex-wrap bg-dark overflow-x-hidden">
                <Header handlerMap={handlerMap} gameModes={gameModes}></Header>
                <PlayerStack
                    playerMap={playerMap}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                ></PlayerStack>
                <GraphContainer playerMap={playerMap}></GraphContainer>
            </Container>
        </>
    )
}

export default App
