import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import LogoCasa from "../../assets/logoCasa.png"
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlinePhone } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export type CardContactOngProps = {
    idOng: string
    nome: string
    email: string
    telefone: number
}

export function CardContactOng(props: CardContactOngProps) {
    const navigate = useNavigate()
    return (
        <>
            <Card
                sx={{
                    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.10)',
                    borderRadius: '10px'
                }}
            >
                <CardContent>
                    <Stack>
                        <Stack
                            direction={'row'}
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
                                    gap={2}
                                >
                                    {props.nome}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            display={'flex'}
                            ml={2}
                        >
                            <Typography
                                alignItems={'center'}
                                display={'flex'}
                                flexDirection={'row'}
                                textAlign={'justify'}
                                variant="subtitle2"
                                gap={2}
                            >
                                <Box>
                                    <HiOutlineEnvelope style={{ fontSize: '25px' }} />
                                </Box>
                                {props.email}
                            </Typography>
                            <Typography
                                alignItems={'center'}
                                display={'flex'}
                                flexDirection={'row'}
                                textAlign={'justify'}
                                mt={2}
                                variant="subtitle2"
                                gap={2}
                            >
                                <Box>
                                    <HiOutlinePhone style={{ fontSize: '25px' }} />
                                </Box>
                                {props.telefone}
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
                            onClick={() => navigate(`/ong/${props.idOng}`)}
                        >
                            Saiba mais
                        </Button>
                    </Stack>
            </CardContent>
        </Card >
        </>
    )
}