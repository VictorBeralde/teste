import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { SliderProgress } from "../../../components/SliderProgress";
import { EventFormOne } from "../components/EventFormOne";
import { EventFormTwo } from "../components/EventFormTwo";
import { UpsertEventSuccess } from "../components/UpsertEventSuccess";
import { useCreateEvent } from "../../../hooks/useEvent/use-create-event";
import { useAtom } from "jotai";
import { upsertEventAtom } from "../../../atoms/upsert-event";
import { useUpdateImageByEventId } from "../../../hooks/useEvent/use-update-image-by-event-id";
import { useOngById } from "../../../hooks/useOng/use-ong-by-id";

export type UpsertEventType = {
    variant: 'create' | 'update'
}

export function UpsertEvent(props: UpsertEventType) {
    const { variant } = props
    const idOng = sessionStorage.getItem('userId') || ''
    const [formSize] = useState<number[]>([0, 1])
    const [eventAtom, setEventAtom] = useAtom(upsertEventAtom)
    const { data } = useOngById(idOng || '')
    const [size, setSize] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (variant === 'create') {
            setEventAtom({
                dataInicio: new Date(),
                dataFim: new Date(),
                descricao: '',
                nome: '',
                urlBanner: null
            })
        }
    }, [])

    const handleClickBack = () => {
        if (size > 0) {
            setSize(size - 1);
        } else {
            navigate(`/eventos/criar-evento`);
        }
    }

    const { mutateAsync: createEvent } = useCreateEvent();
    const { mutateAsync: updateEvent } = useUpdateImageByEventId();

    const handleClickNext = () => {
        if (size === 1) {
            handleUpsertEvent()
        } else if (size === 2) {
            navigate('/eventos')
        } else {
            setSize(size + 1)
        }
    }

    const handleUpsertEvent = async () => {
        if (variant === 'create') {
            try {
                const result = await createEvent({
                    nome: eventAtom.nome,
                    descricao: eventAtom.descricao,
                    dtInicio: eventAtom.dataInicio,
                    dtFim: eventAtom.dataFim,
                    imagem: eventAtom.urlBanner.src || '',
                    idOng: idOng || '',
                    endereco: {
                        bairro: data?.usuario?.endereco?.bairro || '',
                        cep: data?.usuario?.endereco?.cep || '',
                        cidade: data?.usuario?.endereco?.cidade || '',
                        complemento: data?.usuario?.endereco?.complemento || '',
                        estado: data?.usuario?.endereco?.estado || '',
                        logradouro: data?.usuario?.endereco?.logradouro || '',
                        numero: data?.usuario?.endereco?.numero || 0
                    }
                })

                setSize(size + 1)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleDisable = () => {
        if (size === 0) {
            return eventAtom.nome === null || eventAtom.descricao === null || eventAtom.urlBanner === null
        } else {
            return eventAtom.dataInicio === null || eventAtom.dataFim === null
        }
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} padding={5}>
                    {size < 2 &&
                        <HiArrowLeft style={{ fontSize: '35px', cursor: 'pointer' }} onClick={handleClickBack} />
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
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {size === 0 && <EventFormOne />}
                    {size === 1 && <EventFormTwo />}
                    {size === 2 && <UpsertEventSuccess />}
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
                            paddingBottom: 2,
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 2,
                            borderRadius: 4,
                            fontSize: 23,
                            mt: size === 1 ? 4 : 2
                        }}
                        variant="contained"
                        onClick={handleClickNext}
                        disabled={handleDisable()}
                    >
                        {size === 2 ? 'Início' : size === 1 ? 'Finalizar' : 'Continuar'}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}