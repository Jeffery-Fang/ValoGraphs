import { Stack } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import PlayerEntry from './PlayerEntry'

/**
 * playerMap - A dictionary that maps player names to their match data & visibility
 * handleAdd - A function that retrieves data for the name#tag in the text input
 * handleToggle - A generic function that toggles visibility of a playerEntry
 * handleDelete - A generic function that deletes a playerEntry
 */
interface PlayerStackProps {
    playerMap: { [playerName: string]: any }
    handleAdd: () => void
    handleToggle: (name: string) => void
    handleDelete: (name: string) => void
}

export default function PlayerStack({ playerMap, handleAdd, handleToggle, handleDelete }: PlayerStackProps) {
    return (
        <>
            <Stack
                className="border-top border-secondary border-2 d-block"
                style={{
                    minWidth: '20%',
                    overflowY: 'auto',
                }}
            >
                {Object.keys(playerMap).map((player: string) => {
                    return (
                        <PlayerEntry
                            nameAndTag={player}
                            handleToggle={() => handleToggle(player)}
                            handleDelete={() => handleDelete(player)}
                            visible={playerMap[player].visible}
                            key={player}
                        ></PlayerEntry>
                    )
                })}
                <Stack
                    direction="horizontal"
                    className="p-2 border-bottom border-end border-secondary border-2"
                    gap={2}
                >
                    <FaPlus className="invisible"></FaPlus>
                    <div className="vr text-light"></div>
                    <input
                        className="bg-transparent"
                        spellCheck="false"
                        autoComplete="off"
                        style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            fontFamily: 'Courier New, monospace',
                            fontSize: '16px',
                            color: 'white',
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
