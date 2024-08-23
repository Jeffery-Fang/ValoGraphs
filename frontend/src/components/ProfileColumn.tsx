import { Stack, Image, Container } from 'react-bootstrap'
import {
    RadarChart,
    ResponsiveContainer,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    XAxis,
    Label,
    YAxis,
    BarChart,
    Bar,
} from 'recharts'

interface ProfileColumnProps {
    nameAndTag: string
    imageMap: { [id: string]: string }
    averageStats: { [statName: string]: string | number }[]
    matchDates: { [id: string]: any }[]
    mode: string
}

export default function ProfileColumn({ nameAndTag, imageMap, averageStats, matchDates, mode }: ProfileColumnProps) {
    return (
        <>
            <Stack
                className="h-100 w-100 bg-dark text-center border border-secondary border-2 d-flex"
                style={{
                    fontFamily: 'Courier New, monospace',
                    color: 'white',
                    fontSize: '15px',
                }}
                gap={3}
            >
                <Stack className="flex-fill">
                    <div className="p-3 h3 border-bottom border-secondary border-2">{nameAndTag}</div>
                    <Image rounded className="w-100 h-55 mx-auto m-3" src={imageMap['card']}></Image>
                    <div>
                        Last {mode === 'team deathmatch' ? 'team deathmatch played' : mode + ' match played'} :{' '}
                        {matchDates && matchDates.length > 0 ? matchDates[matchDates.length - 1].date : 'N/A'}
                    </div>
                </Stack>
                <Stack className="flex-fill" gap={3}>
                    <div
                        className="border-top border-bottom border-secondary border-2 p-2 text-capitalize"
                        style={{
                            fontSize: '17px',
                        }}
                    >
                        average {' ' + mode + ' '} statistics
                    </div>
                    <Stack className="pe-4" direction="horizontal">
                        <Stack>
                            <ResponsiveContainer>
                                <RadarChart data={averageStats} margin={{ right: 20, left: 20 }}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="statName" />
                                    <Radar dataKey="relative" stroke="#FF0000" fill="#FF0000" fillOpacity={0.5}></Radar>
                                </RadarChart>
                            </ResponsiveContainer>
                        </Stack>
                        <Stack className="my-auto text-start" gap={2}>
                            {averageStats.map((pair: { [statName: string]: string | number }) => {
                                return (
                                    <div key={pair.statName + ':' + pair.value}>
                                        {pair.statName + ': ' + pair.value}
                                    </div>
                                )
                            })}
                        </Stack>
                    </Stack>
                </Stack>
                <Stack className="flex-fill">
                    <div
                        className="border-top border-bottom border-secondary border-2 p-2 mb-3"
                        style={{
                            fontSize: '17px',
                        }}
                    >
                        Recent Games Played
                    </div>
                    <Container fluid className="h-75 p-0">
                        <ResponsiveContainer>
                            <BarChart data={matchDates} margin={{ top: 10, right: 30, left: 0 }}>
                                <Bar type="monotone" dataKey="games played" stroke="#FF0000"></Bar>
                                <XAxis
                                    dataKey="date"
                                    stroke="grey"
                                    height={50}
                                    style={{
                                        fontSize: '10px',
                                    }}
                                >
                                    <Label
                                        position={'center'}
                                        style={{
                                            fontSize: '12px',
                                        }}
                                    >
                                        {'Date'}
                                    </Label>
                                </XAxis>
                                <YAxis
                                    stroke="grey"
                                    width={45}
                                    allowDecimals={false}
                                    style={{
                                        fontSize: '10px',
                                    }}
                                >
                                    <Label
                                        angle={-90}
                                        style={{
                                            fontSize: '12px',
                                        }}
                                    >
                                        Games Played
                                    </Label>
                                </YAxis>
                            </BarChart>
                        </ResponsiveContainer>
                    </Container>
                </Stack>
            </Stack>
        </>
    )
}
