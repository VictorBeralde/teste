import { Grid, useMediaQuery, useTheme } from "@mui/material"
import { BannerLogin } from "../Login/components/BannerLogin"
import { RegisterOngPlans } from "./components/RegisterOngPlans"

export function RegisterOng () {
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
                <RegisterOngPlans />
                {!matches && <BannerLogin />}
            </Grid>
        </>
    )
}