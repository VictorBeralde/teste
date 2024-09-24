import { Stack, Typography } from "@mui/material"
import { HiOutlineX } from "react-icons/hi"
import { HiOutlinePhoto } from "react-icons/hi2"

export type ImageSelectProps = {
    src: string
    handleClickDelete?: (index: number) => void
    index: number
    color?: string
}

export function ImageSelect(props: ImageSelectProps) {
    const { src, handleClickDelete, index, color } = props
    return (
        <Stack direction="column" display="inline-flex" m={1} p={1} border="1px solid #ccc" borderRadius="8px">
            <Stack alignItems="end">
                <HiOutlineX style={{ cursor: 'pointer', color: color ?? 'black' }} onClick={() => handleClickDelete && handleClickDelete(index)} />
            </Stack>
            <Stack alignItems="center" justifyContent="center">
                <img src={src} alt={`Imagem ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                <Typography variant="subtitle2" align="center" mt={1} color={color ?? 'black'}>
                    <HiOutlinePhoto fontSize="18px" /> Imagem {index + 1}
                </Typography>
            </Stack>
        </Stack>
    )
}
