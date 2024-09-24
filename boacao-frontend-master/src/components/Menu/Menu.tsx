import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu } from "react-icons/hi"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { BiCube } from "react-icons/bi";
import MinhasDoacoesIcon from '../../assets/icon-doacao-menu.png'
import { useToken } from '../TokenManager';
import { useClient } from '../../hooks/use-client';
import { HiOutlineMapPin } from "react-icons/hi2";
import { HiOutlineHome } from "react-icons/hi2";
import { RiUser3Line } from "react-icons/ri";

export type MenuProps = {
    variant: 'temporary' | 'permanent' | 'persistent'
    open?: boolean
    setOpen: (open: boolean) => void
    matches?: boolean
    isHovered?: boolean
    handleOpenMenu?: () => void
    handleMouseLeave?: () => void
}

export function Menu(props: MenuProps) {
    const drawerWidth = props.matches ? '100%' : 240
    const { isHovered, handleOpenMenu, handleMouseLeave } = props
    const [, , removeToken] = useToken();
    const navigate = useNavigate()
    const client = useClient()

    const items = [
        { title: 'Início', path: `/home`, icon: <HiOutlineHome style={{ color: '#FFFFFF' }} /> },
        { title: 'Campanha de doação', path: `/campanha`, icon: <img src={MinhasDoacoesIcon} alt="Minhas Doações Icon" style={{ width: '25px', height: '25px' }} /> },
        { title: 'Minhas doações', path: `/minhas-doacoes`, icon: <BiCube style={{ color: '#FFFFFF' }} /> },
        { title: 'Localizar ONG', path: `/localizar-ongs`, icon: <HiOutlineMapPin style={{ color: '#FFFFFF' }} /> },
        { title: 'Perfil', path: `/perfil`, icon: <RiUser3Line style={{ color: '#FFFFFF' }} /> }
    ]

    const handleExit = async () => {
        client.login.logout()
        removeToken()
        navigate('/')
    }

    return (
        <Drawer
            open={props.open}
            variant={props.variant}
            anchor={props.matches ? 'top' : 'left'}
            onMouseLeave={handleMouseLeave}
            PaperProps={{
                sx: {
                    width: isHovered ? drawerWidth : (props.matches ? '100%' : 80),
                    height: props.matches ? (isHovered ? '100%' : 0) : '100%',
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
            <List sx={{ mt: '32px' }}>
                <ListItemButton
                    onClick={handleOpenMenu}
                    sx={{
                        mb: '12px',
                        fontSize: '25px',
                        marginRight: '8px',
                        display: 'flex',
                    }}
                >
                    <ListItemIcon
                        sx={{
                            marginLeft: '8px'
                        }}
                    >
                        <HiMenu 
                            style={{ color: 'white', fontSize: '25px', }} 
                        />
                    </ListItemIcon>
                    {isHovered &&
                        <ListItemText
                            primaryTypographyProps={{
                                variant: 'h4',
                                fontWeight: 700,
                                color: 'white'
                            }}
                        />
                    }
                </ListItemButton>
                {items.map(item => (
                    <ListItemButton
                        key={item.path}
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                        onClick={() => props.setOpen(false)}
                        sx={{
                            mb: '12px',
                            '& .MuiSvgIcon-root': {
                                fontSize: 24,
                                marginRight: '12px',
                                color: 'white'
                            }
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: 'white',
                                fontSize: '25px',
                                marginRight: '8px',
                                marginLeft: '8px'
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

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
            </List>
            <List>
                <ListItemButton
                    onClick={handleExit}
                    sx={{
                        fontSize: '25px',
                        marginRight: '8px'
                    }}
                >
                    <ListItemIcon
                        sx={{
                            marginLeft: '8px'
                        }}
                    >
                        <RiLogoutBoxRLine style={{ color: 'white' }} />
                    </ListItemIcon>
                    {isHovered &&
                        <ListItemText
                            primary="Sair"
                            primaryTypographyProps={{
                                fontWeight: 500,
                                color: 'white'
                            }}
                        />
                    }
                </ListItemButton>
            </List>
        </Drawer>
    );
}
