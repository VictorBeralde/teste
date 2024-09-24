import { Button, Grid, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TopHeaderLogin } from "../../../../components/TopHeaderLogin";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { createOngAtom } from "../../../../atoms/create-ong-atom";

export function RegisterOngPlans() {
    const [, setCreateOng] = useAtom(createOngAtom)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const navigate = useNavigate()

    const handleClickForm = (plan: string) => {
        setCreateOng((prev: any) => ({
            ...prev,
            plano: plan
        }))

        navigate('/cadastrar/ong/formulario')
    }
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
                gap={1}
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
                    Selecione um plano venha fazer parte desse projeto
                </Typography>

            </Grid>
            <Grid
                item
                xs={12}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <Grid
                    xs={8}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>handleClickForm('BASICO')}
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
                        Básico
                    </Button>
                </Grid>
                <Grid
                    xs={8}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClickForm('PADRÃO')}
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
                        Padrão
                    </Button>
                </Grid>
                <Grid
                    xs={8}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClickForm('PREMIUM')}
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
                        Premium
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={matches ? 12 : 10}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                >
                    <Typography
                        variant="subtitle2"
                        textAlign="center"
                        lineHeight={1}
                    >
                        Para saber mais sobre os planos, clique em{' '}
                        <Link href="#" color="primary" underline="hover">
                            saiba mais
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
