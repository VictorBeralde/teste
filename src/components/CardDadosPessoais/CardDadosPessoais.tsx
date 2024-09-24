import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

export type CardDadosPessoaisProps = {
    email: string
    cep: string
    endereco: string
    telefone: number
    numero: number
    bairro: string
    setOpen: (open: boolean) => void
}

export function CardDadosPessoais(props: CardDadosPessoaisProps) {
    return (
        <>
            <Card
            
                sx={{
                    height: 'auto',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
            >
                <CardContent>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        
                    >
                        <Typography
                            variant="h6"
                        >
                            Dados pessoais
                        </Typography>
                    </Stack>
                    <Stack
                        width={'100%'}
                        mt={2}
                    >
                        <TextField
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '50px',
                                    backgroundColor: '#D9D9D9'
                                }
                            }}
                            label="Email"
                            type="email"
                            value={props.email}
                            fullWidth
                            disabled
                        />
                    </Stack>
                    <Stack
                        width={'100%'}
                        mt={2}
                    >
                        <TextField
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '50px',
                                    backgroundColor: '#D9D9D9'
                                }
                            }}
                            label="Lograadouro"
                            type="text"
                            value={props.endereco}
                            variant="outlined"
                            fullWidth
                            disabled
                        />
                    </Stack>
                    <Stack
                        width={'100%'}
                        direction={'row'}
                        mt={2}
                        gap={2}
                    >
                        <TextField
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '50px',
                                    backgroundColor: '#D9D9D9'
                                }
                            }}
                            label="Número"
                            type="text"
                            value={props.numero}
                            fullWidth
                            disabled
                        />
                        <TextField
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '50px',
                                    backgroundColor: '#D9D9D9'
                                }
                            }}
                            label="Bairro"
                            type="text"
                            value={props.bairro}
                            fullWidth
                            disabled
                        />
                    </Stack>
                    <Stack
                        width={'100%'}
                        direction={'row'}
                        mt={2}
                        gap={2}
                    >
                        <TextField
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '50px',
                                    backgroundColor: '#D9D9D9'
                                }
                            }}
                            label="CEP"
                            type="text"
                            value={props.cep}
                            fullWidth
                            disabled
                        />
                        <TextField
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '50px',
                                    backgroundColor: '#D9D9D9'
                                }
                            }}
                            label="Telefone"
                            type="text"
                            value={props.telefone}
                            fullWidth
                            disabled
                        />
                    </Stack>
                    <Stack
                        width={'100%'}
                        mt={4}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '25px',
                                padding: '10px 35px',
                                backgroundColor: '#375A88',
                                color: 'white'
                            }}
                            onClick={() => props.setOpen(true)}
                        >
                            Editar
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}