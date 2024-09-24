import { Grid, useMediaQuery, useTheme } from "@mui/material"
import { BannerLogin } from "../Login/components/BannerLogin"
import { RegisterForm } from "./components/RegisterForm"

export function Register () {
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
                <RegisterForm />
                {!matches && <BannerLogin />}
            </Grid>
        </>
    )
}