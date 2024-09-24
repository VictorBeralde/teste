import { CircularProgress, Grid, IconButton, Popover, useMediaQuery, useTheme } from "@mui/material";
import Boacao from '../../assets/boacao.svg';
import { useState } from "react";
import BannerEvento from '../../assets/banner-eventos.svg'
import { Banner } from "../../components/Banner";
import { LabelsGroup } from "../../components/LabelsGroup";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { CardHome } from "../../components/CardHome";
import { CardWithButton } from "../../components/CardWithButton";
import { CardImage } from "../../components/CardImage";
import { useNavigate } from "react-router-dom";
import { CardEmpty } from "../../components/CardEmpty";
import { useCampaigns } from "../../hooks/useCampaign/use-campaign";
import { useOngs } from "../../hooks/useOng/use-ongs";
import { useEvents } from "../../hooks/useEvent/use-events";

export function Home() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexOng, setCurrentIndexOng] = useState(0);
    const [currentIndexCampanha, setCurrentIndexCampanha] = useState(0);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;
    const navigate = useNavigate()

    const { data: campaigns, isLoading: isLoadingCampaigns, isError: isErrorCampaigns } = useCampaigns({ page: 0, size: 12, sort: 'asc', dataFinal: undefined, nome: null || '' })
    const { data: ongs, isLoading: isLoadingOngs, isError: isErrorOngs } = useOngs()
    const { data: events, isLoading: isLoadingEvents, isError: isErrorEvents } = useEvents({ page: 0, size: 20, sort: 'asc' })

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleNext = () => {
        const eventsSize = events ? events.length : 0
        setCurrentIndex((prevIndex) => (prevIndex + 1) % eventsSize)
    };

    const handleNextOng = () => {
        const ongsSize = ongs ? ongs.length : 0
        setCurrentIndexOng((prevIndex) => (prevIndex + 1) % ongsSize)
    };

    const handleNextCampanha = () => {
        const campaignsSize = campaigns ? campaigns.content.length : 0
        setCurrentIndexCampanha((prevIndex) => (prevIndex + 1) % campaignsSize)
    };

    const handlePrev = () => {
        const eventsSize = events ? events.length : 0
        setCurrentIndex((prevIndex) => (prevIndex - 1 + eventsSize) % eventsSize)
    };

    const handlePrevOng = () => {
        const ongsSize = ongs ? ongs.length : 0
        setCurrentIndexOng((prevIndex) => (prevIndex - 1 + ongsSize) % ongsSize)
    };

    const handlePrevCampanha = () => {
        const campaignsSize = campaigns ? campaigns.content.length : 0
        setCurrentIndexCampanha((prevIndex) => (prevIndex - 1 + campaignsSize) % campaignsSize)
    };

    return (
        <>
            <Grid
                container
                display={'flex'}
                flexDirection={'column'}
            >
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
                        </Popover>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={6}>
                    <Banner
                        img={BannerEvento}
                    />
                </Grid>
                <Grid item xs={12} mt={4}>
                    <LabelsGroup
                        label="Eventos"
                        value="Conheça os eventos beneficentes das ONGs"
                        direction="column"
                    />
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                                <ArrowBackIos />
                            </IconButton>
                        </Grid>
                        <Grid item xs={11} container justifyContent="center" spacing={2}>
                            {isLoadingEvents && <Grid xs={12} mt={4} display={'flex'} alignItems={'center'} justifyContent={'center'}> <CircularProgress /> </Grid>}
                            {isErrorEvents && <CardEmpty label="Erro ao buscar eventos!" />}
                            {!isLoadingEvents && !isErrorEvents && events && events.length === 0 && <CardEmpty label="Nenhum evento cadastrado!" />}
                            {!isLoadingEvents && !isErrorEvents && events && events.length > 0 && events.slice(currentIndex, currentIndex + 3).map((evento, index) => (
                                <Grid item xs={4} key={index}>
                                    <CardHome
                                        label={{
                                            primary: evento.nome,
                                            secondary: evento.descricao,
                                            address: evento.endereco.logradouro + ', ' + evento.endereco.numero,
                                            image: evento.urlImagem,
                                            hmDate: evento.dtFim
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleNext} disabled={(events && currentIndex === events.length - 3) || (events && events.length <= 3)}>
                                <ArrowForwardIos />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={5}>
                    <LabelsGroup
                        label="ONGs parceiras"
                        value="Conheça as ONGs, qual o proposito delas e ajude nessa causa"
                        direction="column"
                    />
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <IconButton onClick={handlePrevOng} disabled={currentIndexOng === 0}>
                                <ArrowBackIos />
                            </IconButton>
                        </Grid>
                        <Grid item xs={11} container justifyContent="center" spacing={2}>
                            {isLoadingOngs && <Grid xs={12} mt={4} display={'flex'} alignItems={'center'} justifyContent={'center'}> <CircularProgress /> </Grid>}
                            {isErrorOngs && <CardEmpty label="Erro ao buscar ongs!" />}
                            {!isLoadingOngs && !isErrorOngs && ongs && ongs.length === 0 && <CardEmpty label="Nenhuma ong cadastrada!" />}
                            {!isLoadingOngs && !isErrorOngs && ongs && ongs.length > 0 && ongs.slice(currentIndexOng, currentIndexOng + 2).map((ong, index) => (
                                <Grid item xs={6} key={index}>
                                    <CardWithButton
                                        title={ong.usuario.nome}
                                        address={`${ong.usuario.endereco.logradouro + ', ' + ong.usuario.endereco.numero}`}
                                        data={ong.horarioFuncionamento || 'Horário de funcionamento não foi informado'}
                                        handleClickButton={() => navigate(`/ong/${ong.id}`)}
                                        index={1}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleNextOng} disabled={(ongs && currentIndexOng === ongs.length - 2) || (ongs && ongs.length <= 2)}>
                                <ArrowForwardIos />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={2}>
                    <LabelsGroup
                        label="Campanhas"
                        direction="column"
                    />
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <IconButton onClick={handlePrevCampanha} disabled={currentIndexCampanha === 0}>
                                <ArrowBackIos />
                            </IconButton>
                        </Grid>
                        <Grid item xs={11} container display={'flex'} justifyContent="center" alignItems={'center'} spacing={2}>
                            {isLoadingCampaigns && <Grid xs={12} mt={4} display={'flex'} alignItems={'center'} justifyContent={'center'}> <CircularProgress /> </Grid>}
                            {isErrorCampaigns && <CardEmpty label="Erro ao buscar campanhas!" />}
                            {!isLoadingCampaigns && !isErrorCampaigns && campaigns && campaigns.content.length === 0 && <CardEmpty label="Nenhuma campanha cadastrada!" />}
                            {!isLoadingCampaigns && !isErrorCampaigns && campaigns && campaigns.content.length > 0 && campaigns.content.slice(currentIndexCampanha, currentIndexCampanha + 3).map((campanha, index) => (
                                <Grid item xs={4} key={index}>
                                    <CardImage
                                        onClick={() => navigate(`/campanha/doacao/${campanha.id}`)}
                                        image={campanha.urlImagem}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleNextCampanha} disabled={campaigns && (currentIndexCampanha === campaigns.content.length - 3) || campaigns && campaigns.content.length <= 3}>
                                <ArrowForwardIos />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
