import { Card, CircularProgress, Grid, Popover, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CardOng } from "../../components/CardOng";
import { useState } from "react";
import ong from "../../assets/ong.png";
import ImageCampanha from '../../components/CardCampanha/campanha.svg';
import { CardSobreNos } from "../../components/CardSobreNos";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { EnviarComentario } from "../../components/EnviarComentario";
import { Comentario } from "../../components/Comentario";
import { useOngById } from "../../hooks/useOng/use-ong-by-id";
import { ModalComments } from "./components/ModalComments";

export function Ong() {
    const { idOng } = useParams<{ idOng: string }>()
    const idDonor = sessionStorage.getItem('userType')
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;
    const [open, setOpen] = useState(false)
    const [comments, setComments] = useState<{ comment: string, user: string }[]>([])

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const items = [
        ong, ImageCampanha, ong, ImageCampanha
    ]

    const { data, isLoading, isError } = useOngById(idOng || '', { idDoador: idDonor ?? '' })

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    }

    return (
        <>
            <ModalComments
                open={open}
                setOpen={setOpen}
                comments={comments}
            />
            {isLoading && <Grid xs={12} mt={4} display={'flex'} alignItems={'center'} justifyContent={'center'}> <CircularProgress /> </Grid>}
            {isError && <Typography>Erro ao buscar ong</Typography>}
            {!isLoading && !isError && data != null &&
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
                                alignItems: 'center',
                                ml: 2
                            }}
                        >
                            <HiArrowLeft style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => navigate('/home')} />
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
                    <Card
                        sx={{
                            height: 'auto',
                            boxShadow: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            padding: '20px',
                            width: '100%'
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'inline-flex',
                                flexDirection: matches ? 'column' : 'row',
                            }}
                            spacing={2}
                            gap={2}
                        >
                            <Grid
                                display={'flex'}
                                xs={matches ? 12 : 8}
                                height={'100%'}
                            >
                                <CardOng
                                    images={data.urlImagensGaleria}
                                    currentIndex={currentIndex}
                                    handleNext={handleNext}
                                    handlePrev={handlePrev}
                                    title={data.usuario.nome || ''}
                                    phone={data.usuario.telefones[0].numero || 0}
                                    email={data.usuario.email || ''}
                                    isFavorite={data.favoritada}
                                    idOng={idOng || ''}
                                    idDonor={idDonor || ''}
                                    link={data.linkSite || ''}
                                />
                            </Grid>
                            <Grid
                                xs={matches ? 12 : 4}
                                height={'100%'}
                            >
                                <CardSobreNos
                                    address={data.usuario.endereco.logradouro + ', ' + data.usuario.endereco.numero}
                                    description={data.descricao || ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            xs={12}
                            display={'flex'}
                            mt={2}
                        >
                            {idOng && <EnviarComentario idOng={idOng} />}
                        </Grid>
                        <Grid
                            container
                            xs={12}
                            display={'flex'}
                            mt={2}
                            gap={1}
                        >
                            {idOng && <Comentario idOng={idOng} setComments={setComments} setOpen={setOpen} />}
                        </Grid>
                    </Card>
                </Grid>}
        </>
    )
}
