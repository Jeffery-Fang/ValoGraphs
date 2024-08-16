import { CloseButton, Stack } from 'react-bootstrap'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { stringToColour } from '../utils/commonFunctions'

interface PlayerEntryProps {
    handleToggle: () => void
    handleDelete: () => void
    visible: boolean
    nameAndTag: string
}

export default function PlayerEntry({ handleToggle, handleDelete, visible, nameAndTag }: PlayerEntryProps) {
    return (
        <>
            <Stack direction="horizontal" className="p-2 border-bottom border-dark" gap={2}>
                {visible ? (
                    <FaRegEye
                        className="float-start"
                        onClick={() => {
                            handleToggle()
                        }}
                    ></FaRegEye>
                ) : (
                    <FaEyeSlash
                        className="float-start"
                        onClick={() => {
                            handleToggle()
                        }}
                    ></FaEyeSlash>
                )}
                <div className="vr"></div>
                <div
                    style={{
                        color: stringToColour(nameAndTag),
                        fontFamily: 'Courier New, monospace',
                        fontSize: '16px',
                    }}
                >
                    {nameAndTag}
                </div>
                <CloseButton
                    className="ms-auto"
                    onClick={() => {
                        handleDelete()
                    }}
                ></CloseButton>
            </Stack>
        </>
    )
}
