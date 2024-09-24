import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { PixForm } from "../components/PixForm";
import { PixSuccess } from "../components/PixSuccess/PixSuccess";
import { useCreateDonationPix } from "../../../hooks/useDonation/use-create-pix";
import { enqueueSnackbar } from "notistack";
import { ImageSelects } from "../../../components/ImageSelects";

export function DonationPix() {
    const { idCampanha } = useParams<{ idCampanha: string }>();
    const [image, setImage] = useState<{ src: string, name: string } | null>(null);
    const [size, setSize] = useState<number>(0);
    const navigate = useNavigate();
    const idDoador = sessionStorage.getItem('userType') || '';

    const { mutateAsync: createDonationPix } = useCreateDonationPix();

    const handleClickNext = () => {
        if (size === 0) {
            handleDonationConfirmation()

        } else {
            navigate(`/campanha/doacao/${idCampanha}`)
        }
    }

    const handleDonationConfirmation = async () => {
        await createDonationPix({ idDoador: idDoador, idCampanha: idCampanha || '' });

        enqueueSnackbar('Doação confirmada! Obrigado!', { variant: 'success' });
        setSize(size + 1)
    };

    return (
        <>
            <Grid container>
                {size < 1 &&
                    <Grid item xs={12} padding={5}>
                        <HiArrowLeft style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => navigate(`/campanha/doacao/${idCampanha}`)} />
                    </Grid>}
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    mt={size < 1 ? 0 : 5}
                >
                    <Typography variant={'h1'}>
                        Vamos fazer a boa!
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {size === 0 && <PixForm setImage={setImage} />}
                    {size === 1 && <PixSuccess />}
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >

                    {size > 0 &&
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
                        onClick={() => handleClickNext()}
                        variant="contained"
                    >
                        {size === 0 ? 'Fazer doação' : 'Início'}
                    </Button>
                </Grid>
                {image &&
                    <Grid item>
                        <ImageSelects
                            src={image.src}
                            index={0}
                            handleClickDelete={() => setImage(null)}
                        />
                    </Grid>}
            </Grid>
        </>
    )
}