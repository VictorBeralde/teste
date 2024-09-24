import { Button, Stack, Typography } from "@mui/material";
import { Modal } from "../../../../components/Modal";
import { BsWhatsapp } from "react-icons/bs"

export type ModalCancelProps = {
    open: boolean
    setOpen: (open: boolean) => void
    phone: string
    setOpenFeedback: (open: boolean) => void
}

export function ModalCancel(props: ModalCancelProps) {
    const { open, setOpen, phone, setOpenFeedback } = props;
    return (
        <>
            <Modal
                open={open}
                setOpen={setOpen}
            >
                <Stack
                    display={'flex'}
                    alignContent={'center'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    width={'100%'}
                >
                    <Typography
                        variant="h6"
                        fontWeight={'bold'}
                    >
                        Deseja cancelar?
                    </Typography>
                </Stack>
                <Stack
                    width={'100%'}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    textAlign={'center'}
                    mt={4}
                    gap={10}
                >
                    <Button 
                        variant="contained"
                        onClick={() => {
                            setOpenFeedback(true);
                            setOpen(false);
                        }}
                        size="small"
                        sx={{
                            backgroundColor: 'green',
                            borderRadius: '25px',
                            padding: '10px 20px',
                            width: '160px',
                            height: '50px',
                            '&:hover': {
                                backgroundColor: 'darkgreen'
                            }
                        }}>
                        <Typography variant="subtitle2" color="white">
                            Cancelar
                        </Typography>
                    </Button>
                    <Button 
                        variant="contained"
                        size="small"
                        onClick={() => setOpen(false)} // Adicionando onClick handler aqui
                        sx={{
                            backgroundColor: 'red',
                            borderRadius: '25px',
                            padding: '10px 20px',
                            width: '160px',
                            height: '50px',
                            '&:hover': {
                                backgroundColor: 'darkred'
                            }
                        }}>
                        <Typography variant="subtitle2" color="white">
                            Não cancelar
                        </Typography>
                    </Button>
                </Stack>
                <Stack
                    width={'100%'}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    mt={4}
                >
                    <Typography
                        variant="subtitle2">
                            Mande mensagem para o doador
                    </Typography>
                    <Typography
                        variant="subtitle2"
                    >
                        <BsWhatsapp /> {phone}
                    </Typography>
                </Stack>
            </Modal>
        </>
    );
}
