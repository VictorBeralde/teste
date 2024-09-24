import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { IoIosPin } from "react-icons/io";
import Evento from '../../assets/boAcao-banner.svg';
import { HiOutlineCalendar } from "react-icons/hi";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export type CardLabels = {
    primary: string;
    secondary: string;
    address: string;
    image: string;
    hmDate: Date;
}

export type CardProps = {
    label: CardLabels;
}




export function CardHome(props: CardProps) {
    const { label } = props;
    const [currentTime, setCurrentTime] = useState('');
    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateCurrentTime();
        const intervalId = setInterval(updateCurrentTime, 60000);

        return () => clearInterval(intervalId);
    }, [props.label.hmDate]);

    return (
        <>
            <Card
                sx={{
                    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.10)',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%'
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}
                >
                    <Stack
                        width={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Box
                            component="img"
                            src={label.image || Evento}
                            alt="Evento"
                            sx={{
                                maxHeight: '250px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                borderRadius: '10px'
                            }}
                        />
                    </Stack>
                    <Stack>
                        <Typography color={'text.primary'} variant="h6" fontWeight={'bold'}>
                            {label.primary}
                        </Typography>
                        <Typography color={'text.secondary'} variant="subtitle2">
                            {label.secondary}
                        </Typography>
                        <Divider sx={{ backgroundColor: '#4A75CB', width: '50%' }} />
                        <Box mt={2} display="flex" flexDirection="column" alignItems="start">
                            <Box display="flex" alignItems="center">
                                <IoIosPin style={{ fontSize: '25px', marginRight: '8px' }} />
                                {label.address}
                            </Box>
                            <Box display="flex" alignItems="center" mt={1}>
                                <HiOutlineCalendar style={{ fontSize: '25px', marginRight: '8px' }} />
                                {label.hmDate ? `${format(new Date(label.hmDate), "dd/MM/yyyy")}` : currentTime}
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}
