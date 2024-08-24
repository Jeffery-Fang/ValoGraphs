import { Stack } from 'react-bootstrap'
import { LineChart, Line, CartesianGrid, YAxis, XAxis, ResponsiveContainer, Tooltip, Label } from 'recharts'

interface GraphProps {
    players: { [name: string]: any }
    data: { [name: string]: number }[]
    unit: string
    title: string
}

export default function Graph({ players, data, unit, title }: GraphProps) {
    return (
        <>
            <Stack className="text-wrap" style={{ fontFamily: 'Courier New, monospace' }}>
                <div className="text-center p-2" style={{ color: 'grey', fontSize: '20px' }}>
                    {title}
                </div>
                <ResponsiveContainer minWidth={400} aspect={3.4}>
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
                        <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                        <XAxis stroke="grey" height={50} strokeWidth={2} allowDecimals={false}>
                            <Label position={'center'}>{'Recent Matchs (matches ago)'}</Label>
                        </XAxis>
                        <YAxis stroke="grey" width={80} strokeWidth={2} allowDecimals={false}>
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
