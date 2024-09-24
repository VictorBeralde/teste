import { Grid } from "@mui/material"
import { CardLocation } from "./CardLocation"

export default {
    title: 'Components/CardLocation',
}

export const Example = () => {
    return (
        <Grid
            container
            spacing={2}
            direction={'row'}
        >
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
                gap={2}
            >
                <Grid xs={4}>
                    <CardLocation
                        title="Ong 1"
                        address="Rua 1, 123"
                        distance={'1'}
                        isFavorited={false}
                        idOng="1"
                        latitude="0"
                        longitude="0"
                        img=""
                        handleIsFavorited={() => 'teste'}
                    />
                </Grid>
                <Grid xs={4}>
                    <CardLocation
                        title="Ong 1"
                        address="Rua 1, 123"
                        distance={'1'}
                        isFavorited={false}
                        idOng="1"
                        latitude="0"
                        longitude="0"
                        img=""
                        handleIsFavorited={() => 'teste'}
                    />
                </Grid>
                <Grid xs={4}>
                    <CardLocation
                        title="Ong 1"
                        address="Rua 1, 123"
                        distance={'1'}
                        isFavorited={false}
                        idOng="1"
                        latitude="0"
                        longitude="0"
                        img=""
                        handleIsFavorited={() => 'teste'}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}