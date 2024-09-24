import { Grid, Stack, Typography } from "@mui/material";
import TextField from "../../../../components/TextField/TextField";
import { format } from "date-fns";

export type FiltroCampanhaProps = {
    endDate: Date;
    setEndDate: (endDate: Date) => void;
}

export function FiltroCampanha(props: FiltroCampanhaProps) {
    const { endDate, setEndDate } = props;

    const handleDateChange = (value: any) => {
        const date = new Date(value);
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        setEndDate(localDate);
    };

    return (
        <>
            <Grid container direction='column' rowGap='16px' p={2}>
                <Grid item xs={12}>
                    <Stack
                        direction='row'
                        spacing='16px'
                        alignItems='center'
                        justifyContent='center'>
                        <Typography
                            variant='h6'
                            fontWeight='bold'
                        >
                            Filtro
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack>
                        <Typography
                            variant='h6'
                            fontWeight='bold'
                        >
                            Data Final
                        </Typography>
                        <TextField 
                            value={format(new Date(endDate), 'yyyy-MM-dd')}
                            onChange={(e) => handleDateChange(e.target.value)}
                            type='date'
                        />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
