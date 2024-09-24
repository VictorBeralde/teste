import { Box, Button, Card, CardContent, Modal, Stack, Typography } from "@mui/material";
import VectorModal from '../../../../assets/vector_modal.svg';
import { useNavigate } from "react-router-dom";

export type ModalDonationMethodProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    idCampaign?: string
}

export function ModalDonationMethod(peops: ModalDonationMethodProps) {
    const { open, setOpen, idCampaign } = peops;
    const navigate = useNavigate()
    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        padding: '0',
                        margin: '0',
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '10px',
                        flexDirection: 'column'
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            padding: '0',
                            margin: '0',
                            width: '100%',
                            flexDirection: 'column',
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative', 
                                width: '100%',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                component="img"
                                src={VectorModal}
                                alt="Campanha"
                                sx={{
                                    width: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '10px'
                                }}
                            />
                            <Stack
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                flexDirection={'column'}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    color: 'white', 
                                    padding: '16px',
                                    borderRadius: '10px'
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textAlign={'center'}
                                >
                                    Para dar início a sua doação, é necessário escolher a opção abaixo
                                </Typography>
                            </Stack>
                        </Box>
                        <Stack
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            mt={2}
                        >
                            <Typography
                                variant="h6"
                            >
                                Sua doação será?
                            </Typography>
                        </Stack>
                        <Stack
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'space-evenly'}
                            flexDirection={'row'}
                            mb={3}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    width: '30%',
                                    backgroundColor: '#375A88',
                                    padding: '12px',
                                    borderRadius: '20px',
                                    color: 'white'
                                }}
                                onClick={() => navigate(`/campanha/doacao/faz-a-boa/pix/${idCampaign}`)}
                            >
                                <Typography
                                    variant="subtitle2"
                                >
                                    Pix
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    width: '30%',
                                    backgroundColor: '#375A88',
                                    padding: '12px',
                                    borderRadius: '20px',
                                    color: 'white'
                                }}
                                onClick={() => navigate(`/campanha/doacao/faz-a-boa/itens/${idCampaign}`)}
                            >
                                <Typography
                                    variant="subtitle2"
                                >
                                    Itens
                                </Typography>
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}
