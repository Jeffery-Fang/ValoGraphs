import { Stack, Form } from 'react-bootstrap'
import MatchEntry from './MatchEntry'

/**
 * data - An array of objects representing individual matches
 * imageMap - A dictionary that maps asset names to their links
 * handleFilter - A function that updates the filter base on a text input
 * filter - The filter currently being used on the matches
 * handleShowMatchDetails - A function that retrieves data for a specific match and toggles the MatchDetails components
 */
interface MatchHistoryProps {
    data: any
    imageMap: { [id: string]: string }
    handleFilter: () => void
    filter: string
    handleShowMatchDetails: (match_id: string) => void
}

export default function MatchHistory({
    data,
    imageMap,
    handleFilter,
    filter,
    handleShowMatchDetails,
}: MatchHistoryProps) {
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
                                    rounds_blue_won={match.rounds_blue_won}
                                    rounds_red_won={match.rounds_red_won}
                                    side={match.side}
                                    match_id={match.match_id}
                                    handleShowMatchDetails={() => {
                                        handleShowMatchDetails(match.match_id)
                                    }}
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
