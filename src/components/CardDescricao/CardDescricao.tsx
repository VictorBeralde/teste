import { Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import MinhasDoacoesIcon from '../../assets/minhas-doacoes-icon.jpg';
import { OngResult } from "../../../client/ong-client/types/ong-result";
import { CampaignsByDonorIdResult } from "../../../client/campanha-client/types";

export type CardDescricaoProps = {
    title: string;
    ongs?: OngResult[]
    donations?: CampaignsByDonorIdResult[]
    height?: string
    setOpen?: (value: boolean) => void
    setTitle: (title: string) => void
    setContent: (content: { nome: string }[]) => void
    setOpenContentList: (contentList: boolean) => void
    isLoading?: boolean
    isError?: boolean
}

export function CardDescricao(props: CardDescricaoProps) {
    const handleClickContentList = (title: string) => {
        props.setTitle(title)
        if (title === 'Ongs favoritas') {
            props.setContent(props.ongs?.map(ong => ({ nome: ong.usuario.nome })) || [])
            props.setOpenContentList(true)
        }
    }

    return (
        <Card sx={{ height: props.height, 
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
    >
            <CardContent sx={{ height: '100%' }}>
                <Stack width={'100%'} height="100%">
                    <Stack
                        display={'flex'}
                        direction={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography variant="h6" color={'#375A88'}>
                            {props.title}
                        </Typography>
                        {props.isLoading && <CircularProgress />}
                        {props.isError && <Typography variant="subtitle2" ml={2}>
                            Erro ao carregar informações
                        </Typography>}
                        {!props.isLoading && !props.isError && props.ongs && props.ongs.length > 1 &&
                            <Button
                                variant="text"
                                onClick={() => handleClickContentList("Ongs favoritas")}
                            >
                                <Typography variant="body2" color={'#375A88'}>
                                    Ver todos
                                </Typography>
                            </Button>}
                    </Stack>
                    <Stack
                        mt={2}
                        width={'100%'}
                        flexGrow={1}
                        display={'inline-flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {props.ongs && props.ongs.length === 0 && (
                            <Typography variant="subtitle2" ml={2}>
                                Nenhuma ong favoritada
                            </Typography>
                        )}
                        {props.ongs && props.ongs.slice(0, 2).map((ong) => (
                            <Stack
                                key={ong.usuario.nome}
                                width={'100%'}
                                display={'inline-flex'}
                                flexDirection={'row'}
                                alignItems={'center'}
                                mb={1}
                            >
                                <img src={MinhasDoacoesIcon} alt="Minhas doações" style={{ width: '50px', height: '50px' }} />
                                <Typography variant="subtitle2" ml={2}>
                                    {ong.usuario.nome || ''}
                                </Typography>
                            </Stack>
                        ))}
                        {props.donations && props.donations.length === 0 && (
                            <Typography variant="subtitle2" ml={2}>
                                Nenhuma campanha
                            </Typography>
                        )}
                        {props.donations && props.donations.slice(0, 2).map((donation) => (
                            <Stack
                            key={donation.idCampanha}
                            width={'100%'}
                            display={'inline-flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            mb={1}
                        >
                            <img src={MinhasDoacoesIcon} alt="Minhas doações" style={{ width: '50px', height: '50px' }} />
                            <Typography variant="subtitle2" ml={2}>
                                {donation.nomeCampanha || ''}
                            </Typography>
                        </Stack>
                        ))}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
