import { Box, Button, Drawer, List, ListItemButton, ListItemText, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import LogoBoacao from '../../../../assets/boacao.png'

export function DrawerFilterScreen() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate()
    const drawerWidth = matches ? '100%' : 240;
    const variant = 'permanent';

    useEffect(() => {
        setIsHovered(matches);
    }, [matches]);

    const items = [
        { title: 'Home', path: `/home` },
        { title: 'ONG', path: `/ongs` },
        { title: 'Sobre nós', path: `/minhas-doacoes` },
        { title: 'Contato', path: `/localizar-ongs` }
    ];

    const buttons = [
        { title: 'Cadastrar', path: `/cadastar` },
        { title: 'Login', path: `/login` },
    ];

    return (
        <>
            <Drawer
                open={open}
                variant={variant}
                anchor={matches ? 'top' : 'left'}
                PaperProps={{
                    sx: {
                        width: isHovered ? drawerWidth : (matches ? '100%' : 80),
                        height: matches ? (open ? '100%' : '8%') : '100%',
                        transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out',
                        transitionDelay: '0.1s',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: '#0A0A27',
                        padding: 0,
                        margin: 0
                    }
                }}
            >
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Stack
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            flexDirection: 'row',
                            mb: 2
                        }}
                    >
                        <Box
                            component="img"
                            src={LogoBoacao}
                            alt="Logo Boacao"
                            sx={{
                                ml: 2
                            }}
                        />
                        <Button
                            onClick={() => setOpen(!open)}
                        >
                            <HiMenu
                                style={{ color: 'white', fontSize: '25px' }}
                            />
                        </Button>
                    </Stack>

                    {open && items.map(item => (
                        <ListItemButton
                            key={item.path}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={() => setOpen(false)}
                            sx={{
                                mb: '12px',
                                '& .MuiSvgIcon-root': {
                                    fontSize: 24,
                                    marginRight: '12px',
                                    color: 'white'
                                }
                            }}
                        >
                            {isHovered &&
                                <ListItemText
                                    primary={item.title}
                                    primaryTypographyProps={{
                                        color: 'white',
                                        fontWeight: 500
                                    }}
                                />
                            }
                        </ListItemButton>
                    ))}
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            gap: 2,
                            mt: 5
                        }}
                    >
                     {open && buttons.map(item => (
                        <Button
                            sx={{
                                width: '40%',
                                borderRadius: 5,
                                backgroundColor: '#375A88',
                            }}
                            variant="contained"
                            onClick={() => navigate(item.path)}
                        >
                            {item.title}
                        </Button>
                    ))}
                    </Stack>
                </List>
            </Drawer>
        </>
    );
}
