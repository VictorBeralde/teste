import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Slogan } from "../HomeScreen/components/Slogan";
import { TopBarScreen } from "../HomeScreen/components/TopBarScreen";
import { Contact } from "../HomeScreen/components/Contact";
import { About } from "./components/About";
import { CampaignItems } from "./components/CampaignItems";
import Impact from '../../assets/impact.svg'
import Divugacao from '../../assets/divulgacao.svg'
import Controle from '../../assets/controle.svg'
import Analytics from '../../assets/analytics.svg'
import { Benefits, BenefitsValues } from "./components/Benefits";
import { Plans } from "./components/Plans";
import { DrawerFilterScreen } from "../HomeScreen/components/DrawerFilterScreen";

const values: BenefitsValues[] = [
    { image: Impact, title: 'Impacto', description: 'Doações causam um impacto gigantesco na vida de quem recebe esse ato de amor. Com a nossa solução você concentra as doações e gestão em uma plataforma que incentiva a doação e a interação entre a comunidade.' },
    { image: Divugacao, title: 'Divugação', description: "Melhore o divulgação de sua ONG em uma plataforma que concentra ONG's e doadores, facilitando também a comunicação direto com o doador, possibilitando saber informações sobre o produto doado e localização, por exemplo." },
    { image: Controle, title: 'Controle', description: 'Controle quantidade de doações por dia, semana e mês, além de dashboards informativas sobre as entradas e indicadores de meta.' },
    { image: Analytics, title: 'Dados e Analytics', description: 'Obtenha dados de alta precisão das doações recebidas, de quantas pessoas fazem parte da sua causa e muito mais!' },
]

export function HomeScreenOng() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Grid container>
                <Grid
                    item
                    xs={12}>
                    {!matches && <TopBarScreen ong />}
                    {matches && <DrawerFilterScreen />}
                    {matches && <Stack mb={4}></Stack>}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
                        <path fill="#0A0A27" fillOpacity="1"
                            d="M0,192L80,165.3C160,139,320,85,480,90.7C640,96,800,160,960,176C1120,192,1280,160,1360,144L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                        </path>
                    </svg>
                    <div id="ong">
                        <Slogan
                            isOng
                        />
                    </div>
                    <div id="sobreNos">
                        <About />
                    </div>
                    <div id="itens">
                        <CampaignItems />
                    </div>
                    <div id="beneficios">
                        <Benefits values={values} />
                    </div>
                    <div id="planos">
                        <Plans />
                    </div>
                    <div id="contato">
                        <Contact />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}