import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Modal } from "../../../../components/Modal";
import { HiUser } from "react-icons/hi";

export type ModalCommentsProps = {
    comments: { comment: string, user: string }[]
    open: boolean
    setOpen: (value: boolean) => void
}

export function ModalComments(props: ModalCommentsProps) {
    const { comments, open, setOpen } = props
    return (
        <>
            <Modal
                title="Comentários"
                open={open}
                setOpen={setOpen}
            >
                {comments && comments.map((comment, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: '100%',
                            boxShadow: 'none',
                            borderRadius: 2,
                            border: '1px solid #E0E0E0',
                            mt: 2
                        }}
                    >
                        <CardContent>
                            <Stack
                                display={'flex'}
                                flexDirection={'row'}
                                gap={2}
                            >
                                <HiUser style={{ fontSize: '55px' }} />
                                <Stack
                                    spacing={1}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={'bold'}
                                    >
                                        {comment.user || "USER"}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                    >
                                        {comment.comment}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Modal>
        </>
    )
}