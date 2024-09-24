import { Grid } from "@mui/material"
import { CardHome } from "./CardHome"

export default {
    title: 'Components/CardHome'
}

export const Default = () => (
    <Grid container spacing={2} direction={'row'}>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row'}}>
            <Grid xs={4}>
                <CardHome
                    label={{
                        primary: 'Campanha de arrecadação de alimentos',
                        secondary: 'Ajude a alimentar famílias carentes',
                        address: 'Cidade Tiradentes - ZL',
                        image: '',
                        hmDate: new Date()
                    }}
                />
            </Grid>
            <Grid xs={4}>
                <CardHome
                    label={{
                        primary: 'Campanha de arrecadação de alimentos',
                        secondary: 'Ajude a alimentar famílias carentes',
                        address: 'Cidade Tiradentes - ZL',
                        image: '',
                        hmDate: new Date()
                    }}
                />
            </Grid>
            <Grid xs={4}>
                <CardHome
                    label={{
                        primary: 'Campanha de arrecadação de alimentos',
                        secondary: 'Ajude a alimentar famílias carentes',
                        address: 'Cidade Tiradentes - ZL',
                        image: '',
                        hmDate: new Date()
                    }}
                />
            </Grid>
        </Grid>
    </Grid>
)  