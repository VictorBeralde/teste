import { CircularProgress, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useOngById } from "../../hooks/useOng/use-ong-by-id";
import { CardPerfilOng } from "./components/CardPerfilOng";
import { CardDadosPessoaisOng } from "./components/CardDadosPessoaisOng";
import { ModalDadosPessoaisOng } from "./components/ModalDadosPessoaisOng/ModalDadosPessoaisOng";
import { useUpdateOngById } from "../../hooks/useOng/use-update-ong-by-id";
import { OngResult } from "../../../client/ong-client/types";
import { CardInfos } from "./components/CardInfos";
import { ModalDadosAdicionais } from "./components/ModalDadosAdicionais";
import { enqueueSnackbar } from "notistack";
import { useCreatePix } from "../../hooks/useOng/use-create-pix";


export function PerfilOng() {
    const idOng = sessionStorage.getItem('userType');
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState<boolean>(false)
    const [openAdicionais, setOpenAdicionais] = useState<boolean>(false)
    const { mutateAsync: updateOngById } = useUpdateOngById(idOng || '');
    const { mutateAsync: createPix } = useCreatePix(idOng || '')

    const { data: ong, isLoading, isError } = useOngById(idOng || '')

    const handleUpdateDonor = async (newOng: OngResult) => {
        if (idOng) {
            try {
                await updateOngById({
                    bairro: newOng.usuario.endereco.bairro,
                    cep: newOng.usuario.endereco.cep,
                    cidade: newOng.usuario.endereco.cidade,
                    complemento: newOng.usuario.endereco.complemento,
                    logradouro: newOng.usuario.endereco.logradouro,
                    estado: newOng.usuario.endereco.estado,
                    nome: newOng.usuario.nome,
                    numero: newOng.usuario.endereco.numero,
                    telefone: [newOng.usuario.telefones[0].numero],
                    descricao: newOng.descricao,
                    linkSite: newOng.linkSite,
                    email: newOng.usuario.email,
                    horarioFuncionamento: newOng.horarioFuncionamento
                })

                if (ong && ong.chavesPix.length === 0) {
                    await createPix({
                        chavePix: newOng.chavesPix[0].chave,
                        tipo: newOng.chavesPix[0].tipo
                    })
                }

                setOpen(false)
                setOpenAdicionais(false)
            } catch (error) {
                enqueueSnackbar('Erro ao atualizar dados', { variant: 'error' })
            }
        }
    };

    return (
        <>
            <ModalDadosAdicionais 
                open={openAdicionais}
                setOpen={setOpenAdicionais}
                ong={ong}
                handleUpdateDonor={handleUpdateDonor}
            />
            <ModalDadosPessoaisOng 
                open={open}
                setOpen={setOpen}
                ong={ong}
                handleUpdateDonor={handleUpdateDonor}
            />
            <Grid container>
                {isLoading && <CircularProgress />}
                {isError && <p>Erro ao buscar ong</p>}
                {!isLoading && !isError && ong && (
                    <>
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{
                                display: 'inline-flex',
                                flexDirection: matches ? 'column' : 'row',
                                mt: matches ? 7 : 0,
                                height: '100%'
                            }}
                            spacing={2}
                        >
                            <Grid item xs={matches ? 12 : 3}>
                                <CardPerfilOng
                                    image={ong.urlImagem || ''} 
                                    nome={ong.usuario.nome || ''}
                                    idOng={idOng || ''}
                                />
                            </Grid>
                            <Grid item xs={matches ? 12 : 9}>
                                <CardDadosPessoaisOng 
                                    setOpen={setOpen}
                                    razao={ong.usuario.nome || ''}
                                    email={ong.usuario.email || ''}
                                    cep={ong.usuario.endereco.cep || ''}
                                    endereco={ong.usuario.endereco.logradouro || ''}
                                    bairro={ong.usuario.endereco.bairro || ''}
                                    numero={ong.usuario.endereco.numero || 0}
                                    telefone={ong.usuario.telefones[0].numero || 0}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                flexDirection: matches ? 'column' : 'row',
                                mt: 4,
                                height: '100%'
                            }}
                            gap={2}
                        >
                            <CardInfos 
                                chavePix={ong.chavesPix || []}
                                horarioFuncionamento={ong.horarioFuncionamento || 'Sem horário de funcionamento cadastrado'}
                                descricao={ong.descricao || ''}
                                setOpen={setOpenAdicionais}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
}
