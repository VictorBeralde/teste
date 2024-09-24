import { Button, Stack, Typography } from "@mui/material"
import { Modal } from "../../../../components/Modal"
import { useState } from "react"
import TextField from "../../../../components/TextField/TextField"

export type ModalFeedbackProps = {
    idDonation: string
    open: boolean
    setOpen: (open: boolean) => void
    handleUpdateStatus: (id: string, status: 'PENDENTE' | 'ACEITA' | 'NEGADA', feedback?: string | null) => void
}

export function ModalFeedback(props: ModalFeedbackProps) {
    const { open, setOpen, handleUpdateStatus} = props
    const [message, setMessage] = useState<string | null>(null)
    return (
        <>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Motivo"
            >
                <Stack
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Typography
                        variant="subtitle2"
                    >
                        Envie uma mensagem para o doador
                    </Typography>
                </Stack>
                <Stack
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    mt={2}
                >
                    <TextField
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        label="Mensagem"
                        multiline
                        rows={4}
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        onClick={() => {
                            handleUpdateStatus(props.idDonation, 'NEGADA', message)
                            setOpen(false)
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
                            },
                            mt: 4
                        }}>
                        <Typography variant="subtitle2" color="white">
                            Enviar
                        </Typography>
                    </Button>
                </Stack>
            </Modal>
        </>
    )
}