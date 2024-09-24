import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { HiUser } from "react-icons/hi";
import MinhasDoacoesIcon from '../../../../assets/minhas-doacoes-icon.jpg'
import { HiOutlineCamera } from "react-icons/hi2";
import styled from "@emotion/styled";
import { useUpdateImageOngById } from "../../../../hooks/useOng/use-update-image-ong-by-id";
import { useTotal } from "../../../../hooks/useOng/use-total-ong-by-id";
import { useMonthly } from "../../../../hooks/useOng/use-monthly-ong-by-id";

export type CardPerfilProps = {
    nome: string
    idOng: string
    image: string
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


export function CardPerfilOng(props: CardPerfilProps) {
    const { mutateAsync: updateImageDonor } = useUpdateImageOngById(`${props.idOng}`);
    const { data } = useTotal(props.idOng)
    const { data: dataMonthly } = useMonthly(props.idOng)

    // eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            await updateImageDonor(file);
        }
    };



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
                    >
                        <Stack
                            sx={{
                                backgroundColor: props.image ? 'transparent' : '#D9D9D9',
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
                            {props.image ?
                                <Box
                                    component="img"
                                    src={props.image}
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
                                        <VisuallyHiddenInput id="file-upload" type="file" onChange={handleFileChange} />
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
                            Doações totais recebidas
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color={'#375A88'}
                        >
                            {data || 0}
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
                            Doações mensais recebidas
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color={'#375A88'}
                        >
                            {dataMonthly || 0}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>

        </>
    )
}