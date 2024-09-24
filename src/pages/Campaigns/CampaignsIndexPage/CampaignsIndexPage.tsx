import { Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { CardInsight } from "../../../components/CardInsight";
import { CampaignDataTable } from "../components/CampaignDataTable";
import { HiCloudDownload, HiOutlinePlus } from "react-icons/hi"
import { useNavigate } from "react-router-dom";
import { CampaignEmpty } from "../components/CampaignEmpty";
import { useCampaignsByOngId } from "../../../hooks/useCampaign/use-campaigns-by-ong-id";
import { useDashoboardInforByOngId } from "../../../hooks/useOng/use-dashboard-infos-by-ong-id";
import { Search } from "../../../components/Search";
import { useState } from "react";
import { useClient } from "../../../hooks/use-client";
import { CampaignQuery } from "../../../../client/campanha-client/types";

export function CampaignsIndexPage() {
    const idOng = sessionStorage.getItem('userType')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(12)
    const [query, setQuery] = useState<CampaignQuery>({ page: page, size: size, sort: 'asc', dataFinal: undefined, nome: undefined })
    const { data, isLoading, isError } = useCampaignsByOngId(idOng || '', query)
    const { data: dashboardInfos, isLoading: isLoadingDashboard } = useDashoboardInforByOngId(idOng || '')

    const client = useClient()

    const handleDownloadCsv = async () => {
        try {
            const userId = sessionStorage.getItem('userType');
            if (userId) {
                const result = await client.ongs.getCsvCampaignsByOngId(userId);

                if (result) {
                    const blob = new Blob([result], { type: 'text/csv' });

                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `doacoes-${new Date()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    console.error('A resposta da requisição não contém dados.');
                }
            } else {
                console.error('ID do usuário não encontrado.');
            }
        } catch (error) {
            console.error("Erro ao baixar o CSV:", error);
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeSetSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSize(+event.target.value);
        setPage(0);
    }

    const navigate = useNavigate()
    return (
        <>
            <Grid
                container
            >
                {isLoading &&
                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        mt={5}
                    >
                        <CircularProgress />
                    </Grid>}
                {isError && <Grid>Erro ao carregar campanhas</Grid>}
                {!isLoading && !isError && data && data.content.length === 0 &&
                    <>
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Grid
                                xs={11}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Grid
                                    xs={10}
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Typography variant={'subtitle1'} fontWeight={'bold'}>
                                        {data && data.content.length === 0 && 'Ops... Parece que você não tem nenhuma campanha criada. Vamos criar uma?'}
                                        {data && data.content.length > 0 && 'Campanhas'}
                                    </Typography>
                                </Grid>
                                <Grid
                                    xs={1}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Stack>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#375A88',
                                                borderRadius: '10px',
                                            }}
                                            onClick={() => navigate('/campanhas/criar-campanha')}
                                        >
                                            <HiOutlinePlus fontSize={'35px'} color="white" />
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            mt={4}
                        >
                            <Grid
                                xs={7}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <CampaignEmpty />
                            </Grid>
                        </Grid>
                    </>}
                {!isLoading && !isError && data && data.content.length > 0 &&
                    <>
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Grid
                                xs={11}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Grid
                                    xs={10}
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Typography variant={'subtitle1'} fontWeight={'bold'}>
                                        {data.content.length === 0 && 'Ops... Parece que você não tem nenhuma campanha criada. Vamos criar uma?'}
                                        {data.content.length > 0 && 'Campanhas'}
                                    </Typography>
                                </Grid>
                                <Grid
                                    xs={1}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                    gap={2}
                                >
                                    <Stack>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#375A88',
                                                borderRadius: '10px',
                                            }}
                                            onClick={handleDownloadCsv}
                                        >
                                            <HiCloudDownload fontSize={'35px'} color="white" />
                                        </Button>
                                    </Stack>
                                    <Stack>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#375A88',
                                                borderRadius: '10px',
                                            }}
                                            onClick={() => navigate('/campanhas/criar-campanha')}
                                        >
                                            <HiOutlinePlus fontSize={'35px'} color="white" />
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            mt={4}
                        >
                            <Grid
                                xs={4}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <CardInsight
                                    title="Campanhas em aberto"
                                    value={dashboardInfos ? dashboardInfos.totalCampanhas : 0}
                                    isLoading={isLoadingDashboard}
                                />
                            </Grid>
                            <Grid
                                xs={4}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <CardInsight
                                    title="Produtos arrecadados"
                                    value={dashboardInfos ? dashboardInfos.totalProdutos : 0}
                                    isLoading={isLoadingDashboard}
                                />
                            </Grid>
                            <Grid
                                xs={4}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <CardInsight
                                    title="Número de doações"
                                    value={dashboardInfos ? dashboardInfos.totalDoacoes : 0}
                                    isLoading={isLoadingDashboard}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            xs={12}
                            mt={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}
                        >
                            <Grid
                                xs={4}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Stack direction={'row'}>
                                    <Search
                                        label="Pesquisar"
                                        onChange={value => setQuery({ ...query, nome: value })}
                                        value={query.nome || ''}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            mt={4}
                        >
                            <Grid
                                xs={11}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <CampaignDataTable
                                    data={data.content}
                                    isError={isError}
                                    isLoading={isLoading}
                                    pageNumber={data.pageable.pageNumber}
                                    pageSize={data.pageable.pageSize}
                                    totalPages={data.totalPages}
                                    handleChangePage={() => handleChangePage}
                                    handleChangePageSize={() => handleChangeSetSize}
                                />
                            </Grid>
                        </Grid>
                    </>}
            </Grid>
        </>
    )
}