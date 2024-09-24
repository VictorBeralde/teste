import { useState } from "react";
import { Stack, Typography, Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export type BenefitsValues = {
    image: string
    title: string
    description: string
}

export type BenefitsProps = {
    values: BenefitsValues[]
}

export function Benefits(props: BenefitsProps) {
    const { values } = props;
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? values.length - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev === values.length - 1 ? 0 : prev + 1));
    };

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Stack alignItems="center" justifyContent="center" spacing={4} sx={{ backgroundColor: "#11111F", padding: "2rem 0", color: "white" }}>
            <Typography variant="h3" textAlign="center">
                Benefícios para ONGs
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', position: 'relative' }}>
                <IconButton
                    onClick={handlePrevSlide}
                    sx={{ position: 'absolute', left: 0, color: 'white' }}
                >
                    <ArrowBackIosIcon />
                </IconButton>

                <Box display="flex" alignItems="center" justifyContent="center" flexDirection={matches ? 'column' : 'row'} sx={{ width: '80%', height: '500px', position: 'relative' }}>
                    <Box sx={{ width: '50%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={values[currentSlide].image} alt={values[currentSlide].title} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    </Box>
                    <Box sx={{ width: '50%', height: '100%', padding: '1rem', boxSizing: 'border-box', overflowY: 'auto' }}>
                        <Typography variant="h5" fontWeight="bold">
                            {values[currentSlide].title}
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            {values[currentSlide].description}
                        </Typography>
                    </Box>
                </Box>

                <IconButton
                    onClick={handleNextSlide}
                    sx={{ position: 'absolute', right: 0, color: 'white' }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Stack>
    );
}
