import { Checkbox, FormControlLabel, Grid, Stack, Typography } from "@mui/material";

export type ModalStatusFilterProps = {
    situation: string
    setSituation: (situation: string) => void
}

export function ModalStatusFilter(props: ModalStatusFilterProps) {
    const { situation, setSituation } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = event.target;
        if (checked) {
            setSituation(name)
        } else {
            setSituation(name);
        }
    };

    return (
        <>
            <Grid container direction='column' rowGap={2} p={2}>
                <Grid item xs={12}>
                    <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Typography
                            variant='h6'
                            fontWeight='bold'
                        >
                            Filtro
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} display={'flex'} flexDirection={'column'}>
                    <FormControlLabel
                        control={<Checkbox checked={situation.includes("PENDENTE")} onChange={handleChange} name="PENDENTE" />}
                        label="Pendente"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={situation.includes("ACEITA")} onChange={handleChange} name="ACEITA" />}
                        label="Aceita"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={situation.includes("NEGADA")} onChange={handleChange} name="NEGADA" />}
                        label="Negada"
                    />
                </Grid>
            </Grid>
        </>
    )
}
