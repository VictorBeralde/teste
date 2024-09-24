import { Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TopHeaderLogin } from "../../../../components/TopHeaderLogin";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const navigate = useNavigate()
    return (
        <Grid
            item
            xs={matches ? 12 : 5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <TopHeaderLogin />
            <Grid
                item
                xs={matches ? 12 : 10}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
            >
                <Typography
                    variant="h1"
                    textAlign="center"
                    lineHeight={1}
                >
                    Cadastre-se
                </Typography>
                <Typography
                    variant="h6"
                    textAlign="center"
                    lineHeight={1}
                >
                    Seja um doador ou cadastre sua ong e venha fazer parte desse projeto
                </Typography>

            </Grid>
            <Grid
                item
                xs={12}
                display="flex"
                gap={2}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <Grid
                    xs={5}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        
                        onClick={() => navigate('/cadastrar/doador')}
                        sx={{
                            backgroundColor: '#375A88',
                            paddingLeft: 7,
                            paddingRight: 7,
                            paddingTop: 2,
                            paddingBottom: 2,
                            borderRadius: 5,
                            width: '100%',
                        }}
                    >
                        Doador
                    </Button>
                </Grid>
                <Grid
                    xs={5}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/cadastrar/ong')}
                        sx={{
                            backgroundColor: '#375A88',
                            paddingLeft: 7,
                            paddingRight: 7,
                            paddingTop: 2,
                            paddingBottom: 2,
                            borderRadius: 5,
                            width: '100%',
                        }}
                    >
                        ONG
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}