import { Grid } from "@mui/material"
import { CardDoacoes } from "./CardDoacoes"

export default {
    title: 'Components/CardDoacoes'
}

export const Example = () => {
    return (
        <Grid
            container
            xs={8}
            display={'flex'}
            alignItems={'stretch'}
            justifyContent={'space-around'}
        >
            <Grid
                item
                xs={5}
            >
                <CardDoacoes
                    titleCard="Doações"
                    address="Rua 1, 123"
                    feedback="Feedback teste"
                    images={[]}
                    handleSetOpenDetails={() => 'teste'}
                    hours={new Date()}
                    products={[]}
                    setSaibaMais={() => 'teste'}
                    dispBusca={true}
                    situation="Aceita"
                    donationId="1"
                />
            </Grid>
            <Grid
                item
                xs={5}
            >
                <CardDoacoes
                    titleCard="Doações"
                    address="Rua 1, 123"
                    feedback="Feedback teste"
                    images={[]}
                    handleSetOpenDetails={() => 'teste'}
                    hours={new Date()}
                    products={[]}
                    setSaibaMais={() => 'teste'}
                    dispBusca={true}
                    situation="Aceita"
                    donationId="1"
                />
            </Grid>
            <Grid
                item
                xs={5}
                mt={5}
            >
                <CardDoacoes
                    titleCard="Doações"
                    address="Rua 1, 123"
                    feedback="Feedback teste"
                    images={[]}
                    handleSetOpenDetails={() => 'teste'}
                    hours={new Date()}
                    products={[]}
                    setSaibaMais={() => 'teste'}
                    dispBusca={true}
                    situation="Aceita"
                    donationId="1"
                />
            </Grid>
            <Grid
                item
                xs={5}
                mt={5}
            >
                <CardDoacoes
                    titleCard="Doações"
                    address="Rua 1, 123"
                    feedback="Feedback teste"
                    images={[]}
                    handleSetOpenDetails={() => 'teste'}
                    hours={new Date()}
                    products={[]}
                    setSaibaMais={() => 'teste'}
                    dispBusca={true}
                    situation="Aceita"
                    donationId="1"
                />
            </Grid>
        </Grid>
    )
}