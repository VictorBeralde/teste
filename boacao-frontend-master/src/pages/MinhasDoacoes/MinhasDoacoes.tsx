import { Button, CircularProgress, Grid, Popover, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { CardDoacoes } from "../../components/CardDoacoes";
import { ModalMotivo } from "../../components/ModalMotivo";
import { ModalDetails } from "../../components/ModalDetails";
import { MinhasDoacoesVazia } from "./MinhasDoacoesVazia";
import { HiCloudDownload } from "react-icons/hi";
import { useClient } from "../../hooks/use-client";
import { useDonationsByDonorId } from "../../hooks/useDonation/use-donations-by-donor-id";
import { ProductsDonations } from "../../../client/minhas-doacoes-client/types";

export function MinhasDoacoes() {
    const [openModal, setOpenModal] = useState(false)
    const [openModalDetails, setOpenModalDetails] = useState(false)
    // eslint-disable-next-line no-undef
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const openPopover = Boolean(anchorEl)
    const id = openPopover ? 'simple-popover' : undefined
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const client = useClient()
    const [images, setImages] = useState<string[]>([])
    const [products, setProducts] = useState<ProductsDonations[]>([])
    const idDoador = sessionStorage.getItem('userType');
    const [feedback, setFeedback] = useState<string>('')

    const handleClosePopover = () => {
        setAnchorEl(null)
    }

    const { data: donations, isLoading, isError } = useDonationsByDonorId(idDoador || '')

    const handleSaibaMais = (feedback: string) => {
        setOpenModal(true)
        setFeedback(feedback)
    }

    const handleDownloadCsv = async () => {
        try {
            const userId = sessionStorage.getItem('userType');
            if (userId) {
                const result = await client.donors.downloadCsv(userId);

                if (result) {
                    const blob = new Blob([result], { type: 'text/csv' });

                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `doacoes-${new Date()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    console.error('A resposta da requisição não contém dados.');
                }
            } else {
                console.error('ID do usuário não encontrado.');
            }
        } catch (error) {
            console.error("Erro ao baixar o CSV:", error);
        }
    };

    const handleSetOpenDetails = async (images: string[], products: ProductsDonations[]) => {
        setProducts(products || [])
        setImages(images || [])
        setOpenModalDetails(true)
    }
    
    return (
        <>
            <ModalMotivo
                open={openModal}
                setOpen={setOpenModal}
                feedback={feedback}
            />
            <ModalDetails
                open={openModalDetails}
                setOpen={setOpenModalDetails}
                images={images}
                products={products}
            />
            <Grid
                container
                display={'flex'}
                flexDirection={'column'}
            >
                {!isLoading && !isError && 
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    mt={matches ? 7 : 0}
                >
                    <Grid
                        xs={12}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Typography variant={'subtitle1'} fontWeight={'bold'}>
                            {!isLoading && !isError && donations && donations.length > 0 && 'Minhas Doações'}
                            {!isLoading && !isError && donations && donations.length === 0 && 'Você ainda não tem nenhuma doação em andamento. Vamos fazer a boa?'}
                        </Typography>
                    </Grid>
                    <Grid
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Stack>
                            <Button onClick={handleDownloadCsv}>
                                <HiCloudDownload fontSize={'35px'} color="black" />
                            </Button>
                        </Stack>
                        
                        <Popover
                            id={id}
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            disableAutoFocus={true}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                        >
                        </Popover>
                    </Grid>
                </Grid>}
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    flexDirection={matches ? 'column' : 'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Grid
                        item
                        padding={0}
                        margin={0}
                    >
                        {isLoading && <CircularProgress />}
                        {isError && <Typography variant={'h6'}>Erro ao carregar as doações</Typography>}
                        {!isLoading && !isError && donations && donations.length === 0 &&
                            <Grid
                                container
                                xs={9}
                            >
                                <MinhasDoacoesVazia />
                            </Grid>}
                        {!isLoading && !isError && donations && donations.length > 0 &&
                            <Grid
                                container
                                xs={12}
                                gap={3}
                                display={'flex'}
                                flexDirection={matches ? 'column' : 'row'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                {donations && donations.map((item, index) => (
                                    <Grid
                                        key={index}
                                        item
                                        xs={matches ? 12 : donations && donations.length === 1 ? 12 : 5}
                                    >
                                        <CardDoacoes
                                            titleCard={item.codigo || 'Sem código'}
                                            hours={item.dtCriacao}
                                            situation={item.situacao}
                                            dispBusca={item.disponibilidadeEntrega}
                                            setSaibaMais={handleSaibaMais}
                                            handleSetOpenDetails={handleSetOpenDetails}
                                            images={item.imagensDoacao}
                                            address={item.endereco.logradouro + ', ' + item.endereco.numero + ' - ' + item.endereco.cep}
                                            feedback={item.feedback}
                                            products={item.produtosDoacao}
                                            donationId={item.id}
                                        />
                                    </Grid>
                                ))}
                            </Grid>}
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}