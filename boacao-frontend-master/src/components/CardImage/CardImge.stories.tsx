import { Grid } from "@mui/material"
import { CardImage } from "./CardImage"

export default {
    title: 'Components/CardImage',
}

export const Example = () => {
    return (
        <>
            <Grid
                container
                display={'flex'}
                flexDirection={'row'}
            >
                <Grid item xs={12} 
                gap={3}
                display={'flex'}
                flexDirection={'row'}>
                    <Grid xs={3}>
                        <CardImage 
                            image=""
                        />
                    </Grid>
                    <Grid xs={3}>
                        <CardImage 
                            image=""
                        />
                    </Grid>
                    <Grid xs={3}>
                        <CardImage 
                            image=""
                        />
                    </Grid>
                </Grid>
            </Grid>   
        </>
    )
}