import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Objectivo from '../../../../assets/objetivo-boacao.svg'

export function Objective() {
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
                sx={{
                    backgroundColor: '#11111F'
                }}
            >
                <Stack
                    width={matches ? '100%' :'40%'}
                    textAlign={'center'}
                    padding={5}
                >
                    <Box
                        component="img"
                        src={Objectivo}
                        alignItems={'center'}
                        justifyContent="center"
                        alt={`Objetivo`}
                        sx={{
                            objectFit: 'contain'
                        }}
                    />
                </Stack>
                <Stack
                    width={matches ? '90%' :'45%'}
                    textAlign={'center'}
                    mb={2}
                >
                    <Typography
                        variant="body2"
                        color={'white'}
                        fontWeight={'bold'}
                        textAlign={'center'}
                    >
                        Nós do BOAÇÃO, temos como objetivo ajudar milhares de ONG a alcançar mais doadores no Brasil inteiro, para que seus objetivo sejam comprindo
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
}