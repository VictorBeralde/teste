import { Grid, Stack, Typography, Button, useMediaQuery, useTheme, Divider, CircularProgress } from "@mui/material";
import { BreadCrumbs } from "../../components/BreadCrumbs";
import { useParams } from "react-router-dom";
import { CardImage } from "../../components/CardImage";
import { CardContactOng } from "../../components/CardContactOng";
import { useCampaignById } from "../../hooks/useCampaign/use-campaign-by-id";
import { ModalDonationMethod } from "./components/ModalDonationMethod";
import { useState } from "react";

const items = [
    { to: 'campanha', label: 'Campanha' },
    { to: 'campanha/doacao', label: 'Doacao' }
]

export function Doacao() {
    const { idCampanha } = useParams<{ idCampanha: string }>()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [open, setOpen] = useState<boolean>(false)
    const { data: campaign, isLoading, isError } = useCampaignById(idCampanha || '')

    const handleClickMaps = () => {
        const formattedAddress = encodeURIComponent(`${campaign?.endereco.logradouro}, ${campaign?.endereco.numero} - ${campaign?.endereco.bairro}, ${campaign?.endereco.cidade} - ${campaign?.endereco.estado}`)
        window.open(`https://www.google.com/maps/search/?api=1&query=${formattedAddress}`, '_blank')
    }

    return (
        <>
            <ModalDonationMethod
                open={open}
                setOpen={setOpen}
                idCampaign={idCampanha || ''}
            />
            <Grid container
                mt={matches ? 7 : 0}
            >
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        ml: matches ? 0 : 8
                    }}
                >
                    <BreadCrumbs
                        items={items}
                    />
                </Grid>
                {isLoading && <CircularProgress />}
                {isError && <Typography>Erro ao carregar campanha</Typography>}
                {campaign &&
                    <>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                mt: 2
                            }}
                        >
                            <Grid
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    flexDirection: matches ? 'column' : 'row',
                                }}
                            >
                                <Grid
                                    direction={'column'}
                                    xs={matches ? 12 : 6}
                                    mt={matches ? 3 : 0}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 'bold'

                                        }}
                                        mb={1}
                                    >
                                        {campaign.nome}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                    >
                                        {campaign.descricao}
                                    </Typography>
                                    <Divider
                                        sx={{
                                            mt: 2,
                                            mb: 2,
                                            backgroundColor: 'black'
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        fontWeight={'700'}
                                    >
                                        Deseja fazer uma doação para essa campanha?
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setOpen(true)}
                                        sx={{
                                            mt: 2,
                                            width: '60%',
                                            backgroundColor: '#375A88',
                                            padding: '12px',
                                            borderRadius: '20px'
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                        >
                                            Fazer doação
                                        </Typography>
                                    </Button>
                                    <Divider
                                        sx={{
                                            mt: 2,
                                            mb: 2,
                                            backgroundColor: 'black'
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        fontWeight={'700'}
                                    >
                                        Endereço da Ong
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                    >
                                        {campaign.endereco.logradouro}, {campaign.endereco.numero} - {campaign.endereco.bairro}, {campaign.endereco.cidade} - {campaign.endereco.estado}
                                    </Typography>
                                    <Button
                                        variant={'contained'}
                                        sx={{
                                            width: '50%',
                                            backgroundColor: '#375A88',
                                            borderRadius: '10px',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                            fontSize: '16px',
                                            mt: 2
                                        }}
                                        onClick={handleClickMaps}
                                    >
                                        Ver no mapa
                                    </Button>
                                </Grid>
                                <Grid
                                    direction={'column'}
                                    xs={matches ? 12 : 3}
                                >
                                    <CardImage
                                        image={campaign.urlImagem}
                                    />
                                    <Stack
                                        mt={2}
                                    >
                                        <CardContactOng
                                            idOng={campaign.ong.id}
                                            email={campaign.ong.usuario.email}
                                            nome={campaign.ong.usuario.nome}
                                            telefone={campaign.ong.usuario.telefones[0].numero}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>}
            </Grid>
        </>
    )
}

