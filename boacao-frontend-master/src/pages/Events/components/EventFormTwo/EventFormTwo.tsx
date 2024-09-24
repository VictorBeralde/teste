import { Grid } from "@mui/material";
import TextField from "../../../../components/TextField/TextField";
import { useAtom } from "jotai";
import { upsertEventAtom } from "../../../../atoms/upsert-event";
import { format } from "date-fns";

export function EventFormTwo() {
    const [eventAtom, setEventAtom] = useAtom(upsertEventAtom);

    const handleDateChange = (field: any, value: any) => {
        const date = new Date(value);
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        setEventAtom((prev) => ({ ...prev, [field]: localDate }));
    };

    return (
        <>
            <Grid
                item
                xs={5}
                display={'flex'}
                justifyContent={'center'}
                flexDirection={'column'}
                mt={4}
            >
                <Grid
                    xs={12}
                    display={'flex'}
                >
                    <TextField
                        value={format(new Date(eventAtom.dataInicio), "yyyy-MM-dd")}
                        type="date"
                        label="Data de início do evento"
                        onChange={(event) => handleDateChange('dataInicio', event.target.value)}
                    />
                </Grid>
                <Grid
                    xs={12}
                    display={'flex'}
                    mt={3}
                >
                    <TextField
                        value={format(new Date(eventAtom.dataFim), "yyyy-MM-dd")}
                        type="date"
                        label="Data de término do evento"
                        onChange={(event) => handleDateChange('dataFim', event.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
}
