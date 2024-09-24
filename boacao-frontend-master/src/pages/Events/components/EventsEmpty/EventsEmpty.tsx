import { Grid, Typography } from "@mui/material";
import Eventos from "../../../../assets/eventos.svg";

export function EventsEmpty() {
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
                        Nenhum evento criado!
                    </Typography>
                    <img src={Eventos} alt="Doação concluída" style={{ height: '300px' }} />
                </Grid>
            </Grid>
        </>
    )
}