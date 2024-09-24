import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { LoginForm } from "./components/LoginForm";
import { BannerLogin } from "./components/BannerLogin";

export function Login() {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <>
            <Grid
                container
                flexDirection={'row'}
                alignItems={'stretch'}
                xs={12}
                height={'100vh'}
            >
                <LoginForm />
                {!matches && <BannerLogin />}
            </Grid>
        </>
    )
}