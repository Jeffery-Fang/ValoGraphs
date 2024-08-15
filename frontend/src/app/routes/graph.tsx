import { Container } from 'react-bootstrap'
import { useState } from 'react'
import { default as Header } from '../../components/Header'
import { default as PlayerStack } from '../../components/PlayerStack'

const gameModes: string[] = ['Unrated', 'Competitive', 'Team Deathmatch']
const allPlayers: string[] = [
    'Hexennacht#NA1',
    'Elsa Kanzaki#COLD',
    'Ratman123#Rat',
    'Gamerlord69#NA1',
    'SEN Sinatraa#Rich',
    'EAtTHICAsS#7070',
]

const visiblePlayers: string[] = [
    'Hexennacht#NA1',
    'Elsa Kanzaki#COLD',
    'Ratman123#Rat',
    'Gamerlord69#NA1',
    'SEN Sinatraa#Rich',
    'EAtTHICAsS#7070',
]

function App() {
    const [mode, updateMode] = useState('Unrated')
    const [players, updatePlayers] = useState(allPlayers)
    const [filteredPlayers, updatedFilteredPlayers] = useState(visiblePlayers)

    function handleChangeMode(mode: string): void {
        updateMode(mode)
    }

    function handleExportGraphs(): void {
        console.log('Exporting Graphs')
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

    function handleAdd(): void {
        let input: HTMLInputElement = document.getElementById('newPlayerInput') as HTMLInputElement

        if (input && input.value.includes('#')) {
            let newPlayers = [...players]
            newPlayers.push(input.value)
            updatePlayers(newPlayers)

            let newFilteredPlayers = [...filteredPlayers]
            newFilteredPlayers.push(input.value)
            updatedFilteredPlayers(newFilteredPlayers)

            input.value = ''
        } else {
            alert('Invalid Input')
        }
    }

    function handleToggle(i: number): void {
        let newFilteredPlayers = [...filteredPlayers]

        if (filteredPlayers.includes(players[i])) {
            newFilteredPlayers.splice(filteredPlayers.indexOf(players[i]), 1)
        } else {
            newFilteredPlayers.push(players[i])
        }

        updatedFilteredPlayers(newFilteredPlayers)
    }

    function handleDelete(i: number): void {
        let newPlayers = [...players]
        let newFilteredPlayers = [...filteredPlayers]

        if (filteredPlayers.includes(players[i])) {
            newFilteredPlayers.splice(filteredPlayers.indexOf(players[i]), 1)
        }

        newPlayers.splice(i, 1)
        updatePlayers(newPlayers)
        updatedFilteredPlayers(newFilteredPlayers)
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
                <PlayerStack
                    visiblePlayers={filteredPlayers}
                    allPlayers={players}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                ></PlayerStack>
            </Container>
        </>
    )
}

export default App
