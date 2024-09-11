import { CloseButton, Stack } from 'react-bootstrap'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { stringToColour } from '../utils/common_functions'

/**
 * handleToggle - A function that toggles the visible variable in the state of the application
 * handleDelete - A function that deletes this entry in the state of the application
 * handleSearch - A function that opens the profile page for this player
 * visible - A variable that where the eye is displayed normally or corssed out
 * nameAndTag - The text to be displayed on this entry
 */
interface PlayerEntryProps {
    handleToggle: () => void
    handleDelete: () => void
    handleSearch: () => void
    visible: boolean
    nameAndTag: string
}

export default function PlayerEntry({
    handleToggle,
    handleDelete,
    handleSearch,
    visible,
    nameAndTag,
}: PlayerEntryProps) {
    return (
        <>
            <Stack direction="horizontal" className="p-2 border-bottom border-end border-secondary border-2" gap={2}>
                {visible ? (
                    <FaRegEye
                        className="float-start text-secondary"
                        onClick={() => {
                            handleToggle()
                        }}
                    ></FaRegEye>
                ) : (
                    <FaEyeSlash
                        className="float-start text-secondary"
                        onClick={() => {
                            handleToggle()
                        }}
                    ></FaEyeSlash>
                )}
                <div className="vr text-light"></div>
                <div
                    style={{
                        color: stringToColour(nameAndTag),
                        fontFamily: 'Courier New, monospace',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                    onClick={handleSearch}
                >
                    {nameAndTag}
                </div>
                <CloseButton
                    className="ms-auto"
                    variant="white"
                    onClick={() => {
                        handleDelete()
                    }}
                ></CloseButton>
            </Stack>
        </>
    )
}
