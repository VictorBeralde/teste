import { Button, CircularProgress, Grid, Pagination, Popover, Stack, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react"
import { Search } from "../../components/Search"
import Boacao from '../../assets/boacao.svg'
import { RiFilter2Fill } from "react-icons/ri"
import { Banner } from "../../components/Banner"
import { CardCampanha } from "../../components/CardCampanha"
import { FiltroCampanha } from "./components/FiltroCampanha"
import { useNavigate } from "react-router-dom"
import BannerDoacao from '../../assets/banner-doacao.svg'
import { useCampaigns } from "../../hooks/useCampaign/use-campaign"
import { CampaignQuery } from "../../../client/campanha-client/types"

export function Campanha() {
    // eslint-disable-next-line no-undef
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const openPopover = Boolean(anchorEl)
    const id = openPopover ? 'simple-popover' : undefined
    const navigate = useNavigate()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [page, setPage] = useState(0)
    const [size] = useState(12)
    const [query, setQuery] = useState<CampaignQuery>({ page: page, size: size, sort: 'asc', dataFinal: null, nome: null || '' })

    const { data: campaigns, isLoading, isError } = useCampaigns(query)

    // eslint-disable-next-line no-undef
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClosePopover = () => {
        setAnchorEl(null)
    }

    const handleClickCard = (id: string) => {
        navigate(`/campanha/doacao/${id}`)
    }

    const handleChangePage = (value: number) => {
        setPage(value);
        setQuery(prev => ({ ...prev, page: value - 1 }));
    }

    return (
        <>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                    mt={matches ? 7 : 0}
                >
                    <Grid
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-center',
                            alignItems: 'center'
                        }}
                    >
                        <img src={Boacao} alt="" />
                    </Grid>
                    <Grid
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}
                    >
                        <Stack direction={'row'}>
                            <Search
                                label="Pesquisar"
                                onChange={value => setQuery({ ...query, nome: value })}
                                value={query.nome}
                            />
                            <Button onClick={handleClick}>
                                <RiFilter2Fill fontSize={'35px'} color="#899499" />
                            </Button>
                        </Stack>
                        <Popover
                            id={id}
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            disableAutoFocus={true}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                        >
                            <FiltroCampanha 
                                endDate={query.dataFinal || new Date()} 
                                setEndDate={(dataFinal) => setQuery({ ...query, dataFinal })}
                            />
                        </Popover>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={4}>
                    <Banner
                        img={BannerDoacao}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    mt={4}
                    gap={matches ? 0 : 2}
                    sx={{
                        display: 'flex',
                        flexDirection: matches ? 'column' : 'row'
                    }}
                    flexWrap={matches ? 'nowrap' : 'wrap'}
                >
                    {isLoading && <Grid xs={12} mt={10} display={'flex'} alignItems={'center'} justifyContent={'center'}> <CircularProgress /> </Grid>}
                    {isError && <Grid xs={12}>Erro ao carregar campanhas</Grid>}
                    {!isLoading && !isError && campaigns && campaigns.content.length === 0 && <Grid xs={12} mt={2}>Nenhuma campanha cadastrada</Grid>}
                    {!isLoading && !isError && campaigns && campaigns.content.map((item, index) => (
                        <Grid xs={matches ? 12 : 3.9} mt={2} key={index}>
                            <CardCampanha
                                label={{
                                    primary: item.nome,
                                    secondary: item.descricao,
                                    endereco: item.endereco.logradouro + ', ' + item.endereco.numero + ' - ' + item.endereco.bairro + ', ' + item.endereco.cidade + ' - ' + item.endereco.estado + ', ' + item.endereco.cep,
                                    dataFinal: item.dataFim,
                                    bannerCampanha: item.urlImagem
                                }}
                                handleClick={() => handleClickCard(item.id.toString())}
                            />
                        </Grid>
                    ))}
                </Grid>
                {campaigns &&
                <Grid
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mt={4}
                >
                         <Pagination 
                            count={campaigns.totalPages || 0} 
                            page={campaigns.pageable.pageNumber + 1}
                            onChange={() => handleChangePage} 
                        />
                </Grid>}
            </Grid>
        </>
    )
}
