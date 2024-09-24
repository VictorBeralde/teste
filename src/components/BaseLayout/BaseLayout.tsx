import { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "../TopBar";
import { Menu } from '../Menu'
import { MenuOng } from "../MenuOng";

const menuWidth = '80px'
const emptyLayoutRoutes = ['faz-a-boa', 'index', 'cadastrar', 'formulario', 'ong', 'editar']
const paths = ['localizar-ongs', 'perfil-ong']

export function BaseLayout() {
    const type = sessionStorage.getItem('type')
    const [open, setOpen] = useState<boolean>(true)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [showLayout, setShowLayout] = useState<boolean>(true)
    const location = useLocation();

    const [isHovered, setIsHovered] = useState(false)

    const handleOpenMenu = () => {
        if (isHovered) {
            setIsHovered(false)
        } else {
            setIsHovered(true)
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false)
    };

    useEffect(() => {
        const shouldShowLayout = (!emptyLayoutRoutes.some(route => location.pathname.includes(route))) || paths.some(route => location.pathname.includes(route))
        setShowLayout(shouldShowLayout)
    }, [location.pathname])

    useEffect(() => {
        setOpen(!matches);
    }, [matches])

    return (
        <>
            {showLayout && (
                <>
                    {type === 'DONOR' &&
                        <Menu
                            setOpen={setOpen}
                            open={open}
                            handleMouseLeave={handleMouseLeave}
                            handleOpenMenu={handleOpenMenu}
                            variant={'permanent'}
                            matches={matches}
                            isHovered={isHovered}
                        />}
                    {type === 'ONG' &&
                        <MenuOng
                            variant={"permanent"}
                            matches={matches}
                        />}
                    {matches && (
                        <TopBar
                            handleOpenMenu={handleOpenMenu}
                        />
                    )}
                    <Grid
                        ml={matches ? 'auto' : menuWidth}
                        padding={2}
                    >
                        <Outlet />
                    </Grid>
                </>
            )}
            {!showLayout && <Outlet />}
        </>
    )
}
