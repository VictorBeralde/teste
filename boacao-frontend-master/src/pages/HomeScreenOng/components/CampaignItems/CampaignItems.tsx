import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Items from '../../../../assets/items.svg';
import Alimento from '../../../../assets/item-alimento.svg';
import Movel from '../../../../assets/item-movel.svg';
import Racao from '../../../../assets/item-racao.svg';
import Brinquedo from '../../../../assets/item-brinquedo.svg';
import Roupa from '../../../../assets/item-roupa.svg';
import Eletronico from '../../../../assets/item-eletronico.svg';
import { CardItems, CardItemsProps } from "../CardItems";

export function CampaignItems() {

    const cardItems: CardItemsProps[] = [
        { image: Alimento, title: 'Alimentos' },
        { image: Roupa, title: 'Roupas' },
        { image: Racao, title: 'Ração' },
        { image: Movel, title: 'Móveis' },
        { image: Eletronico, title: 'Eletrônicos' },
        { image: Brinquedo, title: 'Brinquedos' }
    ];

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                mb={5}
            >
                <Grid
                    container
                    item
                    xs={12}
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={matches ? 12 : 4}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ paddingLeft: matches ? 0 : 4 }}
                            textAlign={matches ? 'center' : 'start'}
                        >
                            Abra campanhas e adicione itens a ela.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                    flexDirection={matches ? 'column' : 'row'}
                >
                    <Grid item xs={matches ? 12 : 5}>
                        <Box
                            component="img"
                            src={Items}
                            alt="Items"
                            sx={{
                                width: '100%',
                            }}
                        />
                    </Grid>
                    <Grid
                        container
                        item
                        xs={matches ? 12 : 7}
                        spacing={2}
                        justifyContent="center"
                        alignItems="stretch"
                        wrap="wrap"
                    >
                        {cardItems.map((card, index) => (
                            <Grid
                                item
                                xs={4}
                                key={index}
                                display="flex"
                                justifyContent="center"
                                alignItems="stretch"
                            >
                                <CardItems
                                    image={card.image}
                                    title={card.title}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
