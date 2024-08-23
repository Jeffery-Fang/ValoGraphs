import { Stack, Image } from 'react-bootstrap'
import { calculateDateDiff } from '../utils/commonFunctions'

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
    match_id,
    handleShowMatchDetails,
}: MatchEntryProps) {
    return (
        <>
            <Stack
                direction="horizontal"
                className="border-top border-secondary border-2 d-flex"
                style={{
                    fontFamily: 'Courier New, monospace',
                    color: 'white',
                    fontSize: '13px',
                    cursor: 'pointer',
                }}
                gap={3}
                onClick={handleShowMatchDetails}
                id={match_id}
            >
                <Stack direction="horizontal" className="h-100" gap={1} style={{ width: '10%' }}>
                    {won ? (
                        <div className="vr p-1 text-bg-success"></div>
                    ) : (
                        <div className="vr p-1 text-bg-danger"></div>
                    )}
                    <Image rounded src={agentLink} height={60} className="p-2"></Image>
                    <Stack className="h-100 my-auto" gap={1}>
                        <div className="w-100">{mode}</div>
                        <div className="w-100">{map}</div>
                    </Stack>
                </Stack>
                <Stack direction="horizontal" className="my-auto text-center" gap={2} style={{ width: '90%' }}>
                    <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                        <div className="w-100">K / D / A</div>
                        <div className="w-100">{kills + ' / ' + deaths + ' / ' + assists}</div>
                    </Stack>
                    <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                        <div className="w-100">HS %</div>
                        <div className="w-100">{hs}</div>
                    </Stack>
                    <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                        <div className="w-100">DD Δ</div>
                        <div className="w-100">{dd}</div>
                    </Stack>
                    <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                        <div className="w-100">ADR</div>
                        <div className="w-100">{adr}</div>
                    </Stack>
                    <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                        <div className="w-100">ACS</div>
                        <div className="w-100">{acs}</div>
                    </Stack>
                    <Stack direction="vertical" className="my-auto" gap={1} style={{ maxWidth: '15%' }}>
                        {calculateDateDiff(new Date(), date) === 1
                            ? calculateDateDiff(new Date(), date) + ' day ago'
                            : calculateDateDiff(new Date(), date) === 0
                            ? 'Today'
                            : calculateDateDiff(new Date(), date) + ' days ago'}
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}
