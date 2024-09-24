import { Button, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CardPlan, CardPlanProps } from "../CardPlan";
import { useState } from "react";

const CardsPlansMonthly: CardPlanProps[] = [
    { title: 'Basico', price: 18.99, description: ['Criar até 2 campanhas', 'Criar 1 Evento', 'Receber doação de itens'], mt: 7 },
    { title: 'Padrão', price: 49.99, description: ['Criar até 20 campanhas', 'Criar até 10 Eventos', 'Receber doação de itens', 'Receber doações de carnê', 'Chat com o doador', 'Opção de triagem de doações'], mb: 7 },
    { title: 'Premium', price: 59.99, description: ['Criar campanhas ilimitadas', 'Criar eventos ilimitados', 'Receber doação de itens', 'Receber doações de pix', 'Receber doações de carnê', 'Chat com o doador', 'Opção de triagem de doações', 'Analytics e dashboard'], mt: 7 },
]

const CardsPlansAnnual: CardPlanProps[] = [
    { title: 'Basico', price: 15.19, description: ['Criar até 2 campanhas', 'Criar 1 Evento', 'Receber doação de itens'], mt: 7},
    { title: 'Padrão', price: 39.99, description: ['Criar até 20 campanhas', 'Criar até 10 Eventos', 'Receber doação de itens', 'Receber doações de carnê', 'Receber doações de pix', 'Chat com o doador', 'Opção de triagem de doações'], mb: 7 },
    { title: 'Premium', price: 47.99, description: ['Criar campanhas ilimitadas', 'Criar eventos ilimitados', 'Receber doação de itens', 'Receber doações de pix', 'Receber doações de carnê', 'Chat com o doador', 'Opção de triagem de doações', 'Analytics e dashboard'], mt: 7 },
]

export function Plans() {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [plan, setPlan] = useState('monthly')

    return (
        <Stack
            width={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
                background: 'linear-gradient(to bottom, #11111F, #1A1A30, #1F1F3B)',
                height: matches ? '220vh' : '100vh',
            }}
        >
            <Stack>
                <Typography
                    variant="h3"
                    color={'#fff'}
                    textAlign={'center'}
                >
                    Planos Boação
                </Typography>
                <Typography
                    variant="h6"
                    fontWeight={'normal'}
                    color={'#fff'}
                    textAlign={matches ? 'center' : 'start'}
                >
                    Explore os nossos planos e escolha o que melhor se adequa à gestão da sua ONG.
                </Typography>
            </Stack>
            <Stack
                width={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={2}
                mt={5}
                padding={0}
            >
                <Stack
                    width={'100%'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={8}
                    direction={'row'}

                >
                    <Button
                        variant="text"
                        sx={{
                            color: 'white',
                            backgroundColor: plan === 'monthly' ? '#375A88' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#4A6FA1'
                            }
                        }}
                        onClick={() => setPlan('monthly')}
                    >
                        <Typography
                            variant="h6"
                        >
                            Mensal
                        </Typography>
                    </Button>
                    <Button
                        variant="text"
                        sx={{
                            color: 'white',
                            backgroundColor: plan === 'annual' ? '#375A88' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#4A6FA1'
                            }
                        }}
                        onClick={() => setPlan('annual')}
                    >
                        <Typography
                            variant="h6"
                        >
                            Anual
                        </Typography>
                    </Button>
                </Stack>
                <Divider
                    sx={{
                        width: '50%',
                        margin: 0,
                        border: 'solid 1px white',
                        padding: 0
                    }}
                />
            </Stack>
            <Stack
                width={'100%'}
                direction={matches ? 'column' : 'row'}
                display={'flex'}
                alignItems={'stretch'}
                justifyContent={'center'}
                gap={3}
                mt={3}
                mb={3}
            >
                {plan === 'monthly' ?
                    CardsPlansMonthly.map((card, index) =>
                        <CardPlan
                            key={index}
                            title={card.title}
                            price={card.price}
                            description={card.description}
                            mt={matches ? 0 : card.mt}
                            mb={matches ? 0 : card.mb}
                        />
                    ) :
                    CardsPlansAnnual.map((card, index) =>
                        <CardPlan
                            key={index}
                            title={card.title}
                            price={card.price}
                            description={card.description}
                            mt={matches ? 0 : card.mt}
                            mb={matches ? 0 : card.mb}
                            annual
                        />)
                }
            </Stack>
        </Stack>
    );
}
