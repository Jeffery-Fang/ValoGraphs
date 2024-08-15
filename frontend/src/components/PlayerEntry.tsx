import { CloseButton, Stack } from 'react-bootstrap'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'

interface PlayerEntryProps {
    handleToggle: () => void
    handleDelete: () => void
    visible: boolean
    nameAndTag: string
}

export default function PlayerEntry({ handleToggle, handleDelete, visible, nameAndTag }: PlayerEntryProps) {
    return (
        <>
            <Stack direction="horizontal" className="p-2 border-bottom border-end border-dark" gap={2}>
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
                <div>{nameAndTag}</div>
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
