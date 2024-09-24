import { Grid, Typography } from "@mui/material";
import EventSuccess from '../../../../assets/event-success.svg'


export function UpsertEventSuccess() {
    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Typography variant="subtitle1">
                    Seu evento foi criado com sucesso!
                </Typography>
                <Grid
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img src={EventSuccess} alt="Evento com sucesso!" style={{ height: '300px' }} />
                </Grid>
            </Grid>
        </>
    )
}