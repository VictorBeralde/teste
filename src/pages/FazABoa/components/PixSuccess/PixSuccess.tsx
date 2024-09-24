import { Box, Grid, Typography } from "@mui/material";
import DoacaoConcluida from '../../../../assets/doacaoConcluida.svg'

export function PixSuccess() {
    return (
        <>
            <Grid
                xs={12}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                mt={4}
                flexDirection={'column'}
            >
                <Typography
                    variant="subtitle1"
                >
                    Doação concluída com sucesso!
                </Typography>
                <Typography 
                    variant="subtitle1"
                >
                    Obrigado por ajudar a causa
                </Typography>
                <Grid
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    mt={4}
                >
                    <Box
                            component="img"
                            src={DoacaoConcluida}
                            alt="Campanha"
                            sx={{
                                maxHeight: '250px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                borderRadius: '10px'
                            }}
                        />
                </Grid>
            </Grid>
        </>
    )
}