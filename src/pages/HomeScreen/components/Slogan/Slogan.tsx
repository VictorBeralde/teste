import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import SloganHome from '../../../../assets/imagem-home.png'

export type SloganProps = {
    isOng?: boolean
}

export function Slogan(props: SloganProps) {
    const { isOng } = props
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Stack
                width={'100%'}
                display={'flex'}
                direction={matches ? 'column' : 'row'}
            >
                <Stack
                    width={matches ? '100%' : '55%'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    direction={'column'}
                    gap={3}
                >
                    <Stack
                        width={matches ? '100%' : '80%'}
                        display={'flex'}
                        alignItems={'left'}
                        justifyContent={'center'}
                        textAlign={matches ? 'center' : 'start'}
                    >
                        <Typography
                            variant="h1"
                        >
                            #FazABoa
                        </Typography>
                        <Typography
                            variant="subtitle1"
                        >
                            Porque juntos fazemos a mudança acontecer.
                        </Typography>
                        <Stack
                            paddingLeft={2}
                            paddingRight={2}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    width: matches ? '100%' : '50%',
                                    backgroundColor: '#375A88',
                                    borderRadius: 5
                                }}
                            >
                                {isOng ? "Cadastre-se" : "Conheça a plataforma"}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    width={matches ? '100%' : '45%'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    mt={matches ? 2 : 0}
                    padding={5}
                >
                    <Box
                        component="img"
                        src={SloganHome}
                        alt="Slogan home"
                        width={matches ? '100%' : '80%'}
                    />
                </Stack>
            </Stack>
        </>
    )
}