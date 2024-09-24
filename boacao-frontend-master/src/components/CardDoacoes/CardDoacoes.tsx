import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import IconDoacao from '../../assets/doacao-icon-pequeno.svg'
import { BsClock } from "react-icons/bs"
import { IoIosPin } from "react-icons/io"
import { HiChevronDown } from "react-icons/hi"
import { ReactNode } from "react";
import { ProductsDonations } from "../../../client/minhas-doacoes-client/types";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi"
import { useNavigate } from "react-router-dom";
import { useDeleteDonationsById } from "../../hooks/useDonation/use-delete-donations-by-id";
import { format } from "date-fns";

type PersonalizeCardType = {
    backgroundColor: string,
    phrase: ReactNode
}

type PersonalizeCardFunction = (situation: string, dispBusca: boolean, feedback: string, onClick?: (feedback: string) => void) => PersonalizeCardType | undefined;

export type CardDoacoesProps = {
    titleCard: string
    hours: Date
    situation: string
    dispBusca: boolean
    setSaibaMais: (feedback: string) => void
    handleSetOpenDetails: (images: string[], products: ProductsDonations[]) => void
    address: string
    images: string[]
    feedback: string
    products: ProductsDonations[]
    donationId: string
}
export function CardDoacoes(props: CardDoacoesProps) {
    const result = PersonalizeCard(props.situation, props.dispBusca, props.feedback || 'Sem feedback', props.setSaibaMais);
    const navigate = useNavigate()
    const { mutateAsync: deleteDonation } = useDeleteDonationsById(props.donationId)

    const backgroundColor = result ? result.backgroundColor : '';
    const phrase = result ? result.phrase : '';
    return (
        <>
            <Card
                sx={{
                    borderRadius: '10px',
                    height: 'auto'
                }}>
                <CardContent>
                    <Stack
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <Stack
                            display={'flex'}
                            flexDirection={'row'}
                        >
                            <Stack
                                width={'50%'}
                                display={'flex'}
                                flexDirection={'row'}
                            >
                                <img src={IconDoacao} alt="Doacoes" />
                            </Stack>
                            <Typography
                                variant="subtitle2"
                                fontWeight={'bold'}
                                ml={2}
                            >
                                {props.titleCard}
                            </Typography>
                        </Stack>
                        <Stack
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <BsClock style={{ fontSize: '25px' }} />
                            <Typography
                                variant="subtitle2"
                                fontWeight={'bold'}
                                ml={1}
                            >
                                {`${format(new Date(props.hours), "HH'h' - dd/MM/yyyy")}`}
                            </Typography>

                            {props.situation === "PENDENTE" &&
                                <>
                                    <Stack
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        flexDirection={'row'}
                                    >
                                        <Button
                                            variant="text"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: 0,
                                                padding: 0,
                                                width: 'auto'
                                            }}
                                            color="inherit"
                                            onClick={() => navigate(`/campanha/doacao/editar/itens/${props.donationId}`)}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                            >
                                                <HiOutlinePencil style={{ fontSize: '25px' }} />
                                            </Typography>
                                        </Button>
                                        <Button
                                            variant="text"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: 0,
                                                padding: 0,
                                            }}
                                            color="inherit"
                                            onClick={() => deleteDonation()}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                            >
                                                <HiOutlineTrash style={{ fontSize: '25px' }} />
                                            </Typography>
                                        </Button>
                                    </Stack>
                                </>
                            }
                        </Stack>
                    </Stack>
                    <Stack
                        width={'100%'}
                        alignItems={'center'}
                        mt={4}
                    >
                        <Box
                            height={'100px'}
                            width={'95%'}
                            display={'flex'}
                            alignItems={'center'}
                            sx={{
                                backgroundColor: `${backgroundColor}`,
                                borderRadius: 5,
                                padding: 2
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                color={'white'}
                                ml={2}
                            >
                                {phrase}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        width={'100%'}
                        alignItems={'center'}
                        mt={4}
                    >
                        <Box
                            width={'95%'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <IoIosPin style={{ fontSize: '25px' }} />
                            <Typography
                                variant="subtitle2"
                                ml={2}
                            >
                                {props.address}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        padding={0}
                        width={'100%'}
                        alignItems={'center'}
                    >
                        <Stack
                            display={'inline'}
                            padding={1}
                        >
                            <Button
                                variant="text"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mt: 2,
                                    padding: 0
                                }}
                                color="inherit"
                                onClick={() => props.handleSetOpenDetails && props.handleSetOpenDetails(props.images, props.products)}
                            >
                                <Typography
                                    variant="subtitle2"
                                >
                                    Ver detalhes
                                </Typography>
                                <HiChevronDown style={{ fontSize: '25px' }} />
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

const PersonalizeCard: PersonalizeCardFunction = (situation, dispBusca, feedback, onClick) => {
    if (situation === 'ACEITA' && dispBusca) return { backgroundColor: '#39766C', phrase: 'Sua Doação foi aceita pela ONG, logo chegarão ao seu endereço.' };
    if (situation === 'ACEITA') return { backgroundColor: '#39766C', phrase: 'Sua Doação foi aceita pela ONG, já pode ser entregue até o estabelecimento.' };
    if (situation === 'PENDENTE') return { backgroundColor: '#ECB847', phrase: 'Sua Doação está sendo analisada por um responsavel da ONG.' };
    if (situation === 'NEGADA') return {
        backgroundColor: '#EC4747', phrase:
            <> Infelizmente sua doação não foi aceita pela ONG, clique em
                <Button variant="text" sx={{ fontWeight: 'bold', color: 'black' }} onClick={() => onClick && onClick(feedback)}> saiba mais </Button>
                para visualizar os detalhes</>
    }

    return undefined;
}
