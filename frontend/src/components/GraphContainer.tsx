import { Container, Stack } from 'react-bootstrap'
import { default as Graph } from './Graph'
import { Legend } from 'recharts'

interface GraphContainerProps {
    playerMap: { [playerName: string]: any }
}
const stringToColour = (str: string) => {
    let hash = 0
    str.split('').forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        colour += value.toString(16).padStart(2, '0')
    }
    return colour
}

export default function GraphContainer({ playerMap }: GraphContainerProps) {
    let hsData: { [playerName: string]: number }[] = []
    let kdData: { [playerName: string]: number }[] = []
    let kdaData: { [playerName: string]: number }[] = []
    let adrData: { [playerName: string]: number }[] = []
    let acsData: { [playerName: string]: number }[] = []
    let ddData: { [playerName: string]: number }[] = []
    let players: { [playerName: string]: string } = {}

    for (let player of Object.keys(playerMap)) {
        if (!playerMap[player].visible) {
            continue
        }

        players[player] = stringToColour(player)
        for (let i: number = 0; i < playerMap[player].data.length; i++) {
            if (i >= hsData.length) {
                hsData.push({ matchNum: i + 1 })
                kdData.push({ matchNum: i + 1 })
                kdaData.push({ matchNum: i + 1 })
                adrData.push({ matchNum: i + 1 })
                acsData.push({ matchNum: i + 1 })
                ddData.push({ matchNum: i + 1 })
            }
            hsData[i][player] = Math.round(playerMap[player]['data'][i]['hs'] * 100) / 100
            kdData[i][player] =
                Math.round(
                    (playerMap[player]['data'][i]['kills'] / (playerMap[player]['data'][i]['deaths'] || 1)) * 100
                ) / 100
            kdaData[i][player] =
                Math.round(
                    ((playerMap[player]['data'][i]['kills'] + playerMap[player]['data'][i]['assists']) /
                        (playerMap[player]['data'][i]['deaths'] || 1)) *
                        100
                ) / 100
            adrData[i][player] = Math.round(playerMap[player]['data'][i]['adr'] * 100) / 100
            acsData[i][player] = Math.round(playerMap[player]['data'][i]['acs'] * 100) / 100
            ddData[i][player] = Math.round(playerMap[player]['data'][i]['dd'] * 100) / 100
        }
    }

    return (
        <>
            <Container fluid className="border-start border-dark h-100 d-flex flex-wrap">
                <Legend></Legend>
                <Stack className="p-3 w-50">
                    <Graph
                        players={players}
                        data={hsData}
                        unit="Headshot Percentage (%)"
                        title="Headshot Percentage"
                    ></Graph>
                    <Graph players={players} data={kdData} unit="Kills per Death" title="Kill Death Ratio"></Graph>
                    <Graph
                        players={players}
                        data={kdaData}
                        unit="Kills and Assists per Death"
                        title="Kills, Deaths and Assists"
                    ></Graph>
                </Stack>
                <Stack className="p-3 w-50">
                    <Graph
                        players={players}
                        data={adrData}
                        unit="Average Damage per Round"
                        title="Average Damage per Round"
                    ></Graph>
                    <Graph
                        players={players}
                        data={acsData}
                        unit="Average Contribution Score"
                        title="Average Contribution Score"
                    ></Graph>
                    <Graph
                        players={players}
                        data={ddData}
                        unit="Damage Difference per Round"
                        title="Difference between damage dealt and received per round"
                    ></Graph>
                </Stack>
            </Container>
        </>
    )
}
