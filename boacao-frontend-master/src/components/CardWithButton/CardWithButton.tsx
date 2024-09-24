import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { IoIosPin } from "react-icons/io"
import { HiCalendar } from "react-icons/hi"
import LogoCasa from "../../assets/logoCasa.png"

export type CardWithButtonProps = {
    icon?: string
    title: string
    address: string
    data: string,
    handleClickButton: () => void
    index: number
}

export function CardWithButton(props: CardWithButtonProps) {
    return (
        <>
            <Card
                sx={{
                    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.10)',
                    borderRadius: '10px',
                }}
            >
                <CardContent>
                    <Stack>
                        <Stack direction={'row'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <img src={LogoCasa} alt="LogoCasa" />
                            <Stack 
                                display={'flex'}
                                alignItems={'center'}>
                                <Typography
                                    variant="h6"
                                    fontWeight={'bold'}
                                >
                                    {props.title}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography
                                alignItems={'center'}
                                display={'flex'}
                                flexDirection={'row'}
                                textAlign={'justify'}
                                variant="subtitle2"
                                gap={2}
                                ml={2}
                            >
                                <Box>
                                    <IoIosPin style={{ fontSize: '25px' }} />
                                </Box>
                                {props.address}
                            </Typography>
                            <Typography
                                alignItems={'center'}
                                display={'flex'}
                                flexDirection={'row'}
                                textAlign={'justify'}
                                mt={2}
                                variant="subtitle2"
                                gap={2}
                                ml={2}
                            >
                                <Box>
                                    <HiCalendar style={{ fontSize: '25px' }} />
                                </Box>
                                {props.data}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        alignItems={'center'}
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        mt={2}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 5,
                                padding: '5px 20px 5px 20px',
                                backgroundColor: '#375A88',
                            }}
                            onClick={() => props.handleClickButton()}
                        >
                            Ver mais
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}