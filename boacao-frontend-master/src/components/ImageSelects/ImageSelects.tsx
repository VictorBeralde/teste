import { Stack, Typography } from "@mui/material"
import { HiOutlineX } from "react-icons/hi"
import { HiOutlinePhoto } from "react-icons/hi2"

export type ImageSelectsProps = {
    src: string
    handleClickDelete: (index: number) => void
    index: number
}

export function ImageSelects(props: ImageSelectsProps) {
    const { handleClickDelete, index } = props
    return (
        <Stack direction="row" display="inline-flex" color={'white'}>
            <Stack alignItems="end">
                <HiOutlineX style={{ cursor: 'pointer' }} onClick={() => handleClickDelete(index)} />
            </Stack>
            <Stack alignItems="center" justifyContent="center">
                <Typography variant="subtitle2" align="center">
                    <HiOutlinePhoto fontSize="18px" /> Imagem {index + 1}
                </Typography>
            </Stack>
        </Stack>
    )
}
