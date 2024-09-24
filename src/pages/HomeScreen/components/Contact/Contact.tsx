import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CardContact } from "../CardContact";

export function Contact() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <>
            <Stack
                width={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-around'}
                flexDirection={matches ? 'column' :'row'}
                padding={5}
            >
                <Stack
                    width={matches ? '100%' :'30%'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Typography
                        variant="h3"
                        textAlign={matches ? 'center' : 'start'}
                    >
                        Entre em contato e saiba mais
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        textAlign={matches ? 'center' : 'start'}
                    >
                        Converse com a gente
                    </Typography>
                </Stack>
                <Stack
                    width={matches ? '100%' : '40%'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <CardContact />
                </Stack>
            </Stack>
        </>
    )
}