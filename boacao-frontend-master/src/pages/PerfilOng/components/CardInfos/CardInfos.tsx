import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { ChavePix } from "../../../../../client/ong-client/types";

export type CardInfosProps = {
    chavePix: ChavePix[]
    horarioFuncionamento: string
    descricao: string
    setOpen: (open: boolean) => void
}

export function CardInfos(props: CardInfosProps) {
    const { chavePix, horarioFuncionamento, descricao, setOpen} = props
    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    height: '200px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}
            >
                <CardContent>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        flexDirection={'row'}
                        gap={2}
                    >
                        <Stack
                            width={'100%'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Typography variant={'h6'}>
                                Chave Pix
                            </Typography>
                            <Typography variant={'subtitle2'}>
                                {chavePix && chavePix.length > 0 ? (chavePix[0].tipo + ":  " + chavePix[0].chave) : 'Sem chave pix cadastrada'}
                            </Typography>
                        </Stack>
                        <Stack
                            width={'100%'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Typography variant={'h6'}>
                                Horário de Funcionamento
                            </Typography>
                            <Typography variant={'subtitle2'}>
                                {horarioFuncionamento || 'Sem horário de funcionamento cadastrado'}
                            </Typography>
                        </Stack>
                        <Stack
                            width={'100%'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Typography variant={'h6'}>
                                Descrição da ong
                            </Typography>
                            <Typography variant={'subtitle2'}>
                                {descricao || 'Sem descrição cadastrada'}
                            </Typography>
                        </Stack>
                        <Stack
                            width={'10%'}
                            display={'flex'}
                            alignItems={'flex-start'}
                            justifyContent={'flex-start'}
                            mb={10}
                        >
                            <Button
                                variant="text"
                                onClick={() => setOpen(true)}
                            >
                                Editar
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}