import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { HiUser } from "react-icons/hi";
import MinhasDoacoesIcon from '../../assets/minhas-doacoes-icon.jpg'
import { HiOutlineCamera } from "react-icons/hi2";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useClient } from "../../hooks/use-client";
import { useUpdateImageDonorByDonorId } from "../../hooks/useDonor/use-update-image-by-donor-id";

export type CardPerfilProps = {
    nome: string
    idDoador: number
    img: string
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export function CardPerfil(props: CardPerfilProps) {
    const client = useClient();
    const [totalDonation, setTotalDonation] = useState<number>(0);
    const [monthlyDonation, setMonthlyDonation] = useState<number>(0);
    const { mutateAsync: updateImageDonor } = useUpdateImageDonorByDonorId(`${props.idDoador}`);
    const [inputKey, setInputKey] = useState(Date.now());

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const base64 = await toBase64(file);
    
            await updateImageDonor(base64 as string);
    
            setInputKey(Date.now());
        }
    };
    
    const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    useEffect(() => {
        async function fetchDonations() {
            const total = await client.donors.getTotalDonations(props.idDoador);
            const monthly = await client.donors.getMonthlyDonations(props.idDoador);
            setTotalDonation(total);
            setMonthlyDonation(monthly);
        }

        fetchDonations();
    }, [props.idDoador, client.donations]);

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    margin: 0,
                    height: 'auto',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
            >
                <CardContent
                    sx={{
                        width: '100%',
                        padding: 0,
                        margin: 0
                    }}
                >
                    <Stack
                        width={'100%'}
                        minHeight={100}
                        sx={{
                            backgroundColor: '#375A88',
                            display: 'inline-block',
                            position: 'relative'
                        }}
                    >
                    </Stack>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        margin={0}
                        padding={0}
                    >
                        <Stack
                            sx={{
                                backgroundColor: props.img ? 'transparent' : '#D9D9D9',
                                display: 'inline-block',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                padding: 0,
                                margin: 0,
                            }}
                            borderRadius={100}
                            padding={4}
                        >
                            {props.img ?
                                <Box
                                    component="img"
                                    src={props.img}
                                    alt="Perfil"
                                    sx={{
                                        maxHeight: '100px',
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '100px'
                                    }}
                                /> : <HiUser style={{ color: '#375A88', fontSize: '100px' }} />
                            }

                        </Stack>
                        <Stack
                            width={'100%'}
                            display={'flex'}
                            alignItems={'end'}
                        >
                            <Stack
                                width={'45%'}
                                borderRadius={100}
                            >
                                <label htmlFor="file-upload">
                                    <Button
                                        component="span"
                                        variant="contained"
                                        sx={{
                                            marginTop: '30px',
                                            color: '#375A88',
                                            fontSize: '30px',
                                            position: 'absolute',
                                            zIndex: 9,
                                            backgroundColor: '#375A88',
                                            paddingTop: 1.5,
                                            paddingBottom: 1.5,
                                            borderRadius: 10
                                        }}
                                    >
                                        <HiOutlineCamera style={{ color: '#FFFFFF' }} />
                                        <VisuallyHiddenInput id="file-upload" key={inputKey} type="file" onChange={handleFileChange} />
                                    </Button>
                                </label>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 10
                        }}
                    >
                        <Typography
                            variant="h6"
                        >
                            {props.nome || 'Sem nome cadastrado'}
                        </Typography>
                        <Stack
                            display={'inline-block'}
                        >
                            <img src={MinhasDoacoesIcon} alt="minhas-doacoes-icon" style={{ width: '50px', height: '50px' }} />
                        </Stack>
                    </Stack>
                    <Stack
                        width={'100%'}
                    >
                        <Divider
                            sx={{
                                mt: 3,
                                mb: 2.5,
                                width: '100%',
                                backgroundColor: '#D9D9D9'
                            }}
                        />
                    </Stack>
                    <Stack
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        padding={2}
                    >
                        <Typography
                            variant="subtitle2"
                        >
                            Minhas Doações Totais
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color={'#375A88'}
                        >
                            {totalDonation || 0}
                        </Typography>
                    </Stack>
                    <Stack
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        padding={2}
                    >
                        <Typography
                            variant="subtitle2"
                        >
                            Minhas Doações Mensal
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color={'#375A88'}
                        >
                            {monthlyDonation || 0}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>

        </>
    )
}