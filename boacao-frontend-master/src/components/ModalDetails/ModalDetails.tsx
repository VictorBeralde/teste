import { Box, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import Donations from '../../assets/doacaoConcluida.svg'
import { ProductsDonations } from "../../../client/minhas-doacoes-client/types";

export type ModalDetailsProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    images: string[];
    products: ProductsDonations[];
};

export function ModalDetails(props: ModalDetailsProps) {
    const { open, setOpen, images, products } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setCurrentIndex(0);
        setImageError(false); 
    }, [images]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none'
            }}
        >
            <Grid
                item
                xs={12}
                mt={4}
                mb={4}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: 2,
                    width: '80%',
                    maxWidth: '800px'
                }}
            >
                <Grid container justifyContent="center" alignItems="center">
                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        padding={2}
                    >
                        <Stack>
                            <Typography
                                variant="h4"
                                fontWeight={'bold'}
                            >
                                Itens de doação
                            </Typography>
                        </Stack>
                        <Stack>
                            <IconButton
                                onClick={() => setOpen(false)}
                            >
                                <RiCloseFill color='black' size={30} />
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'flex-start'}
                        justifyContent={'center'}
                        paddingLeft={2}
                        mb={2}
                    >
                        <Typography
                            variant="h6"
                            mb={1}
                        >
                            Produtos:
                        </Typography>
                        {products.length > 0 && products.map((item, index) => (
                            <Typography
                                key={index}
                                variant="body1"
                                mb={0.5}
                            >
                                ● {item.quantidade}x {item.nomeProduto}
                            </Typography>
                        ))}
                    </Grid>
                    {images.length === 0 || imageError ? (
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            padding={2}
                        >
                            <Typography
                                variant="h6"
                                fontWeight={'bold'}
                                mb={3}
                            >
                                Nenhuma imagem foi enviada
                            </Typography>
                            <Box
                                component="img"
                                src={Donations}
                                alt="Doação"
                                sx={{
                                    maxHeight: '250px',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '10px'
                                }}
                                mb={3}
                            />
                        </Grid>
                    ) : (
                        <Grid
                            item
                            container
                            xs={12}
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            mb={2} 
                        >
                            <Grid item>
                                <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                                    <ArrowBackIos />
                                </IconButton>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                                display="flex"
                                justifyContent="center"
                            >
                                <Box
                                    component="img"
                                    src={images[currentIndex]}
                                    alt={`Doação ${currentIndex + 1}`}
                                    onError={handleImageError}
                                    sx={{
                                        height: '300px',
                                        width: 'auto',
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        padding: 1,
                                        mb: 2 
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleNext} disabled={currentIndex === images.length - 1}>
                                    <ArrowForwardIos />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Modal>
    );
}