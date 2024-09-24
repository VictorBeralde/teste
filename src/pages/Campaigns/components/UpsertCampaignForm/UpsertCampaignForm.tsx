import { Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { HiArrowLeft } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { SliderProgress } from "../../../../components/SliderProgress"
import { UpsertCampaignSuccess } from "../UpsertCampaignSuccess/UpsertCampaignSuccess"
import { CampaignFormOne } from "../CampaignFormOne"
import { CampaignFormTwo } from "../CampaignFormTwo"
import { CampaignFormThree } from "../CampaignFormThree"
import { useAtom } from "jotai"
import { upsertCampaignAtom } from "../../../../atoms/upsert-campaign-atom"
import { useCreateCampaign } from "../../../../hooks/useCampaign/use-create-campaign"
import { CampanhaResult } from "../../../../../client/campanha-client/types"
import { useUpdateImageByCampaignId } from "../../../../hooks/useCampaign/use-update-image-by-campaign-id"

export type UpsertEventType = {
    variant: 'create' | 'update'
    campaign?: CampanhaResult
}

export function UpsertCampaignForm(props: UpsertEventType) {
    const [campaignAtom, setCampaignAtom] = useAtom(upsertCampaignAtom)
    const { variant, campaign } = props
    const fkOng = sessionStorage.getItem('userType')
    const [formSize] = useState<number[]>([0, 1, 2])
    const [size, setSize] = useState<number>(0)
    const navigate = useNavigate()
    const { mutateAsync: createCampaign } = useCreateCampaign()
    const { mutateAsync: updateCampaign } = useUpdateImageByCampaignId()

    useEffect(() => {
        if (variant === 'create') {
            setSize(0)
            setCampaignAtom({
                dataDeFim: new Date(),
                dataDeInicio: new Date(),
                descricao: '',
                disponibilidadeDeBusca: false,
                fkOng: fkOng || '',
                fkProduto: [],
                nome: '',
                status: '',
                urlBanner: null || '',
                distance: 0
            })
        } else if (variant === 'update') {
            setSize(0)
            setCampaignAtom({
                dataDeFim: campaign?.dataFim || new Date(),
                dataDeInicio: campaign?.dataInicio || new Date(),
                descricao: campaign?.descricao || '',
                disponibilidadeDeBusca: campaign?.disponibilidadeBusca || false,
                fkOng: campaign?.ong.id || '',
                fkProduto: campaign?.produtos || [],
                nome: campaign?.nome || '',
                status: '',
                urlBanner: campaign?.urlImagem || '', 
                distance: campaign?.raioDeBusca || 0
            })
        }
    }, [])

    const handleClickBack = () => {
        if (size > 0) {
            setSize(size - 1);
        } else {
            navigate(`/campanhas`);
        }
    }

    const handleClickNext = () => {
        if (size === 2) {
            handleUpsertEvent()
        } else if (size === 3) {
            navigate('/campanhas')
        } else {
            setSize(size + 1)
        }
    }

    const handleUpsertEvent = async () => {
        if (variant === 'create') {
            try {
                const result = await createCampaign({
                    nome: campaignAtom.nome,
                    descricao: campaignAtom.descricao,
                    idProdutos: campaignAtom.fkProduto.map((product) => product.idProduto),
                    dtInicio: campaignAtom.dataDeInicio,
                    dtFim: campaignAtom.dataDeFim,
                    idOng: fkOng || '',
                    disponibilidadeDeBusca: campaignAtom.disponibilidadeDeBusca,
                    raioDeBusca: campaignAtom.distance
                })

                const urlBanner = campaignAtom.urlBanner || '';
                let file;
                if (urlBanner) {
                    const response = await fetch(urlBanner);
                    const blob = await response.blob();
                    const fileName = urlBanner.split('/').pop() || 'banner.jpg';
                    file = new File([blob], fileName, { type: blob.type });
                }

                if (file) {
                    await updateCampaign({
                        id: `${result.id}`,
                        file: file || null
                    });
                }

                setSize(size + 1)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleDisable = () => {
        if (size === 0) {
            return campaignAtom.nome === '' || campaignAtom.descricao === '' || campaignAtom.nome === null || campaignAtom.descricao === null
        } else if (size === 1) {
            return campaignAtom.fkProduto.length === 0 || campaignAtom.dataDeFim === null
        } else {
            return campaignAtom.disponibilidadeDeBusca && campaignAtom.distance && campaignAtom.distance > 0 ? false : !campaignAtom.disponibilidadeDeBusca ? false : true
        }
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} padding={5}>
                    {size < 3 &&
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
                    {size === 0 && <CampaignFormOne />}
                    {size === 1 && <CampaignFormTwo />}
                    {size === 2 && <CampaignFormThree /> }
                    {size === 3 && <UpsertCampaignSuccess /> }
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {size === 3 &&
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
                            mt: size < 3 ? 5 : 2
                        }}
                        variant="contained"
                        onClick={handleClickNext}
                        disabled={handleDisable()}
                    >
                        {size === 3 ? 'Campanhas' : size === 2 ? 'Finalizar' : 'Continuar'}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}