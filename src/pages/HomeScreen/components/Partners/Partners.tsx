import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CarouselWithImages } from "../../../../components/CarouselWithImages/CarouselWithImages";
import LogoCasa from '../../../../assets/logoCasa.png'

export function Partners() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const images = [
        LogoCasa,
        LogoCasa,
        LogoCasa,
        LogoCasa,
        LogoCasa,
        LogoCasa,
    ]
    return (
        <>
            <Stack
                width={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={2}
            >
                <Stack
                    width={matches ? '100%' : '50%'}
                    textAlign={'center'}
                >
                    <Typography
                        variant="h5"
                        color={'#375A88'}
                        fontWeight={'bold'}
                    >
                        Quem já está mudando o mundo...
                    </Typography>
                </Stack>
                <Stack
                    width={matches ? '80%' : '50%'}
                    textAlign={'center'}
                >
                    <Typography
                        variant="h6"
                        fontWeight={'bold'}
                    >
                        Conheça algumas ONgs que já aumentaram o seu impacto social com a Boação.
                    </Typography>
                </Stack>
                <Stack
                    width={'100%'}
                >
                    <CarouselWithImages
                        images={images}
                    />
                </Stack>
            </Stack>
        </>
    )
}