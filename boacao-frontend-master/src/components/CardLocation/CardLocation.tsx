import { Box, Button, Card, CardContent, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import BoacaoBanner from '../../assets/boAcao-banner.svg'
import { HiOutlineBookmark } from "react-icons/hi2";
import { HiOutlineMapPin } from "react-icons/hi2";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { HiBookmark } from "react-icons/hi";

export type CardLocationProps = {
    idOng: string
    title?: string | null
    address: string
    distance: string
    isFavorited: boolean
    img?: string | null
    handleIsFavorited: (idOng: string, favorite: boolean) => void
    latitude?: string | null
    longitude?: string | null
}

export function CardLocation(props: CardLocationProps) {
    const theme = useTheme()
    const matchesTwo = useMediaQuery(theme.breakpoints.down('md'));

    function openGoogleMaps(latitude: string, longitude: string) {
        const latLng = `${latitude},${longitude}`;
        const uri = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(latLng)}`;
        window.open(uri, '_blank');
    }

    return (
        <>
            <Card
                sx={{
                    borderRadius: '10px',
                    height: '100%'
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <Box
                        component="img"
                        src={props.img || BoacaoBanner}
                        alt="Campanha"
                        sx={{
                            height: '210px',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            borderRadius: '10px'
                        }}
                    />
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        mt={2}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={'bold'}
                        >
                            {props.title ?? ''}
                        </Typography>
                        <Button
                            variant="text"
                            sx={{
                                width: 'auto',
                            }}
                            onClick={() => props.handleIsFavorited(props.idOng, props.isFavorited)}
                        >
                            {props.isFavorited ? <HiBookmark /> : <HiOutlineBookmark />}
                        </Button>
                    </Stack>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        mt={2}
                        gap={1}
                    >
                        <HiOutlineMapPin style={{ fontSize: '25px' }} />
                        <Typography
                            variant="subtitle2"
                        >
                            {props.address}
                        </Typography>
                    </Stack>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        mt={2}
                        gap={1}
                    >
                        <HiOutlineExclamationCircle style={{ fontSize: '25px' }} />
                        <Typography
                            variant="subtitle2"
                        >
                            {props.distance} km até seu endereço
                        </Typography>
                    </Stack>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        justifyContent={'flex-end'}
                        alignItems={'end'}
                        mt={1}
                    >
                        <Button
                            variant={'contained'}
                            sx={{
                                width: matchesTwo ? '60%' : '50%',
                                backgroundColor: '#375A88',
                                fontSize: '16px',
                                mt: matchesTwo ? 2 : 0
                            }}
                            onClick={() => openGoogleMaps(
                                props.latitude != null && props.latitude != undefined ? props.latitude : '', 
                                props.longitude != null && props.latitude != undefined ? props.longitude : ''
                            )}
                        >
                            Ver no mapa
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}
