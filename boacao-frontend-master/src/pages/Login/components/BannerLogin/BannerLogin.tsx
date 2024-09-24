import { Box, Grid } from "@mui/material";
import ImageLogin from '../../../../assets/image-login.png'

export function BannerLogin() {
    return (
        <>
            <Grid
                item
                xs={7}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                    backgroundColor: '#11111F'
                }}
            >
                <Grid
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Box
                        component="img"
                        src={ImageLogin}
                        alt="Campanha"
                        sx={{
                            maxWidth: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            mt: 4,
                            mb: 5
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}