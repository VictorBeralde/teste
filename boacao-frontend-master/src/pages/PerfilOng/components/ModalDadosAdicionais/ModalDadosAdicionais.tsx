import { Autocomplete, Button, Grid, Modal, useMediaQuery, useTheme } from "@mui/material";
import { OngResult, ChavePix } from "../../../../../client/ong-client/types";
import { useEffect, useState } from "react";
import TextField from "../../../../components/TextField/TextField";

export enum TypesPix {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
    EMAIL = 'EMAIL',
    TELEFONE = 'TELEFONE',
}

export type ModalDadosAdicionaisProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    ong?: OngResult | null;
    handleUpdateDonor: (newOng: OngResult) => void;
}

export function ModalDadosAdicionais(props: ModalDadosAdicionaisProps) {
    const { open, setOpen, ong, handleUpdateDonor } = props;
    const [newOng, setNewOng] = useState<OngResult | null>(null);
    const [selectedTipoChave, setSelectedTipoChave] = useState<string | null>(null)

    useEffect(() => {
        if (open && ong) {
            setNewOng(ong);
        }
    }, [open, ong]);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const typesPixOptions = Object.values(TypesPix);

    const handlePixChange = (_event: any, value: string | null) => {
        if (newOng) {
            setSelectedTipoChave(value)
            const updatedChavePix: ChavePix[] = value ? [{ idChavePix: '', chave: '', tipo: value }] : [];
            setNewOng({ ...newOng, chavesPix: updatedChavePix });
        }
    };

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
                    {newOng && (
                        <>
                            <Grid
                                xs={12}
                                item
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                mt={4}
                                gap={2}
                            >
                                <Grid item xs={12} sm={6} gap={2}>
                                    <Autocomplete
                                        value={selectedTipoChave}
                                        id="tipos"
                                        loadingText="Carregando tipos de chave..."
                                        options={typesPixOptions}
                                        getOptionLabel={(option) => option}
                                        onChange={handlePixChange}
                                        fullWidth
                                        renderInput={(params) => (
                                            <TextField
                                                label="Tipo de Chave PIX"
                                                {...params}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: '20px',
                                                backgroundColor: '#D9D9D9',
                                            },
                                        }}
                                        label="Chave PIX"
                                        value={newOng.chavesPix && newOng.chavesPix.length > 0 ? newOng.chavesPix[0].chave : ''}
                                        onChange={(event) => {
                                            if (newOng && newOng.chavesPix && newOng.chavesPix.length > 0) {
                                                const updatedChavePix = [{ ...newOng.chavesPix[0], chave: event.target.value }];
                                                setNewOng({
                                                    ...newOng,
                                                    chavesPix: updatedChavePix,
                                                });
                                            }
                                        }}
                                        fullWidth
                                        disabled={selectedTipoChave === null}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} mt={2}>
                                <TextField
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '20px',
                                            backgroundColor: '#D9D9D9',
                                        },
                                    }}
                                    label="Horário de Funcionamento"
                                    placeholder="Segunda a sexta das 8h às 18h"
                                    type="text"
                                    multiline
                                    rows={2}
                                    value={newOng.horarioFuncionamento || ''}
                                    onChange={(event) => {
                                        if (newOng) {
                                            setNewOng({
                                                ...newOng,
                                                horarioFuncionamento: event.target.value,
                                            });
                                        }
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} mt={2}>
                                <TextField
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '20px',
                                            backgroundColor: '#D9D9D9',
                                        },
                                    }}
                                    label="Descrição"
                                    multiline
                                    rows={6}
                                    value={newOng.descricao || ''}
                                    onChange={(event) => {
                                        if (newOng) {
                                            setNewOng({
                                                ...newOng,
                                                descricao: event.target.value,
                                            });
                                        }
                                    }}
                                    fullWidth
                                />
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
                                        color: 'white',
                                    }}
                                    onClick={() => handleUpdateDonor(newOng)}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Modal>
        </>
    );
}
