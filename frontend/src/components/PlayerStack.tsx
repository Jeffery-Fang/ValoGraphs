import { Stack } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import PlayerEntry from './PlayerEntry'

interface PlayerStackProps {
    visiblePlayers: string[]
    allPlayers: string[]
    handleAdd: () => void
    handleToggle: (i: number) => void
    handleDelete: (i: number) => void
}

export default function PlayerStackProps({
    visiblePlayers,
    allPlayers,
    handleAdd,
    handleToggle,
    handleDelete,
}: PlayerStackProps) {
    return (
        <>
            <Stack
                style={{
                    height: '100%',
                    width: '20%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                {allPlayers.map((player: string, index: number) => {
                    return (
                        <PlayerEntry
                            nameAndTag={player}
                            handleToggle={() => handleToggle(index)}
                            handleDelete={() => handleDelete(index)}
                            visible={visiblePlayers.includes(player)}
                            key={index}
                        ></PlayerEntry>
                    )
                })}
                <Stack direction="horizontal" className="p-2 border-bottom border-end border-dark" gap={2}>
                    <FaPlus className="invisible"></FaPlus>
                    <div className="vr"></div>
                    <input
                        spellCheck="false"
                        style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                        }}
                        id="newPlayerInput"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAdd()
                            }
                        }}
                    ></input>
                </Stack>
            </Stack>
        </>
    )
}
