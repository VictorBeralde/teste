import { Button, Grid, Modal, useMediaQuery, useTheme } from "@mui/material";
import TextField from "../../../../components/TextField/TextField";
import { useEffect, useState } from "react";
import { OngResult } from "../../../../../client/ong-client/types";

export type ModalDadosPessoaisOngProps = {
    open: boolean
    setOpen: (open: boolean) => void
    ong?: OngResult | null
    handleUpdateDonor: (newOng: OngResult) => void
}

export function ModalDadosPessoaisOng(props: ModalDadosPessoaisOngProps) {
    const { ong, open, setOpen } = props
    const [newOng, setNewOng] = useState<OngResult | null>(ong || null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (open) {
            setNewOng(ong || null);
        }
    }, [open, ong]);

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
                    {!newOng && <p>Carregando...</p>}
                    {newOng &&
                        <>
                            <Grid
                                item
                                xs={12}
                                display={'flex'}
                                flexDirection={'row'}
                                gap={2}
                            >
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Pix"
                                        value={newOng.usuario.nome || ''}
                                        onChange={(event) => {
                                            setNewOng({
                                                ...newOng,
                                                usuario: { ...newOng.usuario, nome: event.target.value }
                                            })
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="CNPJ"
                                        value={newOng.cnpj || ''}
                                        onChange={(event) => {
                                            setNewOng({ ...newOng, cnpj: event.target.value })
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                display={'flex'}
                                flexDirection={'row'}
                                gap={2}
                            >
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Email"
                                        type="email"
                                        value={newOng.usuario.email || ''}
                                        onChange={(event) => {
                                            setNewOng({
                                                ...newOng,
                                                usuario: { ...newOng.usuario, email: event.target.value }
                                            })
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Link site"
                                        value={newOng.linkSite || ''}
                                        onChange={(event) => {
                                            setNewOng({ ...newOng, linkSite: event.target.value })
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
                                    label="Logradouro"
                                    type="text"
                                    value={newOng.usuario.endereco.logradouro || ''}
                                    onChange={(event) => {
                                        setNewOng({
                                            ...newOng,
                                            usuario: {
                                                ...newOng.usuario,
                                                endereco: { ...newOng.usuario.endereco, logradouro: event.target.value }
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Número"
                                        type="number"
                                        value={newOng.usuario.endereco.numero || 0}
                                        onChange={(event) => {
                                            setNewOng({
                                                ...newOng,
                                                usuario: {
                                                    ...newOng.usuario,
                                                    endereco: {
                                                        ...newOng.usuario.endereco,
                                                        numero: Number(event.target.value)
                                                    }
                                                }
                                            })
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Bairro"
                                        type="text"
                                        value={newOng.usuario.endereco.bairro || ''}
                                        onChange={(event) => {
                                            setNewOng({
                                                ...newOng,
                                                usuario: {
                                                    ...newOng.usuario,
                                                    endereco: { ...newOng.usuario.endereco, bairro: event.target.value }
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Cidade"
                                        type="text"
                                        value={newOng.usuario.endereco.cidade || ''}
                                        onChange={(event) => {
                                            setNewOng({
                                                ...newOng,
                                                usuario: {
                                                    ...newOng.usuario,
                                                    endereco: { ...newOng.usuario.endereco, cidade: event.target.value }
                                                }
                                            })
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Estado"
                                        type="text"
                                        value={newOng.usuario.endereco.estado || ''}
                                        onChange={(event) => {
                                            setNewOng({
                                                ...newOng,
                                                usuario: {
                                                    ...newOng.usuario,
                                                    endereco: { ...newOng.usuario.endereco, estado: event.target.value }
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="CEP"
                                        type="text"
                                        value={newOng.usuario.endereco.cep || ''}
                                        onChange={(event) => {
                                            setNewOng({
                                                ...newOng,
                                                usuario: {
                                                    ...newOng.usuario,
                                                    endereco: { ...newOng.usuario.endereco, cep: event.target.value }
                                                }
                                            })
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '50px',
                                                backgroundColor: '#D9D9D9'
                                            }
                                        }}
                                        label="Telefone"
                                        type="number"
                                        value={newOng.usuario.telefones[0].numero || ''}
                                        onChange={(event) => {
                                            setNewOng({
                                                ...newOng,
                                                usuario: {
                                                    ...newOng.usuario,
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
                                    onClick={() => props.handleUpdateDonor(newOng)}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        </>
                    }
                </Grid>
            </Modal>
        </>
    )
}
