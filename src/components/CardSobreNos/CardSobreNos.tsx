import { Button, Card, CardContent, Stack, Typography, Box } from "@mui/material";
import { HiLocationMarker } from "react-icons/hi";

export type CardSobreNosProps = {
    description: string;
    address: string;
};

export function CardSobreNos(props: CardSobreNosProps) {
    const handleClickMaps = () => {
        const formattedAddress = encodeURIComponent(props.address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${formattedAddress}`, '_blank');
    }

    return (
        <Card
            sx={{
                width: '100%',
                boxShadow: 'none',
                borderRadius: 2,
                border: '1px solid #E0E0E0',
                height: '520px'
            }}
        >
            <CardContent>
                <Stack
                    display={'flex'}
                    flexDirection={'column'}
                    height='100%'
                >
                    <Box mb={2}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={'bold'}
                            color={'black'}
                        >
                            Sobre nós
                        </Typography>
                    </Box>
                    <Box flexGrow={1}>
                        <Typography
                            variant="subtitle2"
                            textAlign={'justify'}
                            color={'black'}
                        >
                            {props.description}
                        </Typography>
                    </Box>
                    <Box mt={2} mb={2}>
                        <Stack
                            direction="row"
                            alignItems="center"
                        >
                            <HiLocationMarker style={{ color: 'black' }} />
                            <Typography
                                variant="body1"
                                color={'black'}
                                ml={1}
                            >
                                Endereço: {props.address}
                            </Typography>
                        </Stack>
                    </Box>
                    <Box mt="auto">
                        <Button
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                width: '100%',
                                height: '50px',
                                borderRadius: '10px',
                                backgroundColor: '#375A88'
                            }}
                            variant="contained"
                            onClick={handleClickMaps}
                        >
                            Ver no mapa
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
