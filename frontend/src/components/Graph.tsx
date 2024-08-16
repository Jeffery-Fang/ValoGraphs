import { Container } from 'react-bootstrap'
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
            <Container
                fluid
                className="d-flex flex-wrap p-3"
                style={{ height: '30%', fontFamily: 'Courier New, monospace' }}
            >
                <div className="w-100 text-center ps-5">{title}</div>
                <ResponsiveContainer>
                    <LineChart title={title} data={data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
                        {Object.keys(players).map((playerName: string) => {
                            return (
                                <Line
                                    name={playerName}
                                    type="monotone"
                                    dataKey={playerName}
                                    stroke={players[playerName]}
                                    strokeWidth={2}
                                    key={playerName}
                                />
                            )
                        })}
                        <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                        <XAxis
                            stroke="black"
                            height={45}
                            style={{ fontSize: '10px', fontFamily: 'Courier New, monospace', fill: 'rgba(0, 0, 0, 1)' }}
                        >
                            <Label
                                position={'center'}
                                style={{
                                    fontSize: '11px',
                                    fontFamily: 'Courier New, monospace',
                                    fill: 'rgba(0, 0, 0, 1)',
                                }}
                            >
                                {'Recent Matchs (matches ago)'}
                            </Label>
                        </XAxis>
                        <YAxis
                            stroke="black"
                            width={70}
                            style={{ fontSize: '10px', fontFamily: 'Courier New, monospace', fill: 'rgba(0, 0, 0, 1)' }}
                        >
                            <Label
                                angle={-90}
                                style={{
                                    fontSize: '11px',
                                    fontFamily: 'Courier New, monospace',
                                    fill: 'rgba(0, 0, 0, 1)',
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
            </Container>
        </>
    )
}
