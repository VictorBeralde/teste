import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { HiMenu } from "react-icons/hi"

export type TopBarProps = {
    handleOpenMenu: () => void
}

export function TopBar(props: TopBarProps) {
    const { handleOpenMenu } = props
    return (
        <>
            <Stack 
                sx={{ 
                    flexGrow: 1,
                    backgroundColor: '#0A0A27',
                    width: '100%',
                    zIndex: 1
                }}
                position="fixed"
            >
                <AppBar
                    position="static"
                    color='transparent'
                    sx={{ borderBottom: theme => `1px solid ${theme.palette.grey[200]}` }}
                >
                    <Toolbar>
                        <IconButton
                            onClick={handleOpenMenu}
                            sx={{ mr: 2 }}
                        >
                            <HiMenu style={{ color: 'white' }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Stack>
        </>
    )
}