import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CardObjective, CardObjectiveProps } from "../CardObjective";
import Solidariedade from '../../../../assets/solidariedade-sustentavel.svg'
import Inovacao from '../../../../assets/inovacao-social.svg'
import Comunidade from '../../../../assets/comunidade.svg'

export function About() {
    const cardsObjectives: CardObjectiveProps[] = [
        { image: Solidariedade, title: 'Solidariedade sustentável', description: 'Compromisso com doações regulares para proporcionar um impacto constante.' },
        { image: Inovacao, title: 'Inovação social', description: 'Exploração de novas abordagens e tecnologias para otimizar a eficácia das doações.' },
        { image: Comunidade, title: 'Comuniedade', description: 'Envolvimento ativo com a comunidade para entender suas necessidades e aspirações.' },
    ]
    
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Grid
                xs={12}
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
                sx={{
                    backgroundColor: '#11111F'
                }}
            >
                <Grid
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                >
                    <Typography
                        variant="h3"
                        color={'#fff'}
                        fontWeight={'bold'}
                        textAlign={matches ? 'center' : 'start'}
                        mt={2}
                    >
                        Quem somos?
                    </Typography>
                    <Grid
                        xs={8}
                        mt={5}
                    >
                        <Typography
                            variant="subtitle2"
                            color={'#fff'}
                            textAlign={'justify'}
                        >
                            Somos uma empresa de technologia que tem como objetivo fornecer suporte para o crescimento de doações,
                            para  alcançar um número cada vez maior de pessoas, além de conectar e informar a comunidade sobre
                            as necessidades  das pessoas ao seu redor
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    alignItems={'stretch'}
                    justifyContent={'center'}
                    flexDirection={matches ? 'column' : 'row'}
                    gap={matches ? 18 : 2}
                    mb={4}
                    mt={20}
                >
                    {cardsObjectives.map((card, index) => (
                        <Grid
                            xs={matches ? 12 : 3}
                            display={'flex'}
                            alignItems={'stretch'}
                            justifyContent={'center'}
                        >
                            <CardObjective
                                key={index}
                                image={card.image}
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