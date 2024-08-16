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
                className="d-flex flex-wrap p-0 pt-3 pb-3"
                style={{ height: '30%', fontFamily: 'monospace' }}
            >
                <div className="w-100 text-center">{title}</div>
                <ResponsiveContainer>
                    <LineChart title={title} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        {Object.keys(players).map((playerName: string) => {
                            return (
                                <Line
                                    name={playerName}
                                    type="monotone"
                                    dataKey={playerName}
                                    stroke={players[playerName]}
                                    key={playerName}
                                />
                            )
                        })}
                        <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                        <XAxis
                            dataKey="dummy"
                            stroke="black"
                            style={{ fontSize: '10px', fontFamily: 'monospace', fill: 'rgba(0, 0, 0, 1)' }}
                        >
                            <Label
                                position={'center'}
                                style={{ fontSize: '12px', fontFamily: 'monospace', fill: 'rgba(0, 0, 0, 1)' }}
                            >
                                {'Recent Matchs'}
                            </Label>
                        </XAxis>
                        <YAxis
                            stroke="black"
                            style={{ fontSize: '10px', fontFamily: 'monospace', fill: 'rgba(0, 0, 0, 1)' }}
                        >
                            <Label
                                angle={-90}
                                style={{ fontSize: '12px', fontFamily: 'monospace', fill: 'rgba(0, 0, 0, 1)' }}
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
                                    fontSize: '10px',
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
