import { Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { HiArrowLeft } from "react-icons/hi"
import { SliderProgress } from "../../../../components/SliderProgress"
import { CollectionPointsFormOne } from "../CollectionPointsFormOne"
import { useAtom } from "jotai"
import { upsertCollectionPointsAtom } from "../../../../atoms/upsert-collection-points"
import { useNavigate } from "react-router-dom"
import { CollectionPointsFormTwo } from "../CollectionPointsFormTwo"
import { UpsertCollectionPointSuccess } from "../UpsertCollectionPointsSuccess"
import { useCreateCollectionPoint } from "../../../../hooks/useCollectionPoints/use-create-collection-point"
import { useUpdateCollectionPointById } from "../../../../hooks/useCollectionPoints/use-update-collection-points-by-id"

export type UpsertCollectionPointsType = {
    variant: 'create' | 'update'
    id?: string
}

export function UpsertCollectionPoints(props: UpsertCollectionPointsType) {
    const { variant, id } = props
    const [collectionPointsAtom, setCollectionPointsAtom] = useAtom(upsertCollectionPointsAtom)
    const [size, setSize] = useState<number>(0)
    const { mutateAsync: CreateCollectionPoint } = useCreateCollectionPoint({ setSize, size })
    const { mutateAsync: UpdateCollectionPointsById } = useUpdateCollectionPointById({ setSize, size, id: '' })
    const [formSize] = useState<number[]>([0, 1])
    const idOng = sessionStorage.getItem('userId') || ''
    const navigate = useNavigate()

    useEffect(() => {
        if (variant === 'create') {
            setCollectionPointsAtom({
                nome: '',
                descricao: '',
                urlBanner: null,
                horarioFuncionamento: '',
                bairro: '',
                cep: '',
                cidade: '',
                complemento: '',
                logradouro: '',
                numero: '',
                dataDisponivel: new Date(),
            })
        }
    }, [])

    const handleUpsertCollectionPoints = async () => {
        if (variant === 'create') {
            await CreateCollectionPoint({
                nome: collectionPointsAtom.nome,
                descricao: collectionPointsAtom.descricao,
                urlBanner: collectionPointsAtom.urlBanner.src,
                horarioFuncionamento: collectionPointsAtom.horarioFuncionamento,
                cep: collectionPointsAtom.cep,
                bairro: collectionPointsAtom.bairro,
                cidade: collectionPointsAtom.cidade,
                complemento: collectionPointsAtom.complemento,
                logradouro: collectionPointsAtom.logradouro,
                numero: collectionPointsAtom.numero,
                dataDisponivel: collectionPointsAtom.dataDisponivel,
                idOng: idOng
            })
        } else {
            await UpdateCollectionPointsById({
                nome: collectionPointsAtom.nome,
                descricao: collectionPointsAtom.descricao,
                urlBanner: collectionPointsAtom.urlBanner.src,
                horarioFuncionamento: collectionPointsAtom.horarioFuncionamento,
                cep: collectionPointsAtom.cep,
                bairro: collectionPointsAtom.bairro,
                cidade: collectionPointsAtom.cidade,
                complemento: collectionPointsAtom.complemento,
                logradouro: collectionPointsAtom.logradouro,
                numero: collectionPointsAtom.numero,
                dataDisponivel: collectionPointsAtom.dataDisponivel,
                idOng: idOng
            })
        }
    }

    const handleClickBack = () => {
        if (size > 0) {
            setSize(size - 1);
        } else {
            navigate('/pontos-de-coleta/criar-ponto-de-coleta');
        }
    }

    const handleClickNext = () => {
        if (size === 1) {
            handleUpsertCollectionPoints()
        } else if (size === 2) {
            navigate('/pontos-de-coleta')
        } else {
            setSize(size + 1)
        }
    }

    const handleDisable = () => {
        if (size === 0) {
            return collectionPointsAtom.nome === '' || collectionPointsAtom.descricao === '' || collectionPointsAtom.urlBanner === null
        } else {
            return collectionPointsAtom.cep === null || collectionPointsAtom.bairro === null ||
                collectionPointsAtom.cidade === null || collectionPointsAtom.complemento === null ||
                collectionPointsAtom.logradouro === null || collectionPointsAtom.numero === null
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
                    {size === 0 && <CollectionPointsFormOne />}
                    {size === 1 && <CollectionPointsFormTwo />}
                    {size === 2 && <UpsertCollectionPointSuccess />}
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