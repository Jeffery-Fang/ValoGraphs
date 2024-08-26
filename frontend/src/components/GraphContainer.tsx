import { Stack } from 'react-bootstrap'
import Graph from './Graph'
import { stringToColour } from '../utils/commonFunctions'

/**
 * playerMap - A dictionary that maps player names to their match data & visibility
 */
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
            <Stack
                className="d-flex pt-2"
                style={{
                    minWidth: '80%',
                }}
            >
                <Stack direction="horizontal" className="d-flex flex-wrap" style={{ maxHeight: '33%' }}>
                    <div className="flex-fill" style={{ minWidth: '50%' }}>
                        <Graph
                            players={playersColors}
                            data={hsData}
                            unit="HS %"
                            title="Headshot Percentage"
                            reference={20}
                        ></Graph>
                    </div>
                    <div className="flex-fill" style={{ minWidth: '50%' }}>
                        <Graph
                            players={playersColors}
                            data={kdData}
                            unit="KDR"
                            title="Kill Death Ratio"
                            reference={0.9}
                        ></Graph>
                    </div>
                </Stack>
                <Stack direction="horizontal" className="d-flex flex-wrap" style={{ maxHeight: '33%' }}>
                    <div className="flex-fill" style={{ minWidth: '50%' }}>
                        <Graph
                            players={playersColors}
                            data={kdaData}
                            unit="KDA"
                            title="Kills, Deaths and Assists"
                            reference={1.25}
                        ></Graph>
                    </div>
                    <div className="flex-fill flex-fill" style={{ minWidth: '50%' }}>
                        <Graph
                            players={playersColors}
                            data={adrData}
                            unit="ADR"
                            title="Average Damage per Round"
                            reference={130}
                        ></Graph>
                    </div>
                </Stack>
                <Stack direction="horizontal" className="d-flex flex-wrap" style={{ maxHeight: '33%' }}>
                    <div className="flex-fill" style={{ minWidth: '50%' }}>
                        <Graph
                            players={playersColors}
                            data={acsData}
                            unit="ACS"
                            title="Average Contribution Score"
                            reference={200}
                        ></Graph>
                    </div>
                    <div className="flex-fill" style={{ minWidth: '50%' }}>
                        <Graph
                            players={playersColors}
                            data={ddData}
                            unit="DD Δ"
                            title="Difference between damage dealt and received per round"
                            reference={0}
                        ></Graph>
                    </div>
                </Stack>
            </Stack>
        </>
    )
}
