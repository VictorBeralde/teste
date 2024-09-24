import { Stack, Typography } from "@mui/material";
import { Modal } from "../Modal/Modal";

export type ModalMotivoProps = {
    open: boolean
    setOpen: (open: boolean) => void
    feedback: string
}

export function ModalMotivo (props: ModalMotivoProps) {
    const { open, setOpen } = props
    return (
        <>
        <Modal
            title="Motivo"
            open={open}
            setOpen={setOpen}
        >
            <Stack>
                <Typography
                    variant="h4"
                >
                    {props.feedback}
                </Typography>
            </Stack>
        </Modal>
        </>
    )
}