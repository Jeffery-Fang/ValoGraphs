import { CloseButton, Stack } from 'react-bootstrap'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'

interface PlayerEntryProps {
    handleToggle: () => void
    handleDelete: () => void
    visible: boolean
    nameAndTag: string
}

const stringToColour = (str: string) => {
    let hash = 0
    str.split('').forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        colour += value.toString(16).padStart(2, '0')
    }
    return colour
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
                <div style={{ color: stringToColour(nameAndTag) }}>{nameAndTag}</div>
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
