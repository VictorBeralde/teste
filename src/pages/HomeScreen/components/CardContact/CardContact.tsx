import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Phone from '../../../../assets/phone.svg'
import Whatsapp from '../../../../assets/whatsapp.svg'
import Email from '../../../../assets/email.svg'

export function CardContact() {
    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5
                }}
            >
                <CardContent>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        spacing={2}
                        gap={2}
                    >
                        <Stack
                            width={'100%'}
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'space-around'}
                            gap={7}
                        >
                            <Stack
                                display={'flex'}
                                alignItems={'start'}
                                width={'20%'}
                            >
                                <Box
                                    component="img"
                                    src={Phone}
                                    alignItems={'center'}
                                    justifyContent="center"
                                    alt={`Telefone`}
                                    sx={{
                                        objectFit: 'contain'
                                    }}
                                />
                            </Stack>
                            <Typography
                                variant="h6"
                                gap={2}
                                justifyContent={'space-around'}
                            >

                                11-9999-0000
                            </Typography>
                        </Stack>
                        <Stack
                            width={'100%'}
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'space-around'}
                            gap={6}
                        >
                            <Stack
                                display={'flex'}
                                alignItems={'start'}
                                width={'20%'}
                            >
                                <Box
                                    component="img"
                                    src={Whatsapp}
                                    alignItems={'center'}
                                    justifyContent="center"
                                    alt={`Whatsapp`}
                                    sx={{
                                        objectFit: 'contain'
                                    }}
                                />
                            </Stack>
                            <Typography
                                variant="h6"
                                gap={3}
                            >

                                11-9999-0000
                            </Typography>
                        </Stack>
                        <Stack
                            width={'100%'}
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'space-around'}
                            gap={2}
                        >
                            <Stack
                                display={'flex'}
                                alignItems={'start'}
                                width={'20%'}
                            >
                                <Box
                                    component="img"
                                    src={Email}
                                    alignItems={'center'}
                                    justifyContent="center"
                                    alt={`Email`}
                                    sx={{
                                        objectFit: 'contain'
                                    }}
                                />
                            </Stack>
                            <Typography
                                variant="h6"
                                gap={2}
                            >
                                email@email.com
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}