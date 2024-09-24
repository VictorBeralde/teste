import { Divider, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { TopBarScreen } from "./components/TopBarScreen";
import { Slogan } from "./components/Slogan";
import { Partners } from "./components/Partners";
import { OurServices } from "./components/OurServices";
import { Objective } from "./components/Objective";
import { Contact } from "./components/Contact";
import { DrawerFilterScreen } from "./components/DrawerFilterScreen";

export function HomeScreen() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    {!matches && <TopBarScreen />}
                    {matches && <DrawerFilterScreen />}
                    {matches && <Stack mb={4}></Stack>}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
                        <path fill="#0A0A27" fillOpacity="1"
                            d="M0,192L80,165.3C160,139,320,85,480,90.7C640,96,800,160,960,176C1120,192,1280,160,1360,144L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                        </path>
                    </svg>
                    <div id="home">
                        <Slogan />
                    </div>

                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        mt={5}
                        mb={5}
                    >
                        <Divider
                            sx={{
                                backgroundColor: '#375A88',
                                width: matches ? '80%' : '50%',
                                border: 'solid 2px #375A88'
                            }}
                        />
                    </Stack>
                    <Partners />
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        mt={5}
                        mb={5}
                    >
                        <Divider
                            sx={{
                                backgroundColor: '#375A88',
                                width: matches ? '80%' : '50%',
                                border: 'solid 2px #375A88'
                            }}
                        />
                    </Stack>
                    <div id="servicos">
                        <OurServices />
                    </div>
                    <div id="sobreNos">
                        <Objective />
                    </div>
                    <div id="contato">
                        <Contact />
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
