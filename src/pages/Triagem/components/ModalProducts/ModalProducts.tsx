import { Box, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Banner } from "../../../../components/Banner";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import Donations from '../../../../assets/doacaoConcluida.svg'
import { ProductsDonations } from "../../../../../client/minhas-doacoes-client/types";

export type ModalProductsProps = {
    open: boolean
    setOpen: (open: boolean) => void
    products: ProductsDonations[]
    images: string[]
}

export function ModalProducts(props: ModalProductsProps) {
    const { open, setOpen, products, images } = props
    const [doacoesImages] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % doacoesImages.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + doacoesImages.length) % doacoesImages.length);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    boxShadow: 'none'
                }}
            >
                <Grid item xs={12} mt={4} mb={4} sx={{ backgroundColor: 'white' }}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            paddingLeft={2}
                            paddingRight={2}
                            paddingTop={1}
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
                            xs={12}
                            display={'flex'}
                            alignItems={'left'}
                            justifyContent={'center'}
                            direction={'column'}
                        >
                            <Typography
                                variant="h6"
                                ml={1}
                            >
                                Produtos:
                            </Typography>
                            {products.length > 0 && props.products.map((item, index) => (
                                <Stack key={index}>
                                    <Typography
                                        variant="h6"
                                        ml={1}
                                    >
                                       ● {item.quantidade}x {item.nomeProduto}
                                    </Typography>
                                </Stack>
                            ))}
                        </Grid>
                        {images.length === 0 && 
                        <Grid
                            xs={12}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            direction={'column'}
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
                        </Grid>}
                        {props.images.length > 0 &&
                            <>
                                <Grid item>
                                    <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                                        <ArrowBackIos />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} container justifyContent="center">
                                    {props.images.slice(currentIndex, currentIndex + 1).map((imageUrl, index) => (
                                        <Grid item xs={12} key={index}>
                                            <Banner
                                                img={imageUrl}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={handleNext} disabled={currentIndex === props.images.length - 1}>
                                        <ArrowForwardIos />
                                    </IconButton>
                                </Grid>
                            </>}
                    </Grid>
                </Grid>
            </Modal>
        </>
    )
}