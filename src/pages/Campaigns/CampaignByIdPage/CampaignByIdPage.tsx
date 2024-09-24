import { CircularProgress, Grid } from "@mui/material";
import { BreadCrumbs } from "../../../components/BreadCrumbs";
import { CardInsight } from "../../../components/CardInsight";
import { useParams } from "react-router-dom";
import { useDashboardInfos } from "../../../hooks/useCampaign/use-dashboard-infos";
import { CardCampaignById } from "../components/CardCampaignById";
import { useCampaignById } from "../../../hooks/useCampaign/use-campaign-by-id";

const items = [
    { to: 'campanhas', label: 'Campanhas' },
    { to: 'campanhas/:id', label: 'Campanha' }
]

export function CampaignByIdPage() {
    const { idCampanha } = useParams<{ idCampanha: string }>()
    const { data, isLoading, isError } = useDashboardInfos(idCampanha || '')
    const { data: campaignData, isLoading: isLoadingCampaign, isError: isErrorCampaign } = useCampaignById(idCampanha || '')
    return (
        <>
            <Grid
                container
            >
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    <BreadCrumbs
                        items={items}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    mt={4}
                    gap={4}
                >
                    {isError && <Grid>Erro ao carregar informações da campanha</Grid>}
                    {!isError &&
                        <>
                            <Grid
                                xs={3}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <CardInsight
                                    title="Total de doadores"
                                    value={data ? data.totalDoadores : 0}
                                    isLoading={isLoading}
                                />
                            </Grid>
                            <Grid
                                xs={3}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <CardInsight
                                    title="Produtos arrecadados"
                                    value={data ? data.totalProdutosArrecadados : 0}
                                    isLoading={isLoading}
                                />
                            </Grid>
                        </>}
                </Grid>
                {isErrorCampaign && <Grid>Erro ao carregar informações da campanha</Grid>}
                {isLoadingCampaign && <Grid> <CircularProgress /> </Grid>}
                {!isErrorCampaign && !isLoadingCampaign && campaignData &&
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    mt={4}
                >
                    <CardCampaignById 
                        title={campaignData.nome}
                        description={campaignData.descricao}
                        urlBanner={campaignData.urlImagem}
                        products={campaignData.produtos}
                        endDate={campaignData.dataFim}
                    />
                </Grid>}
            </Grid>
        </>
    )
}