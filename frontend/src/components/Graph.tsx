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
            <Stack className="h-100" style={{ fontFamily: 'Courier New, monospace' }}>
                <div className="w-100 text-center pt-3" style={{ color: 'grey', fontSize: '20px' }}>
                    {title}
                </div>
                <ResponsiveContainer>
                    <LineChart title={title} data={data} margin={{ top: 10, right: 40, bottom: 0, left: 0 }}>
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
                        <XAxis stroke="grey" height={45} strokeWidth={2} style={{ fontSize: '10px' }}>
                            <Label
                                position={'center'}
                                style={{
                                    fontSize: '11px',
                                }}
                            >
                                {'Recent Matchs (matches ago)'}
                            </Label>
                        </XAxis>
                        <YAxis stroke="grey" width={70} strokeWidth={2} style={{ fontSize: '10px' }}>
                            <Label
                                angle={-90}
                                style={{
                                    fontSize: '11px',
                                }}
                            >
                                {unit}
                            </Label>
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
