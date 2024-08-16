import { Container, Stack } from 'react-bootstrap'
import { useState } from 'react'
import { default as Header } from '../../components/Header'
import { default as PlayerStack } from '../../components/PlayerStack'
import { default as GraphContainer } from '../../components/GraphContainer'

const gameModes: string[] = ['unrated', 'competitive', 'team deathmatch']

function App() {
    const [currentMode, updateCurrentMode] = useState('unrated')
    const [playerMap, updatePlayerMap] = useState<{ [playerName: string]: any }>({})

    async function handleChangeMode(mode: string): Promise<void> {
        if (currentMode != mode) {
            let newPlayerMap = { ...playerMap }

            for (let player of Object.keys(playerMap)) {
                let temp: string[] = player.split('#')
                let url: string =
                    import.meta.env.VITE_API_URL +
                    temp[0] +
                    '?tag=' +
                    temp[1] +
                    '&mode=' +
                    mode.replace(' ', '') +
                    '&size=10'
                let response: any = await fetch(url, { method: 'GET' })
                if (response.status === 200) {
                    let data = await response.json()
                    newPlayerMap[player].data = data
                } else {
                    alert('Error retrieving data')
                }
            }
            console.log(newPlayerMap)
            updatePlayerMap(newPlayerMap)
            updateCurrentMode(mode)
        }
    }

    async function handleExportGraphs(): Promise<void> {
        console.log('exporting graphs')
    }

    function handleProfileSearch(): void {
        let temp: string[]
        let input: HTMLInputElement = document.getElementById('profileSearchInput') as HTMLInputElement

        if (input) {
            temp = input.value.split('#')
        } else {
            temp = []
        }
        window.open(`/profile/${temp[0]}/${temp[1]}`, '_blank')
    }

    async function handleAdd(): Promise<void> {
        let input: HTMLInputElement = document.getElementById('newPlayerInput') as HTMLInputElement

        if (input && input.value.includes('#')) {
            if (Object.keys(playerMap).includes(input.value)) {
                alert('Player is already graphed')
            } else {
                let temp: string[] = input.value.split('#')
                let url: string =
                    import.meta.env.VITE_API_URL +
                    temp[0] +
                    '?tag=' +
                    temp[1] +
                    '&mode=' +
                    currentMode.replace(' ', '') +
                    '&size=10'
                let response: any = await fetch(url, { method: 'GET' })
                if (response.status === 200) {
                    let data = await response.json()
                    let newPlayerMap = { ...playerMap }
                    newPlayerMap[input.value] = { visible: true, data: data }
                    input.value = ''

                    updatePlayerMap(newPlayerMap)
                } else {
                    alert('Error retrieving data')
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
        'Export Graphs': handleExportGraphs,
        'View GitHub Repository': import.meta.env.VITE_GITHUB_LINK,
    }

    return (
        <>
            <Container fluid className="p-0" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header handlerMap={handlerMap} gameModes={gameModes}></Header>
                <Stack direction="horizontal" className="h-100 pe-4">
                    <PlayerStack
                        playerMap={playerMap}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    ></PlayerStack>
                    <GraphContainer playerMap={playerMap}></GraphContainer>
                </Stack>
            </Container>
        </>
    )
}

export default App
