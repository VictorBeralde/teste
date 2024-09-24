import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { HiUser } from "react-icons/hi";
import { useState } from "react";
import { useCreateComment } from "../../hooks/useComment/use-create-comment";

export type EnviarComentarioProps = {
    idOng: string
}

export function EnviarComentario(props: EnviarComentarioProps) {
    const idDoador = sessionStorage.getItem('userType') || ''
    const [comment, setComment] = useState<string>('')

    const { mutateAsync: createComment } = useCreateComment()

    const handleCreateComment = async () => {
        createComment({
            descricao: comment,
            idOng: props.idOng,
            idDoador: idDoador
        })

        setComment('')
    }

    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    boxShadow: 'none',
                    borderRadius: 2,
                    border: '1px solid #E0E0E0',
                }}
            >
                <CardContent>
                    <Stack
                        display={'flex'}
                        flexDirection={'row'}
                        gap={2}
                    >
                        <HiUser style={{ fontSize: '55px' }} />
                        <TextField
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '5px',
                                    backgroundColor: '#D9D9D9'
                                }
                            }}
                            label="Comentário"
                            placeholder="Adicione um comentário"
                            variant="outlined"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: '#375A88',
                                padding: '10px 50px',
                                borderRadius: '5px'
                            }}
                            onClick={handleCreateComment}
                        >
                            Comentar
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}