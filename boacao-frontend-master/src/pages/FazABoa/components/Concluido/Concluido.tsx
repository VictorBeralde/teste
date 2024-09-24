import { Grid, Typography } from "@mui/material";
import DoacaoConcluida from '../../../../assets/doacaoConcluida.svg'

export function Concluido() {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Typography variant="subtitle1">
                Doação concluída com sucesso!
            </Typography>
            <Grid
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <img src={DoacaoConcluida} alt="Doação concluída" style={{ height: '300px' }} />
            </Grid>
        </Grid>
    );
}
