import { Stack } from 'react-bootstrap'
import {
    LineChart,
    Line,
    CartesianGrid,
    YAxis,
    XAxis,
    ResponsiveContainer,
    Tooltip,
    Label,
    ReferenceLine,
} from 'recharts'

/**
 * players - A dictionary that maps a player name to a colour
 * data - A list of objects where each object represents a match a contains the value for each player for a specific stat
 * unit - The unit of the stat
 * title - The title of the graph
 * reference - A reference value for the stat
 */
interface GraphProps {
    players: { [name: string]: any }
    data: { [name: string]: number }[]
    unit: string
    title: string
    reference: number
}

export default function Graph({ players, data, unit, title, reference }: GraphProps) {
    return (
        <>
            <Stack className="text-wrap" style={{ fontFamily: 'Courier New, monospace' }}>
                <div className="text-center p-2" style={{ color: 'grey', fontSize: '20px' }}>
                    {title}
                </div>
                <ResponsiveContainer className="pe-4" minWidth={400} aspect={3.4}>
                    <LineChart
                        title={title}
                        data={data}
                        margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
                        style={{
                            fontSize: '12px',
                        }}
                    >
                        {Object.keys(players).map((playerName: string) => {
                            return (
                                <Line
                                    name={playerName}
                                    type="linear"
                                    dot={false}
                                    dataKey={playerName}
                                    stroke={players[playerName]}
                                    strokeWidth={1}
                                    key={playerName}
                                />
                            )
                        })}
                        <ReferenceLine
                            y={reference}
                            stroke="red"
                            strokeWidth={0.5}
                            ifOverflow="extendDomain"
                        ></ReferenceLine>
                        <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                        <XAxis stroke="grey" height={50} strokeWidth={2} allowDecimals={false}>
                            <Label position={'center'}>{'Recent Matchs (matches ago)'}</Label>
                        </XAxis>
                        <YAxis stroke="grey" width={70} strokeWidth={2} allowDecimals={false}>
                            <Label angle={-90}>{unit}</Label>
                        </YAxis>
                        {data.length !== 0 ? (
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#2A2A2A',
                                    padding: '10px',
                                    border: 'none',
                                }}
                                itemStyle={{
                                    color: '#E0E0E0',
                                    margin: '0px',
                                    textAlign: 'left',
                                    fontSize: '12px',
                                }}
                                labelStyle={{
                                    display: 'none',
                                }}
                            ></Tooltip>
                        ) : (
                            <></>
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </Stack>
        </>
    )
}
