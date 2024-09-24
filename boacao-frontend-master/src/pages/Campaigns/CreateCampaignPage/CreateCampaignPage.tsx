import { Button, Grid, Typography } from "@mui/material";
import Eventos from "../../../assets/eventos.svg";
import { useNavigate } from "react-router-dom";

export function CreateCampaignPage() {
    const navigate = useNavigate()
    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    mt={2}
                >
                    <Typography variant="h1" display={'flex'} alignItems={'center'} justifyContent={'center'} mb={2}>
                        Vamos fazer a boa!
                    </Typography>
                    <Typography variant="h6" display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        Estamos felizes que você deseja iniciar uma nova campanha.
                    </Typography>
                    <Typography variant="h6" display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        Vamos alcançar milhares de pessoas juntos!
                    </Typography>
                    <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        mt={7}
                    >
                        <img src={Eventos} alt="Doação concluída" style={{ height: '300px' }} />
                    </Grid>
                    <Grid
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        mt={7}
                    >
                    <Typography variant="body1">
                        Para iniciarmos o cadastro aperte em começar
                    </Typography>
                    <Button
                        sx={{
                            backgroundColor: '#375A88',
                            color: '#fff',
                            fontWeight: 'bold',
                            mt: 2,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 15,
                            paddingRight: 15,
                            borderRadius: 4,
                            fontSize: 23
                        }}
                        variant="contained"
                        onClick={() => navigate('/campanhas/criar-campanha/formulario')}
                    >
                        Começar
                    </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}