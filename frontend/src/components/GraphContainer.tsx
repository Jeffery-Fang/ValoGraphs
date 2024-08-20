import { Stack } from 'react-bootstrap'
import Graph from './Graph'
import { stringToColour } from '../utils/commonFunctions'

interface GraphContainerProps {
    playerMap: { [playerName: string]: any }
}

export default function GraphContainer({ playerMap }: GraphContainerProps) {
    let hsData: { [playerName: string]: number }[] = []
    let kdData: { [playerName: string]: number }[] = []
    let kdaData: { [playerName: string]: number }[] = []
    let adrData: { [playerName: string]: number }[] = []
    let acsData: { [playerName: string]: number }[] = []
    let ddData: { [playerName: string]: number }[] = []
    let playersColors: { [playerName: string]: string } = {}

    for (let player of Object.keys(playerMap)) {
        if (!playerMap[player].visible) {
            continue
        }

        playersColors[player] = stringToColour(player)
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
            <Stack className="border-start border-secondary border-2 mh-100 w-100 p-0 d-flex">
                <Stack direction="horizontal" className="w-100 flex-fill">
                    <div className="w-50 h-100">
                        <Graph
                            players={playersColors}
                            data={hsData}
                            unit="Headshot Percentage (%)"
                            title="Headshot Percentage"
                        ></Graph>
                    </div>
                    <div className="w-50 h-100">
                        <Graph
                            players={playersColors}
                            data={kdData}
                            unit="Kills per Death"
                            title="Kill Death Ratio"
                        ></Graph>
                    </div>
                </Stack>
                <Stack direction="horizontal" className="w-100 flex-fill">
                    <div className="w-50 h-100">
                        <Graph
                            players={playersColors}
                            data={kdaData}
                            unit="Kills and Assists per Death"
                            title="Kills, Deaths and Assists"
                        ></Graph>
                    </div>
                    <div className="w-50 h-100">
                        <Graph
                            players={playersColors}
                            data={adrData}
                            unit="Average Damage per Round"
                            title="Average Damage per Round"
                        ></Graph>
                    </div>
                </Stack>
                <Stack direction="horizontal" className="w-100 flex-fill">
                    <div className="w-50 h-100">
                        <Graph
                            players={playersColors}
                            data={acsData}
                            unit="Average Contribution Score"
                            title="Average Contribution Score"
                        ></Graph>
                    </div>
                    <div className="w-50 h-100">
                        <Graph
                            players={playersColors}
                            data={ddData}
                            unit="Damage Difference per Round"
                            title="Difference between damage dealt and received per round"
                        ></Graph>
                    </div>
                </Stack>
            </Stack>
        </>
    )
}
