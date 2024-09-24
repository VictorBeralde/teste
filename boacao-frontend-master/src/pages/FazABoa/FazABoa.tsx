import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { SliderProgress } from "../../components/SliderProgress";
import { FormOne } from "./components/FormOne";
import { FormTwo } from "./components/FormTwo";
import { useNavigate, useParams } from "react-router-dom";
import { Concluido } from "./components/Concluido";
import { useClient } from "../../hooks/use-client";
import { DonorResult } from "../../../client/doador-client/types/donor-result";
import { enqueueSnackbar } from "notistack";
import { useUpdateImagesByDonationId } from "../../hooks/useDonation/use-update-images-by-donation-id";
import { MinhasDoacoesResult } from "../../../client/minhas-doacoes-client/types";
import { useUpdateDonationById } from "../../hooks/useDonation/use-update-donation-by-id";

export type ImageType = {
    src: string;
    name: string;
}

export type ProductsType = {
    productId: string;
    productName: string;
    quantity: number;
}

export type FazABoaProps = {
    variant: 'create' | 'update'
    donation?: MinhasDoacoesResult
}

export function FazABoa(props: FazABoaProps) {
    const { variant, donation } = props;
    const { idCampanha } = useParams<{ idCampanha: string }>();
    const idDoador = sessionStorage.getItem('userType');
    const [formSize] = useState<number[]>([0, 1]);
    const [size, setSize] = useState<number>(0);
    const navigate = useNavigate();
    const [quantityProduct, setQuantityProduct] = useState<ProductsType[]>([]);
    const [images, setImages] = useState<ImageType[]>([]);
    const [dispBusca, setDispBusca] = useState<boolean>(false);
    const [doador, setDoador] = useState<DonorResult>();
    const { mutateAsync: updateImagesByDonationId } = useUpdateImagesByDonationId();
    const { mutateAsync: updateDonationById } = useUpdateDonationById(variant === 'update' ? donation?.id || '' : '')
    const client = useClient();

    useEffect(() => {
        if (variant === 'update' && donation) {
            setSize(0);
            setQuantityProduct(donation.produtosDoacao?.map((product) => ({
                productId: product.idProduto,
                productName: product.nomeProduto,
                quantity: product.quantidade
            })) || []);
            setImages(donation.imagensDoacao?.map((image) => ({
                src: image,
                name: 'image'
            })) || []);
            setDispBusca(donation?.disponibilidadeEntrega || false);
        } else if (variant === 'create') {
            setSize(0);
            setQuantityProduct([]);
            setImages([]);
            setDispBusca(false);
        }
    }, []);

    const handleClick = async () => {
        if (size === 2) {
            navigate('/minhas-doacoes');
        } else if (size === 1) {
            try {
                const productsWithQuantity = quantityProduct.filter(product => product.quantity > 0);

                if (productsWithQuantity.length === 0) {
                    enqueueSnackbar('Selecione ao menos um produto para doar.', { variant: 'warning' });
                    setSize(0);
                    return;
                }

                if (variant === 'create') {
                    const result = await client.donations.createDonation({
                        idCampanha: idCampanha || '',
                        idDoador: idDoador,
                        produtoQuantidade: productsWithQuantity.map((product) => ({
                            idProduto: product.productId,
                            quantidade: product.quantity
                        })),
                        cep: doador?.usuario.endereco.cep || '',
                        bairro: doador?.usuario.endereco.bairro || '',
                        logradouro: doador?.usuario.endereco.logradouro || '',
                        cidade: doador?.usuario.endereco.cidade || '',
                        estado: doador?.usuario.endereco.estado || '',
                        numero: doador?.usuario.endereco.numero || 0,
                        complemento: doador?.usuario.endereco.complemento || '',
                        disponibilidadeEntrega: dispBusca || false
                    });

                    if (images.length > 0) {
                        await updateImagesByDonationId({
                            id: result.id,
                            images: images.map((image) => image.src)
                        });
                    }
                } else if (variant === 'update') {
                    await updateDonationById({
                        disponibilidadeEntrega: dispBusca,
                        endereco: {
                            cep: doador?.usuario.endereco.cep || '',
                        bairro: doador?.usuario.endereco.bairro || '',
                        logradouro: doador?.usuario.endereco.logradouro || '',
                        cidade: doador?.usuario.endereco.cidade || '',
                        estado: doador?.usuario.endereco.estado || '',
                        numero: doador?.usuario.endereco.numero || 0,
                        complemento: doador?.usuario.endereco.complemento || '',
                        } 
                    })
                }

                enqueueSnackbar('Doação realizada com sucesso!', { variant: 'success' });
                setSize(size + 1);
            } catch (error) {
                enqueueSnackbar('Erro ao realizar doação!', { variant: 'error' });
            }
        } else {
            setSize(size + 1);
        }
    }

    const handleClickBack = (id: string) => {
        if (size > 0) {
            setSize(size - 1);
        } else {
            navigate(`/campanha/doacao/${id}`);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (variant === 'create') {
                    const result = await client.products.getProductsForCampaignId(idCampanha ?? '');
                    setQuantityProduct(result.map((product: { idProduto: string; nomeProduto: string }) => ({
                        productId: product.idProduto,
                        productName: product.nomeProduto,
                        quantity: 0
                    })));
                } else if (variant === 'update') {
                    const result = await client.products.getProductsForCampaignId(donation?.idCampanha ?? '');
                    setQuantityProduct((prev) => {
                        const newProducts = result.filter((product: { idProduto: string; nomeProduto: string }) =>
                            !prev.some(p => p.productId === product.idProduto)
                        ).map((product: { idProduto: string; nomeProduto: string }) => ({
                            productId: product.idProduto,
                            productName: product.nomeProduto,
                            quantity: 0
                        }))
                        return [...prev, ...newProducts];
                    });
                }
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, [client.products, idCampanha, donation?.idCampanha, variant]);

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const result = await client.donors.getDonorById(idDoador ?? '');
                setDoador(result);
            } catch (error) {
                console.error("Erro ao buscar doador:", error);
            }
        };

        fetchDonor();
    }, [client.donors, idDoador]);

    const areAllQuantitiesZero = () => {
        return quantityProduct.every(product => product.quantity === 0);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12} padding={5}>
                    {size < 2 &&
                        <HiArrowLeft style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => handleClickBack(idCampanha!)} />
                    }
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Typography variant={'h1'}>
                        Vamos fazer a boa!
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Grid
                        item
                        xs={12}
                        gap={2}
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        mt={2}
                    >
                        {size < 2 && formSize.map((_s, index) => (
                            <SliderProgress
                                key={index}
                                number={size}
                                indexPosition={index}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {size === 0 && <FormOne products={quantityProduct} setProducts={setQuantityProduct} />}
                    {size === 1 && <FormTwo dispBusca={dispBusca} setDispBusca={setDispBusca} images={images} setImages={setImages} />}
                    {size === 2 && <Concluido />}
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {size === 2 &&
                        <Typography
                            variant={'body1'}
                            mt={3}
                        >
                            Volte para a tela principal
                        </Typography>}
                    <Button
                        sx={{
                            backgroundColor: '#375A88',
                            color: '#fff',
                            fontWeight: 'bold',
                            mt: 2,
                            paddingBottom: 2,
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 2,
                            borderRadius: 4,
                            fontSize: 23
                        }}
                        variant="contained"
                        onClick={handleClick}
                        disabled={areAllQuantitiesZero()}
                    >
                        {size === 2 ? 'Minhas doações' : size === 1 ? 'Finalizar doação' : 'Continuar'}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}