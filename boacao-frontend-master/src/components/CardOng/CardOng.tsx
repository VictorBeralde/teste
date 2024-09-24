import { useState } from "react";
import { Card, CardContent, Grid, IconButton, Stack, Typography, Box } from "@mui/material";
import LogoCasa from '../../assets/logoCasa.png';
import { BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { HiCheck, HiBookmark, HiOutlineBookmark, HiOutlineDuplicate } from "react-icons/hi";
import { useCreateFavoriteOng } from "../../hooks/useOng/use-create-favorite-ong";
import { useDeleteFavoriteOng } from "../../hooks/useOng/use-delete-favorite-ong";
import { CardEmpty } from "../CardEmpty";
import { OngImages } from "../../../client/ong-client/types";

export type CardOngProps = {
    images: OngImages[]
    currentIndex: number
    handleNext: () => void
    handlePrev: () => void
    title: string
    phone: number
    email: string
    link?: string
    isFavorite: boolean
    idOng?: string
    idDonor: string
}

export function CardOng(props: CardOngProps) {
    const { images, currentIndex, isFavorite, handleNext, handlePrev, idDonor, idOng } = props;
    const [copiado, setCopiado] = useState(false);
    const { mutateAsync: createFavorite } = useCreateFavoriteOng();
    const { mutateAsync: deleteFavorite } = useDeleteFavoriteOng();

    const handleCopyLink = (link: string) => {
        navigator.clipboard.writeText(link)
            .then(() => {
                setCopiado(true);
                setTimeout(() => {
                    setCopiado(false);
                }, 2000);
            })
            .catch((err) => {
                console.error('Error copying link: ', err);
            });
    };

    const handleSalvar = async () => {
        if (isFavorite) {
            await deleteFavorite({ idOng: idOng || '', idDonor: idDonor });
        } else {
            await createFavorite({ idOng: idOng || '', idDonor: idDonor });
        }
    };

    return (
        <Card
            sx={{
                height: '520px',
                boxShadow: 'none',
                borderRadius: 2,
                border: '1px solid #E0E0E0',
                width: '100%',
            }}
        >
            <CardContent>
                <Stack direction="row" display="flex" alignItems="center">
                    <img src={LogoCasa} alt="LogoCasa" />
                    <Stack display="flex" alignItems="center">
                        <Typography variant="h6" fontWeight="bold">
                            {props.title}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack display="flex" flexDirection="row" justifyContent="space-between">
                    <Stack>
                        <Stack direction="row" display="flex" alignItems="center" padding={2}>
                            <BsWhatsapp style={{ fontSize: '25px' }} />
                            <Typography variant="subtitle2" ml={2}>
                                {props.phone}
                            </Typography>
                        </Stack>
                        <Stack direction="row" display="flex" alignItems="center" padding={2}>
                            <BsEnvelope style={{ fontSize: '25px' }} />
                            <Typography variant="subtitle2" ml={2}>
                                {props.email}
                            </Typography>
                        </Stack>
                        <Stack direction="row" display="flex" alignItems="center" padding={2}>
                            {props.link && props.link !== '' && (
                                <>
                                    {copiado ? (
                                        <HiCheck style={{ fontSize: '25px', color: 'green' }} />
                                    ) : (
                                        <HiOutlineDuplicate
                                            style={{ fontSize: '25px', cursor: 'pointer' }}
                                            onClick={() => handleCopyLink(props.link || '')}
                                            title="Copiar"
                                        />
                                    )}
                                    <Typography variant="subtitle2" ml={2}>
                                        {props.link}
                                    </Typography>
                                </>
                            )}
                        </Stack>
                    </Stack>
                    <Stack display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <IconButton onClick={handleSalvar}>
                            {isFavorite ? (
                                <HiBookmark style={{ fontSize: '25px', color: 'darkblue' }} />
                            ) : (
                                <HiOutlineBookmark style={{ fontSize: '25px' }} />
                            )}
                        </IconButton>
                        <Typography variant="subtitle2" ml={15}></Typography>
                    </Stack>
                </Stack>
                <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {images.length === 0 ? (
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <IconButton onClick={handlePrev} disabled={true}>
                                        <ArrowBackIos />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} container mt={2} mb={2}>
                                    <Grid item xs={12} display={'flex'} justifyContent="center" alignItems={'center'}>
                                        <CardEmpty label="Essa ONG não possui imagens cadastradas" />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={handleNext} disabled={true}>
                                        <ArrowForwardIos />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                                        <ArrowBackIos />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} container display={'flex'} alignItems={'center'} justifyContent="center" flexDirection={'row'} spacing={2}>
                                    {images.slice(currentIndex, currentIndex + 3).map((imageUrl, index) => (
                                        <Grid item xs={4} key={index} display={'flex'} alignItems={'center'} justifyContent="center" flexDirection={'row'}>
                                            <Box
                                                component="img"
                                                src={imageUrl.urlImagem}
                                                alt="Ong"
                                                sx={{
                                                    height: '250px',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain',
                                                    borderRadius: '10px'
                                                }} 
                                                />
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={handleNext} disabled={currentIndex === images.length - 3}>
                                        <ArrowForwardIos />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
