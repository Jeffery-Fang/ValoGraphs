import { Stack, Image } from 'react-bootstrap'
import { calculateDateDiff } from '../utils/commonFunctions'

/**
 * agentLink - A link to a picture of the agent
 * map - The map this match was played on
 * kills - The number of kills gotten this match
 * deaths - The number of times the player died this match
 * assists - The number of assists this match
 * hs - The headshot percentage this match
 * dd - The damage difference this match
 * adr - The average damage per round this match
 * acs - The average contribution score this match
 * date - The date this match was played on
 * mode - The mode this match was played on
 * won - Whether the played won this match or not
 * rounds_blue_won - The number of rounds the blue team won
 * rounds_red_won - The number of rounds the red team won
 * side - The team the player was on
 * match_id - The id of this match
 * handleShowMatchDetails - Toggles visibilitiy of matchDetails
 */
interface MatchEntryProps {
    agentLink: string
    map: string
    kills: number
    deaths: number
    assists: number
    hs: number
    dd: number
    adr: number
    acs: number
    date: Date
    mode: string
    won: boolean
    rounds_blue_won: number
    rounds_red_won: number
    side: string
    match_id: string
    handleShowMatchDetails: () => void
}

export default function MatchEntry({
    agentLink,
    map,
    kills,
    deaths,
    assists,
    hs,
    dd,
    adr,
    acs,
    date,
    mode,
    won,
    rounds_blue_won,
    rounds_red_won,
    side,
    match_id,
    handleShowMatchDetails,
}: MatchEntryProps) {
    return (
        <>
            <Stack
                direction="horizontal"
                className="border-top border-secondary border-2 w-100"
                style={{
                    fontFamily: 'Courier New, monospace',
                    color: 'white',
                    fontSize: '13px',
                    cursor: 'pointer',
                }}
                onClick={handleShowMatchDetails}
                id={match_id}
            >
                {won ? <div className="vr p-1 text-bg-success"></div> : <div className="vr p-1 text-bg-danger"></div>}
                <Stack
                    direction="horizontal"
                    className="d-flex flex-wrap flex-fill"
                    style={{
                        fontFamily: 'Courier New, monospace',
                        color: 'white',
                        fontSize: '13px',
                        cursor: 'pointer',
                    }}
                    onClick={handleShowMatchDetails}
                    id={match_id}
                >
                    <Stack direction="horizontal" className="flex-fill">
                        <Image rounded src={agentLink} height={60} className="p-2"></Image>
                        <Stack className="my-auto" gap={1}>
                            <div>{mode}</div>
                            <div>{map}</div>
                        </Stack>
                    </Stack>
                    <Stack className="flex-fill" style={{ minWidth: '100px', maxWidth: '100px' }}>
                        <div className="my-auto mx-auto">
                            {side === 'Blue'
                                ? rounds_blue_won + ' : ' + rounds_red_won
                                : rounds_red_won + ' : ' + rounds_blue_won}
                        </div>
                    </Stack>
                    <Stack direction="horizontal" className="my-auto text-center flex-fill" style={{ minWidth: '80%' }}>
                        <Stack direction="vertical" gap={1} style={{ minWidth: '20%' }}>
                            <div className="w-100">K / D / A</div>
                            <div className="w-100">{kills + ' / ' + deaths + ' / ' + assists}</div>
                        </Stack>
                        <Stack direction="vertical" gap={1} style={{ width: '10%' }}>
                            <div className="w-100">HS %</div>
                            <div className="w-100">{hs}</div>
                        </Stack>
                        <Stack direction="vertical" gap={1} style={{ width: '10%' }}>
                            <div className="w-100">DD Δ</div>
                            <div className="w-100">{Math.round(dd)}</div>
                        </Stack>
                        <Stack direction="vertical" gap={1} style={{ width: '10%' }}>
                            <div className="w-100">ADR</div>
                            <div className="w-100">{Math.round(adr)}</div>
                        </Stack>
                        <Stack direction="vertical" gap={1} style={{ width: '10%' }}>
                            <div className="w-100">ACS</div>
                            <div className="w-100">{Math.round(acs)}</div>
                        </Stack>
                        <Stack direction="vertical" className="my-auto" gap={1} style={{ width: '15%' }}>
                            {calculateDateDiff(new Date(), date) === 1
                                ? calculateDateDiff(new Date(), date) + ' day ago'
                                : calculateDateDiff(new Date(), date) === 0
                                ? 'Today'
                                : calculateDateDiff(new Date(), date) + ' days ago'}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}
