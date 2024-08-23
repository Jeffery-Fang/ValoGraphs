import { Offcanvas, Stack, Image } from 'react-bootstrap'

interface MatchDetailsProps {
    matchDetails: { [playerName: string]: any }[]
    imageMap: { [id: string]: string }
    sortMatchDetails: (stat: string) => void
    showMatchDetails: boolean
    updateShowMatchDetails: (show: boolean) => void
}

export default function MatchDetails({
    matchDetails,
    imageMap,
    sortMatchDetails,
    showMatchDetails,
    updateShowMatchDetails,
}: MatchDetailsProps) {
    let map: string =
        matchDetails.length > 0 && Object.keys(matchDetails[0]).includes('map')
            ? matchDetails[0]['map']
            : 'No Map Specified'
    let mode: string =
        matchDetails.length > 0 && Object.keys(matchDetails[0]).includes('mode')
            ? matchDetails[0]['mode']
            : 'No Mode Specified'

    let rounds_blue_won: number =
        matchDetails.length > 0 && Object.keys(matchDetails[0]).includes('rounds_blue_won')
            ? matchDetails[0]['rounds_blue_won']
            : -1
    let rounds_red_won: number =
        matchDetails.length > 0 && Object.keys(matchDetails[0]).includes('rounds_red_won')
            ? matchDetails[0]['rounds_red_won']
            : -1
    return (
        <>
            <Offcanvas
                className="border-top border-secondary border-2"
                placement="end"
                show={showMatchDetails}
                onHide={() => {
                    updateShowMatchDetails(false)
                }}
                data-bs-theme="dark"
                backdrop={false}
                style={{
                    width: '80%',
                    height: '91%',
                    fontFamily: 'Courier New, monospace',
                    color: 'white',
                    fontSize: '16px',
                    marginTop: '4.25%',
                }}
            >
                <Offcanvas.Header className="pt-1 pb-2" closeButton>
                    <Stack direction="horizontal" className="w-100 d-flex" style={{ fontSize: '11px' }} gap={5}>
                        <div className="h-100 my-auto fw-bold ps-1" style={{ fontSize: '18px' }}>
                            <div className="w-100">{map}</div>
                            <div className="w-100">{mode}</div>
                        </div>
                        <div className="my-auto d-flex">
                            <Stack className="h-100 my-auto text-center text-primary">
                                <div className="w-100">Team Blue</div>
                                <div className="w-100">{rounds_blue_won}</div>
                            </Stack>
                            <div className="my-auto p-3">:</div>
                            <Stack className="h-100 my-auto text-center text-danger">
                                <div className="w-100">Team Red</div>
                                <div className="w-100">{rounds_red_won}</div>
                            </Stack>
                        </div>
                    </Stack>
                </Offcanvas.Header>
                <Offcanvas.Body className="border-top border-secondary border-2 p-0">
                    <Stack
                        direction="horizontal"
                        className="d-flex bg-dark-subtle"
                        style={{
                            fontFamily: 'Courier New, monospace',
                            color: 'white',
                            fontSize: '13px',
                        }}
                        gap={3}
                    >
                        <Stack direction="horizontal" className="h-100" gap={1} style={{ width: '10%' }}>
                            <div className="vr p-1 text-bg-success invisible"></div>
                            <Stack
                                className="h-100 my-auto"
                                style={{ marginLeft: 60, cursor: 'pointer' }}
                                onClick={() => {
                                    sortMatchDetails('name')
                                }}
                            >
                                <div className="w-100 ps-2">Name</div>
                            </Stack>
                        </Stack>
                        <Stack direction="horizontal" className="my-auto text-center" gap={2} style={{ width: '90%' }}>
                            <Stack
                                direction="vertical"
                                gap={1}
                                style={{ maxWidth: '15%', cursor: 'pointer' }}
                                onClick={() => {
                                    sortMatchDetails('kda')
                                }}
                            >
                                <div className="w-100">K / D / A</div>
                            </Stack>
                            <Stack
                                direction="vertical"
                                gap={1}
                                style={{ maxWidth: '15%', cursor: 'pointer' }}
                                onClick={() => {
                                    sortMatchDetails('hs')
                                }}
                            >
                                HS %
                            </Stack>
                            <Stack
                                direction="vertical"
                                gap={1}
                                style={{ maxWidth: '15%', cursor: 'pointer' }}
                                onClick={() => {
                                    sortMatchDetails('dd')
                                }}
                            >
                                DDΔ
                            </Stack>
                            <Stack
                                direction="vertical"
                                gap={1}
                                style={{ maxWidth: '15%', cursor: 'pointer' }}
                                onClick={() => {
                                    sortMatchDetails('adr')
                                }}
                            >
                                ADR
                            </Stack>
                            <Stack
                                direction="vertical"
                                gap={1}
                                style={{ maxWidth: '15%', cursor: 'pointer' }}
                                onClick={() => {
                                    sortMatchDetails('acs')
                                }}
                            >
                                ACS
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack className="border-bottom border-secondary border-2 d-flex">
                        {matchDetails.map((player: any) => {
                            return (
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
                                    key={player.player_id + player.match_id}
                                    onClick={() => {
                                        window.open(`/profile/${player.player.name}/${player.player.tag}`, '_blank')
                                    }}
                                >
                                    <Stack direction="horizontal" className="h-100" gap={1} style={{ width: '10%' }}>
                                        {player.side === 'Blue' ? (
                                            <div className="vr p-1 text-bg-primary"></div>
                                        ) : (
                                            <div className="vr p-1 text-bg-danger"></div>
                                        )}
                                        <Image rounded src={imageMap[player.agent]} height={60} className="p-2"></Image>
                                        <Stack className="h-100 my-auto" gap={1}>
                                            <div className="w-100">{player.player.name}</div>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        direction="horizontal"
                                        className="my-auto text-center"
                                        gap={2}
                                        style={{ width: '90%' }}
                                    >
                                        <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                                            <div className="w-100">
                                                {player.kills + ' / ' + player.deaths + ' / ' + player.assists}
                                            </div>
                                        </Stack>
                                        <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                                            <div className="w-100">{player.hs}</div>
                                        </Stack>
                                        <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                                            <div className="w-100">{player.dd}</div>
                                        </Stack>
                                        <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                                            <div className="w-100">{player.adr}</div>
                                        </Stack>
                                        <Stack direction="vertical" gap={1} style={{ maxWidth: '15%' }}>
                                            <div className="w-100">{player.acs}</div>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
