import { Button, Grid, Modal, useMediaQuery, useTheme } from "@mui/material";
import TextField from "../../../../components/TextField/TextField";
import { DonorResult } from "../../../../../client/doador-client/types/donor-result";
import { useEffect, useState } from "react";

export type ModalDadosPessoaisProps = {
    open: boolean
    setOpen: (open: boolean) => void
    donor?: DonorResult | null
    handleUpdateDonor: (newDonor: DonorResult) => void
}

export function ModalDadosPessoais(props: ModalDadosPessoaisProps) {
    const { donor, open, setOpen } = props
    const [newDonor, setNewDonor] = useState<DonorResult | null>(donor || null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (open) {
            setNewDonor(donor || null);
        }
    }, [open, donor]);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'auto',
                }}
            >
                <>
                    {!newDonor && <p>Carregando...</p>}
                    {newDonor &&
                        <Grid
                            container
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            sx={{
                                backgroundColor: 'white',
                                padding: isSmallScreen ? 2 : 4,
                                borderRadius: '10px',
                                width: isSmallScreen ? '90%' : '60%',
                                maxWidth: '600px',
                                margin: isSmallScreen ? '10% 5%' : 'auto',
                                overflowY: 'auto',
                                maxHeight: '90vh',
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                display={'flex'}
                                flexDirection={'row'}
                                gap={2}
                            >
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Nome"
                                        value={newDonor.usuario.nome || ''}
                                        onChange={(event) => { 
                                            setNewDonor({ ...newDonor, 
                                                usuario: { ...newDonor.usuario, nome: event.target.value } 
                                            }) 
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="CPF"
                                        value={newDonor.cpf || ''}
                                        onChange={(event) => { 
                                            setNewDonor({ ...newDonor, cpf: event.target.value }) 
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={12}
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
                                    value={newDonor.usuario.email || ''}
                                    onChange={(event) => { 
                                        setNewDonor({ ...newDonor, 
                                            usuario: { ...newDonor.usuario, email: event.target.value } 
                                        }) 
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                mt={2}
                            >
                                <TextField
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '50px',
                                            backgroundColor: '#D9D9D9'
                                        }
                                    }}
                                    label="Logradouro"
                                    type="text"
                                    value={newDonor.usuario.endereco.logradouro || ''}
                                    onChange={(event) => {
                                        setNewDonor({ ...newDonor,
                                            usuario: { ...newDonor.usuario,
                                                endereco: { ...newDonor.usuario.endereco, logradouro: event.target.value } 
                                            } 
                                        }) 
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                display={'flex'}
                                flexDirection={'row'}
                                gap={2}
                                mt={2}
                            >
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Número"
                                        type="number"
                                        value={newDonor.usuario.endereco.numero || 0}
                                        onChange={(event) => { 
                                            setNewDonor({ ...newDonor, 
                                                usuario: { ...newDonor.usuario, 
                                                    endereco: { ...newDonor.usuario.endereco, 
                                                        numero: Number(event.target.value) 
                                                    } 
                                                } 
                                            }) 
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Bairro"
                                        type="text"
                                        value={newDonor.usuario.endereco.bairro || ''}
                                        onChange={(event) => { 
                                            setNewDonor({ ...newDonor, 
                                                usuario: { ...newDonor.usuario, 
                                                    endereco: { ...newDonor.usuario.endereco, bairro: event.target.value } 
                                                } 
                                            }) 
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                xs={12}
                                display={'flex'}
                                flexDirection={'row'}
                                gap={2}
                                mt={2}
                            >
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Cidade"
                                        type="text"
                                        value={newDonor.usuario.endereco.cidade || ''}
                                        onChange={(event) => { 
                                            setNewDonor({ ...newDonor, 
                                                usuario: { ...newDonor.usuario, 
                                                    endereco: { ...newDonor.usuario.endereco, cidade: event.target.value } 
                                                } 
                                            }) 
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Estado"
                                        type="text"
                                        value={newDonor.usuario.endereco.estado || ''}
                                        onChange={(event) => { 
                                            setNewDonor({ ...newDonor, 
                                                usuario: { ...newDonor.usuario, 
                                                    endereco: { ...newDonor.usuario.endereco, estado: event.target.value } 
                                                } 
                                            }) 
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                xs={12}
                                display={'flex'}
                                flexDirection={'row'}
                                gap={2}
                                mt={2}
                            >
                                <Grid
                                    item
                                    xs={6}
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
                                        value={newDonor.usuario.endereco.cep || ''}
                                        onChange={(event) => { 
                                            setNewDonor({ ...newDonor, 
                                                usuario: { ...newDonor.usuario, 
                                                    endereco: { ...newDonor.usuario.endereco, cep: event.target.value } 
                                                } 
                                            }) 
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Telefone"
                                        type="number"
                                        value={newDonor.usuario.telefones[0].numero || ''}
                                        onChange={(event) => {
                                            setNewDonor({
                                                ...newDonor,
                                                usuario: {
                                                    ...newDonor.usuario,
                                                    telefones: [{ numero: Number(event.target.value) }]
                                                }
                                            })
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                xs={12}
                                item
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                mt={4}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: '25px',
                                        padding: '10px 35px',
                                        backgroundColor: '#375A88',
                                        color: 'white'
                                    }}
                                    onClick={() => props.handleUpdateDonor(newDonor)}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        </Grid>}
                </>
            </Modal>
        </>
    )
}