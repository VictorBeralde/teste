import { Button, CircularProgress, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TopHeaderLogin } from "../../../../components/TopHeaderLogin";
import TextField from "../../../../components/TextField/TextField";
import { useAtom } from "jotai";
import { loginAtom } from "../../../../atoms/login-atom";
import { useEffect, useState } from "react";
import { useValidateEmail } from "../../../../hooks/useLogin/use-validate-email";
import { useLoginDonor } from "../../../../hooks/useLogin/use-login-donor";
import { useLoginOng } from "../../../../hooks/useLogin/use-login-ong";
import { AxiosError } from 'axios'

export function LoginForm() {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const [login, setLogin] = useAtom(loginAtom)
    const [form, setForm] = useState<number>(0)
    const [type, setType] = useState<string>('')
    const [send, setSend] = useState<boolean>(false)
    const { data, isLoading, isError, error } = useValidateEmail({
        email: login.email,
    }, send)

    const { mutateAsync: loginDonor, isError: isErrorDonorLogin, error: errorDonorLogin } = useLoginDonor()
    const { mutateAsync: loginOng, isError: isErrorOngLogin, error: errorOngLogin } = useLoginOng()

    useEffect(() => {
        if (data) {
            setForm(1)
            setType(data)
        }
    }, [data])


    const errorMessageDonorLogin = errorDonorLogin ? getErrorMessage(errorDonorLogin) : '';
    const errorMessageOngLogin = errorOngLogin ? getErrorMessage(errorOngLogin) : '';
    const errorMessage = error ? getErrorMessage(error) : '';

    const handleSend = () => {
        if (form === 0) {
            setSend(true)
        } else if (form === 1) {
            if (type === 'DONOR') {
                loginDonor(login)
            } else if (type === 'ONG') {
                loginOng(login)
            }
        }
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
                xs={matches ? 12 : 8}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="h1"
                    textAlign="center"
                    lineHeight={1}
                >
                    Bem-vindo de volta!
                </Typography>
            </Grid>
            <Grid
                xs={12}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                width={'100%'}
            >
                <Grid
                    xs={8}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width={'100%'}
                >
                    {form === 0 &&
                        <TextField
                            label="Email"
                            type="text"
                            value={login.email}
                            placeholder="email@gmail.com"
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 5,
                                    backgroundColor: '#D9D9D9'
                                },
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '16px'
                            }}
                            onChange={(e) => {
                                setLogin({ ...login, email: e.target.value });
                                setSend(false);
                            }}
                            error={isError}
                            helperText={isError && errorMessage}
                            fullWidth
                        />}
                    {form === 1 &&
                        <TextField
                            label="Senha"
                            type="password"
                            value={login.senha}
                            placeholder="********"
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '50px',
                                    backgroundColor: '#D9D9D9'
                                },
                                width: '100%',
                                marginBottom: '16px'
                            }}
                            onChange={(e) => setLogin({ ...login, senha: e.target.value })}
                            error={isErrorOngLogin}
                            helperText={(isErrorOngLogin && errorMessageOngLogin) || (isErrorDonorLogin && errorMessageDonorLogin)}
                            fullWidth
                        />}
                </Grid>
                <Grid
                    xs={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: '#375A88',
                            paddingLeft: 7,
                            paddingRight: 7,
                            paddingTop: 2,
                            paddingBottom: 2,
                            borderRadius: 5,
                        }}
                        onClick={() => handleSend()}
                    >
                        {isLoading && <CircularProgress size={30} color="inherit" />}
                        {!isLoading && (form === 0 ? 'Próximo' : 'Entrar')}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

function getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        return error.response?.data.message || "Erro desconhecido";
    }
    return "Erro desconhecido";
}