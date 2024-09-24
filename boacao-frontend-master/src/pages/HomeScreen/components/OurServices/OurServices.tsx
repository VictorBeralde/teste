import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CardLabeledValue, CardLabeledValueProps } from "../../../../components/CardLabeledValue";
import Ongs from '../../../../assets/servicos-ongs.svg'
import Campanhas from '../../../../assets/servicos-campanhas.svg'
import Eventos from '../../../../assets/servicos-eventos.svg'
import OngsProximas from '../../../../assets/servicos-ongs-proximas.svg'
import App from '../../../../assets/servicos-app.svg'


export function OurServices() {
    const cardsOurServices: CardLabeledValueProps[] = [
        { img: Ongs, title: 'ONGs', description: 'Conheça nossas ONGs parceiras e ajude a causa.' },
        { img: Campanhas, title: 'Campanhas', description: 'Doe para campanhas e ajude a causa.' },
        { img: Eventos, title: 'Eventos', description: 'Conheça os eventos proporcionando pelas ONGs e compartilhe-as.' },
        { img: OngsProximas, title: 'ONGs Próximas', description: 'Conheça ONGs próximas de você.' },
        { img: App, title: 'APP', description: 'Baixe nosso APP e descubra milhares de novidades no seu bolso.' }
    ]

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Grid
                container
                item
                xs={12}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                mb={2}
            >
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Typography
                        variant="h5"
                        color={'#375A88'}
                        fontWeight={'bold'}
                        textAlign={matches ? 'center' : 'start'}
                    >
                        Conheça os nossos serviços
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    mt={2}
                    alignItems={'stretch'}
                    justifyContent={'center'}
                >
                    {cardsOurServices.map((card, index) => (
                        <Grid
                            item
                            xs={matches ? 12 : 4}
                            key={index}
                            display={'flex'}
                            alignItems={'stretch'}
                            justifyContent={'center'}
                        >
                            <CardLabeledValue
                                img={card.img}
                                title={card.title}
                                description={card.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    )
}
