import { Grid, Typography } from "@mui/material";
import EventSuccess from '../../../../assets/event-success.svg'


export function UpsertCollectionPointSuccess() {
    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Typography variant="subtitle1">
                    Seu ponto de coleta foi criado com sucesso!
                </Typography>
                <Grid
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img src={EventSuccess} alt="Ponto de coleta criado com sucesso!" style={{ height: '300px' }} />
                </Grid>
            </Grid>
        </>
    )
}