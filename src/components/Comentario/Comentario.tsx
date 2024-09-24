import { Button, Card, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { HiUser } from "react-icons/hi";
import { useCommentsByOngId } from "../../hooks/useComment/use-comments-by-ong-id";

export type ComentarioProps = {
    idOng: string
    setOpen: (value: boolean) => void
    setComments: (comments: { comment: string, user: string }[]) => void
}

export function Comentario(props: ComentarioProps) {
    const { idOng } = props

    const { data, isLoading, isError } = useCommentsByOngId(idOng)

    const handleClick = () => {
        props.setComments(data?.map((comment) => ({ comment: comment.descricao, user: comment.nomeUsuarioDoador })) || [])
        props.setOpen(true)
    }

    return (
        <>
            {isLoading && <Grid xs={12} mt={4} display={'flex'} alignItems={'center'} justifyContent={'center'}> <CircularProgress /> </Grid>}
            {isError && <Typography>Erro ao buscar comentários</Typography>}
            {!isLoading && !isError && data && data.length === 0 && <>Sem Comentários</>}
            {!isLoading && !isError && data && data.length > 3 &&
                <Grid
                    xs={12}
                    display={'flex'}
                    alignItems={'end'}
                    justifyContent={'flex-end'}
                >
                    <Button
                        onClick={handleClick}
                    >
                        <Typography variant="subtitle2">
                            Ver todos
                        </Typography>
                    </Button>
                </Grid>}
            {!isLoading && !isError && data && data.length > 0 && data.slice(0, 3).map((comentario) => (
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
                            <Stack
                                spacing={1}
                            >
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={'bold'}
                                >
                                    {comentario.nomeUsuarioDoador || "USER"}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                >
                                    {comentario.descricao}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}