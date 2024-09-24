import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { RiCloseFill } from "react-icons/ri";

export type ModalProps = {
    children: ReactNode
    title?: string
    subtitle?: string
    open: boolean
    setOpen: (open: boolean) => void
    width?: number
}

export function Modal(props: ModalProps) {
    const { children, title, open, setOpen, subtitle } = props
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                sx={{
                    borderRadius: '10px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    width: props.width || 'auto',
                }}
            >
                <DialogTitle>
                    <Stack
                        direction={'column'}
                    >
                    <Typography
                        variant="h4"
                        fontWeight={'bold'}
                    >
                    {title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                    >
                    {subtitle}
                    </Typography>
                    </Stack>
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <RiCloseFill color='black' size={30} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    )
}