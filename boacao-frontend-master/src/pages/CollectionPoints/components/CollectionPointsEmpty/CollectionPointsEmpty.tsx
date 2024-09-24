import { Grid, Typography } from "@mui/material";
import PontoDeColeta from "../../../../assets/eventos.svg";

export function CollectionPointsEmpty() {
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
                    <Typography variant="subtitle1" display={'flex'} alignItems={'center'} justifyContent={'center'} mb={2}>
                        Nenhum ponto de coleta criado!
                    </Typography>
                    <img src={PontoDeColeta} alt="Pontos de coleta vazio" style={{ height: '300px' }} />
                </Grid>
            </Grid>
        </>
    )
}