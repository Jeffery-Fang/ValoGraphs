import { Container } from 'react-bootstrap'
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
