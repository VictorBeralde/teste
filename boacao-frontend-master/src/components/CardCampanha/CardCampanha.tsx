import { Box, CardContent, Stack, Typography, Card } from "@mui/material";
import { IoIosPin } from "react-icons/io";
import { useState } from "react";
import { format } from "date-fns";
import BoacaoBanner from '../../assets/boAcao-banner.svg'

export type CardLabels = {
    primary: string
    secondary: string
    endereco: string
    dataFinal: Date
    bannerCampanha: string
}

export type CardProps = {
    label: CardLabels
    handleClick: () => void
}

export function CardCampanha(props: CardProps) {
    const { label, handleClick } = props
    const [showPhrase, setShowPhrase] = useState(false)

    const handleMouseEnter = () => {
        setShowPhrase(true);
    }

    const handleMouseLeave = () => {
        setShowPhrase(false);
    }

    return (
        <>
            <Card
                onClick={handleClick}
                sx={{
                    cursor: 'pointer',
                    boxShadow: '0px 0px 90px rgba(0, 0, 0, 0.2)',
                    borderRadius: 5,
                    position: 'relative',
                    height: '100%',
                    width: '100%'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Stack position="relative">
                        <Box
                            component="img"
                            src={label.bannerCampanha || BoacaoBanner}
                            alt="Campanha"
                            sx={{
                                height: '280px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                borderRadius: '10px'
                            }}
                        />
                        {showPhrase && (
                            <>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        display: 'flex',
                                        bottom: '2.5%',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px',
                                        borderRadius: '5px',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        zIndex: 2
                                    }}
                                >
                                    Data final: {format(new Date(label.dataFinal), 'dd/MM/yyyy')}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        position: 'absolute',
                                        display: 'flex',
                                        bottom: '5%',
                                        width: '100%',
                                        backgroundColor: 'rgba(55, 71, 79, 0.7)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        filter: 'blur(15px)',
                                        padding: '8px',
                                        borderRadius: '5px',
                                        color: 'white',
                                        zIndex: 1
                                    }}
                                >
                                </Typography>
                            </>
                        )}
                    </Stack>

                    <Stack
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                        height={'100%'}
                        mt={2}
                    >
                        <Stack
                            display={'flex'}
                            flexDirection={'column'}
                            height={'90%'}
                        >
                            <Typography fontSize={21} fontWeight={'bold'}>
                                {label.primary}
                            </Typography>
                            <Typography color={'text.primary'} variant="body2"  marginTop={1}>
                                {label.primary}
                            </Typography>
                        </Stack>
                        <Stack
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'space-between'}
                        >
                            <Typography
                                display={'flex'}
                                alignItems={'center'}
                                textAlign={'left'}  
                                variant="body2"
                                color={'text.secondary'} 
                                marginTop={3}
                            >
                                <Box
                                display={'flex'}
                                marginRight={1}
                                 alignItems={'center'}
                                > 
                                    <IoIosPin />
                                </Box>
                                {label.endereco}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}
