import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function TopHeaderLogin() {
    const navigate = useNavigate()
    return (
        <>
            <Stack
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    boxShadow: 'none'
                }}
            >
                <AppBar
                    position="static"
                    color='transparent'
                >
                    <Toolbar>
                        <Stack
                            width={'100%'}
                            direction={'row'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Stack
                                width={'100%'}
                                direction={'row'}
                                display={'flex'}
                                justifyContent={'space-evenly'}
                            >
                                <Button
                                    sx={{
                                        color: 'black'
                                    }}
                                    onClick={() => navigate('/')}
                                >
                                    Home
                                </Button>
                                <Button
                                    sx={{
                                        color: 'black'
                                    }}
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                                <Button
                                    sx={{
                                        color: 'black'
                                    }}
                                    onClick={() => navigate('/cadastrar')}
                                >
                                    Cadastro
                                </Button>
                            </Stack>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Stack>
        </>
    )
}