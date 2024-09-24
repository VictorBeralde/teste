import { CircularProgress, Grid, useMediaQuery, useTheme } from "@mui/material";
import { CardPerfil } from "../../components/CardPerfil";
import { CardDadosPessoais } from "../../components/CardDadosPessoais";
import { CardDescricao } from "../../components/CardDescricao";
import { useState } from "react";
import { DonorResult } from "../../../client/doador-client/types/donor-result";
import { ModalDadosPessoais } from "./components/ModalDadosPessoais";
import { useDonor } from "../../hooks/useDonor/use-donor-by-id";
import { ModalContentList } from "./components/ModalContentList";
import { useFavoritesOngsByDonor } from "../../hooks/useOng/use-favorite-ongs-by-donor";
import { useUpdateDonorById } from "../../hooks/useDonor/use-update-donor-by-id";
import { useCampaignsByDonorId } from "../../hooks/useCampaign/use-campaigns-by-donor-id";

export function PerfilDoador() {
    const idDoador = sessionStorage.getItem('userType');
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState<boolean>(false);
    const [openContentList, setOpenContentList] = useState<boolean>(false);
    const [content, setContent] = useState<{ nome: string }[]>([]);
    const [title, setTitle] = useState<string>('');

    const { data: donor, isLoading, isError } = useDonor(idDoador ?? '')
    const { data: favorites, isLoading: isLoadingFavorite, isError: isErrorFavorite } = useFavoritesOngsByDonor(idDoador ?? '')
    const { data: campaigns, isLoading: isLoadingCampaigns, isError: isErrorCampaigns } = useCampaignsByDonorId(idDoador ?? '')
    const { mutateAsync: updateDonor } = useUpdateDonorById(idDoador ?? '')

    const handleUpdateDonor = async (newDonor: DonorResult) => {
        if (idDoador) {
            try {
                await updateDonor({
                    bairro: newDonor.usuario.endereco.bairro,
                    cep: newDonor.usuario.endereco.cep,
                    cidade: newDonor.usuario.endereco.cidade,
                    complemento: newDonor.usuario.endereco.complemento,
                    logradouro: newDonor.usuario.endereco.logradouro,
                    estado: newDonor.usuario.endereco.estado,
                    nome: newDonor.usuario.nome,
                    numero: newDonor.usuario.endereco.numero,
                    telefone: newDonor.usuario.telefones[0].numero
                })

                setOpen(false);
            } catch (error) {
                console.error("Erro ao editar doador:", error);
            }
        }
    };

    return (
        <>
            <ModalContentList
                open={openContentList}
                setOpen={setOpenContentList}
                title={title}
                content={content}
            />
            <ModalDadosPessoais
                open={open}
                setOpen={setOpen}
                donor={donor ?? null}
                handleUpdateDonor={handleUpdateDonor}
            />
            <Grid container>
                {isLoading && <CircularProgress />}
                {isError && <p>Erro ao buscar doador</p>}
                {!isLoading && !isError && donor && (
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
                                <CardPerfil
                                    nome={donor.usuario.nome || ''}
                                    idDoador={donor.id}
                                    img={donor.urlImagem}
                                />
                            </Grid>
                            <Grid item xs={matches ? 12 : 9}>
                                <CardDadosPessoais
                                    cep={donor.usuario.endereco.cep || ''}
                                    email={donor.usuario.email || ''}
                                    telefone={donor.usuario.telefones[0].numero || 0}
                                    endereco={donor.usuario.endereco.logradouro || ''}
                                    bairro={donor.usuario.endereco.bairro || ''}
                                    numero={donor.usuario.endereco.numero || 0}
                                    setOpen={setOpen}
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
                            <Grid
                                item
                                xs={matches ? 12 : 6}
                                sx={{ height: '190px' }}
                            >
                                <CardDescricao
                                    title="Ongs favoritas"
                                    ongs={favorites ?? []}
                                    height="100%"
                                    setTitle={setTitle}
                                    setContent={setContent}
                                    setOpenContentList={setOpenContentList}
                                    isLoading={isLoadingFavorite}
                                    isError={isErrorFavorite}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={matches ? 12 : 6}
                                sx={{ height: '190px' }}
                            >
                                <CardDescricao
                                    title="Campanhas doadas"
                                    donations={campaigns ?? []}
                                    height="100%"
                                    setTitle={setTitle}
                                    setContent={setContent}
                                    setOpenContentList={setOpenContentList}
                                    isLoading={isLoadingCampaigns}
                                    isError={isErrorCampaigns}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
}
