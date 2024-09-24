import { useState, useEffect } from 'react';
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import MinhasDoacoesIcon from '../../assets/minhas-doacoes-icon.jpg';
import { HiOutlineClock } from "react-icons/hi";
import { HiMapPin, HiOutlineChevronDown } from "react-icons/hi2";
import { ProductsDonations } from '../../../client/minhas-doacoes-client/types';
import { format } from 'date-fns';

export type CardTriagemProps = {
  idDonation: string
  titleCard: string
  address: string
  setOpen: (open: boolean) => void
  setIdDonation: (idDonation: string) => void
  images: string[]
  setImages: (images: string[]) => void
  products: ProductsDonations[]
  setProducts: (products: ProductsDonations[]) => void
  setOpenProducts: (open: boolean) => void
  handleUpdateStatus: (id: string, status: 'PENDENTE' | 'ACEITA' | 'NEGADA', feedback?: string | null) => void
  dtDonation: Date
}


export const CardTriagem = (props: CardTriagemProps) => {
  const {
    titleCard,
    address,
    setOpen,
    idDonation,
    setIdDonation,
    setImages,
    setOpenProducts,
    setProducts,
    products,
    images,
    handleUpdateStatus,
    dtDonation
  } = props
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
  }, []);

  const handleClick = () => {
    setIdDonation(idDonation)
    setOpen(true)
  }

  const handleDetails = () => {
    setImages(images)
    setProducts(products)
    setOpenProducts(true)
  }

  return (
    <Card
      sx={{
        borderRadius: '25px',
        boxShadow: '0px 0px 90px rgba(0, 0, 0, 0.2)',
        height: '100%'
      }}>
      <CardContent

      >
        <Stack
          width={'100%'}
          display={'inline-flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack
            display={'flex'}
            alignItems={'center'}
            flexDirection={'row'}
            gap={2}
          >
            <img src={MinhasDoacoesIcon} alt="Minhas doações" style={{ width: '40px', height: '40px' }} />
            <Typography variant="subtitle2" fontWeight="bold">
              {titleCard}
            </Typography>
          </Stack>
          <Stack
            display={'flex'}
            alignItems={'center'}
            flexDirection={'row'}
            gap={2}>
            <HiOutlineClock style={{ fontSize: '25px' }} />
            <Typography variant="body1" color="text.primary">
              {dtDonation ? `${format(new Date(dtDonation), "HH'h' - dd/MM/yyyy")}` : currentTime} 
            </Typography>
          </Stack>
        </Stack>

        <Stack
          display={'flex'}
          alignItems={'center'}
          flexDirection={'row'}
          justifyContent={'center'}
          mt={4}
          gap={2}>
          <HiMapPin style={{ fontSize: '25px' }} />
          <Typography variant="body2" color="text.primary">
            {address}
          </Typography>
        </Stack>
        <Stack
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          textAlign={'center'}
          mt={4}
        >
          <Button
            variant="text"
            onClick={() => handleDetails()}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" color="text.primary">
              Mais detalhes
            </Typography>
            <HiOutlineChevronDown style={{ fontSize: '25px' }} />
          </Button>
        </Stack>
        <Stack
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          flexDirection={'row'}
          justifyContent={'center'}
          textAlign={'center'}
          mt={4}
          gap={10}
        >
          <Button
            variant="contained"
            onClick={() => handleUpdateStatus(props.idDonation, 'ACEITA')}
            size="small"
            sx={{
              backgroundColor: 'green',
              borderRadius: '25px',
              padding: '10px 20px',
              width: '160px',
              height: '50px',
              '&:hover': {
                backgroundColor: 'darkgreen'
              }
            }}>
            <Typography variant="body1" color="white">
              Aceitar
            </Typography>
          </Button>
          <Button
            onClick={handleClick}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: 'red',
              borderRadius: '25px',
              padding: '10px 20px',
              width: '160px',
              height: '50px',
              '&:hover': {
                backgroundColor: 'darkred'
              }
            }}>
            <Typography variant="body1" color="white">
              Cancelar
            </Typography>
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
