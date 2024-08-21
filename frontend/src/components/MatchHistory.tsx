import { Stack, Form } from 'react-bootstrap'
import MatchEntry from './MatchEntry'

interface MatchHistoryProps {
    data: any
    imageMap: { [id: string]: string }
    handleFilter: () => void
    filter: string
}

export default function MatchHistory({ data, imageMap, handleFilter, filter }: MatchHistoryProps) {
    return (
        <>
            <Stack className="flex-fill d-flex bg-dark border-bottom border-secondary border-2">
                <div className="w-75 mx-auto p-3">
                    <Form>
                        <Form.Control
                            type="search"
                            spellCheck="false"
                            autoComplete="off"
                            placeholder="Filter by agent or map name"
                            className="bg-dark border-secondary"
                            aria-label="Search"
                            id="agentSearchInput"
                            data-bs-theme="dark"
                            style={{
                                fontFamily: 'Courier New, monospace',
                                color: 'white',
                                fontSize: '15px',
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                }
                            }}
                            onChange={() => {
                                handleFilter()
                            }}
                        />
                    </Form>
                </div>
                <div>
                    {data.map((match: any) => {
                        const agentRegex = new RegExp(filter, 'i')
                        const mapRegex = new RegExp(filter, 'i')

                        if (agentRegex.test(match.agent) || mapRegex.test(match.map)) {
                            return (
                                <MatchEntry
                                    agentLink={imageMap[match.agent]}
                                    map={match.map}
                                    kills={match.kills}
                                    deaths={match.deaths}
                                    assists={match.assists}
                                    hs={match.hs}
                                    dd={match.dd}
                                    adr={match.adr}
                                    acs={match.acs}
                                    date={match.date}
                                    mode={match.mode}
                                    won={match.won}
                                    key={match.match_id + match.player.id}
                                ></MatchEntry>
                            )
                        }
                    })}
                </div>
            </Stack>
        </>
    )
}
