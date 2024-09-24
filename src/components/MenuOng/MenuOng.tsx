import * as React from 'react';
import { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useToken } from '../TokenManager';
import { useClient } from '../../hooks/use-client';
import { HiOutlineDocumentAdd, HiOutlineUser } from "react-icons/hi";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { RiLogoutBoxRLine } from 'react-icons/ri';

export type MenuItem = {
    title: string;
    path: string;
    icon?: React.ReactNode;
    subItems?: MenuItem[];
}

export type MenuProps = {
    variant: 'temporary' | 'permanent' | 'persistent';
    matches?: boolean;
}

export function MenuOng(props: MenuProps) {
    const [, , removeToken] = useToken();

    const navigate = useNavigate();
    const client = useClient();
    const location = useLocation();

    const [openSections, setOpenSections] = useState<string[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(false);

    const toggleSection = (title: string) => {
        setOpenSections(openSections.includes(title) ? openSections.filter(sec => sec !== title) : [...openSections, title]);
    };

    const handleExit = async () => {
        client.login.logout();
        removeToken();
        navigate('/');
    };

    const handleOpenMenu = () => {
        setIsHovered(true);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setOpen(false);
    };

    const drawerWidth = props.matches ? '100%' : 240;

    const items: MenuItem[] = [
        {
            title: 'Visão Geral',
            path: '/',
            icon: <HiOutlineSquare3Stack3D style={{ color: '#FFFFFF' }} />,
            subItems: [
                { title: 'Triagem', path: '/triagem' },
                { title: 'Campanha', path: '/campanhas' }
            ]
        },
        {
            title: 'Cadastro',
            path: '/',
            icon: <HiOutlineDocumentAdd style={{ color: '#FFFFFF' }} />,
            subItems: [
                { title: 'Campanha', path: '/campanhas/criar-campanha' },
                { title: 'Eventos', path: '/eventos/criar-evento' },
            ]
        },
        { title: 'Perfil', path: '/perfil-ong', icon: <HiOutlineUser style={{ color: '#FFFFFF' }} /> },
    ];

    return (
        <Drawer
            open={open}
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
                        justifyContent: 'center',
                        backgroundColor: isHovered ? '#0A0A27' : 'transparent',
                    }}
                >
                    <ListItemIcon
                        sx={{
                            justifyContent: 'center',
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
                {items.map((item) => (
                    <React.Fragment key={item.title}>
                        <ListItemButton
                            onClick={() => {
                                if (item.subItems) {
                                    toggleSection(item.title);
                                } else {
                                    navigate(item.path);
                                    setOpen(false);
                                }
                            }}
                            selected={location.pathname === item.path}
                            sx={{
                                mb: '12px',
                                fontSize: '25px',
                                marginRight: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        >
                            <ListItemIcon sx={{ justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                            {isHovered && <ListItemText primary={item.title} />}
                            {isHovered && item.subItems && (openSections.includes(item.title) ? <HiChevronUp /> : <HiChevronDown />)}
                        </ListItemButton>
                        {isHovered && openSections.includes(item.title) && item.subItems && (
                            <List>
                                {item.subItems.map(subItem => (
                                    <ListItemButton
                                        key={subItem.title}
                                        component={Link}
                                        to={subItem.path}
                                        selected={location.pathname === subItem.path}
                                        onClick={() => setOpen(false)}
                                        sx={{
                                            mb: '12px',
                                            fontSize: '25px',
                                            marginRight: '8px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <ListItemIcon sx={{ justifyContent: 'center' }}>{subItem.icon}</ListItemIcon>
                                        {isHovered && <ListItemText primary={subItem.title} />}
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </React.Fragment>
                ))}
            </List>
            <List>
                <ListItemButton
                    onClick={handleExit}
                    sx={{
                        mb: '12px',
                        fontSize: '25px',
                        marginRight: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'white'
                    }}
                >
                    <ListItemIcon sx={{ justifyContent: 'center' }}>
                        <RiLogoutBoxRLine style={{ color: 'white' }} />
                    </ListItemIcon>
                    {isHovered && <ListItemText primary="Sair" />}
                </ListItemButton>
            </List>
        </Drawer>
    );
}
