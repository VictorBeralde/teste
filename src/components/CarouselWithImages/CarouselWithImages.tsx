import Slider from 'react-slick';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export type CarouselProps = {
    images: string[];
}

export function CarouselWithImages(props: CarouselProps) {
    const { images } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    const settings = {
        infinite: true,
        slidesToShow:  matches ? 3 : 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <Box
                    key={index}
                    display="flex"
                    alignItems={'center'}
                    justifyContent="center"
                >
                    <Box
                        component="img"
                        src={image}
                        alignItems={'center'}
                        justifyContent="center"
                        alt={`carousel-item-${index}`}
                    />
                </Box>
            ))}
        </Slider>
    );
}
