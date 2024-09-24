import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import LogoBoacao from '../../../../assets/boacao.png';
import { useNavigate } from "react-router-dom";

export type TopBarScreenProps = {
    ong?: boolean;
}

export function TopBarScreen(props: TopBarScreenProps) {
    const { ong } = props
    const handleScroll = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navigate = useNavigate()

    return (
        <>
            <Stack sx={{ backgroundColor: '#0A0A27', width: '100%' }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar>
                        <Stack>
                            <Box component="img" src={LogoBoacao} alt="Logo Boacao" />
                        </Stack>
                        <Stack
                            width={'100%'}
                            direction={'row'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Stack
                                width={'60%'}
                                direction={'row'}
                                display={'flex'}
                                justifyContent={'space-evenly'}
                            >
                                <Button
                                    sx={{ color: 'white' }}
                                    onClick={() => ong ? navigate('/') : handleScroll('home')}
                                >
                                    Home
                                </Button>
                                <Button
                                    sx={{ color: 'white' }}
                                    onClick={() => ong ? handleScroll('ong') : navigate('/ongs')}
                                >
                                    ONG
                                </Button>
                                <Button
                                    sx={{ color: 'white' }}
                                    onClick={() => handleScroll('sobreNos')}
                                >
                                    Sobre nós
                                </Button>
                                {ong &&
                                    <Button
                                        sx={{ color: 'white' }}
                                        onClick={() => handleScroll('itens')}
                                    >
                                        Itens
                                    </Button>}
                                {ong &&
                                    <Button
                                        sx={{ color: 'white' }}
                                        onClick={() => handleScroll('beneficios')}
                                    >
                                        Beneficios
                                    </Button>}
                                <Button
                                    sx={{ color: 'white' }}
                                    onClick={() => handleScroll(ong ? 'planos' : 'servicos')}
                                >
                                    {ong ? 'Planos' : 'Serviços'}
                                </Button>
                                <Button
                                    sx={{ color: 'white' }}
                                    onClick={() => handleScroll('contato')}
                                >
                                    Contato
                                </Button>
                            </Stack>
                            <Stack
                                width={'40%'}
                                display={'flex'}
                                direction={'row'}
                                justifyContent={'end'}
                                gap={2}
                            >
                                <Button
                                    variant={'contained'}
                                    sx={{
                                        backgroundColor: '#375A88',
                                        color: '#fff',
                                        width: '40%',
                                        borderRadius: 4,
                                    }}
                                    onClick={() => navigate('/cadastrar')}
                                >
                                    Cadastre-se
                                </Button>
                                <Button
                                    onClick={() => navigate('/login')}
                                    variant={'contained'}
                                    sx={{
                                        backgroundColor: '#375A88',
                                        color: '#fff',
                                        width: '40%',
                                        borderRadius: 4,
                                    }}
                                >
                                    Entrar
                                </Button>
                            </Stack>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Stack>
        </>
    );
}
