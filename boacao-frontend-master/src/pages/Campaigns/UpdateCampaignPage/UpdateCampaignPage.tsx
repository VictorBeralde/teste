import { useParams } from "react-router-dom"
import { useCampaignById } from "../../../hooks/useCampaign/use-campaign-by-id"
import { UpsertCampaignForm } from "../components/UpsertCampaignForm/UpsertCampaignForm"
import { CircularProgress, Grid, Typography } from "@mui/material"

export function UpdateCampaignPage () {
    const { campaignId } = useParams<{ campaignId: string }>()
    const { data, isLoading: isLoadingCampaign, isError: isErrorCampaign } = useCampaignById(campaignId || '')



    return (
        <>
            {isLoadingCampaign && 
                <Grid
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                > 
                    <CircularProgress /> 
                </Grid>}
            {isErrorCampaign && <Typography>Erro ao buscar campanha</Typography>}
            {!isLoadingCampaign && !isErrorCampaign && data && (
                <UpsertCampaignForm 
                    variant='update' 
                    campaign={data}
                />
            )}
        </>
    )
}