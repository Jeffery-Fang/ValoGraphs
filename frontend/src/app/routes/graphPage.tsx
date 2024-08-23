import { Stack } from 'react-bootstrap'
import { useState } from 'react'
import Header from '../../components/Header'
import PlayerStack from '../../components/PlayerStack'
import GraphContainer from '../../components/GraphContainer'
import { retrievePlayerData, handleProfileSearch } from '../../utils/commonFunctions'

const gameModes: string[] = ['unrated', 'competitive', 'team deathmatch']

function App() {
    const [currentMode, updateCurrentMode] = useState('unrated')
    const [playerMap, updatePlayerMap] = useState<{ [playerName: string]: any }>({})

    async function handleChangeMode(mode: string): Promise<void> {
        if (currentMode != mode) {
            let newPlayerMap = { ...playerMap }

            for (let player of Object.keys(playerMap)) {
                let response = await retrievePlayerData(player, mode)

                if (response.status === 200) {
                    let data = await response.json()
                    newPlayerMap[player].data = data
                } else {
                    alert('Error retrieving data for ' + player)
                }
            }

            updatePlayerMap(newPlayerMap)
            updateCurrentMode(mode)
        }
    }

    async function handleAdd(): Promise<void> {
        let input: HTMLInputElement = document.getElementById('newPlayerInput') as HTMLInputElement

        if (input && input.value.includes('#')) {
            if (Object.keys(playerMap).includes(input.value)) {
                alert('Player is already graphed')
            } else {
                let response: any = await retrievePlayerData(input.value, currentMode)

                if (response.status === 200) {
                    let data = await response.json()
                    let newPlayerMap = { ...playerMap }
                    newPlayerMap[input.value] = { visible: true, data: data }
                    input.value = ''

                    updatePlayerMap(newPlayerMap)
                } else {
                    alert('Error retrieving data for ' + input.value)
                }
            }
        } else {
            alert('Invalid Input')
        }
    }

    function handleToggle(name: string): void {
        let newPlayerMap = { ...playerMap }

        if (Object.keys(newPlayerMap).includes(name)) {
            newPlayerMap[name].visible = !newPlayerMap[name].visible
        }
        updatePlayerMap(newPlayerMap)
    }

    function handleDelete(name: string): void {
        let newPlayerMap = { ...playerMap }

        delete newPlayerMap[name]
        updatePlayerMap(newPlayerMap)
    }

    const handlerMap: { [id: string]: any } = {
        'Back to Homepage': '/',
        'View Profile Page': handleProfileSearch,
        'Change Game Mode': handleChangeMode,
        'View GitHub Repository': import.meta.env.VITE_GITHUB_LINK,
    }

    return (
        <>
            <Stack
                className="vh-100 vw-100 d-flex"
                style={{
                    overflowY: 'hidden',
                    overflowX: 'hidden',
                }}
            >
                <Header handlerMap={handlerMap} gameModes={gameModes}></Header>
                <Stack direction="horizontal" className="w-100 h-100 bg-dark flex-fill">
                    <PlayerStack
                        playerMap={playerMap}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    ></PlayerStack>
                    <GraphContainer playerMap={playerMap}></GraphContainer>
                </Stack>
            </Stack>
        </>
    )
}

export default App
