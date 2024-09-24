import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUpdateStatusCampaignById } from "../../../../hooks/useCampaign/use-update-status-campaign-by-id";

export type ModalActionsProps = {
    idCampaign: string
    status: string
}

export function ModalActions(props: ModalActionsProps) {
    const { idCampaign } = props
    const { mutateAsync: updateStatusCampaignById } = useUpdateStatusCampaignById(idCampaign)

    const hanldeUpdateStatus = async (status: string) => {
        await updateStatusCampaignById({ status: status })
    }

    const navigate = useNavigate()

    return (
        <>
            <Stack
                minHeight={'125px'}
            >
                <Button variant="text" onClick={() => navigate(`/campanhas/editar-campanha/${idCampaign}`)}>
                    <Typography
                        color={'black'}
                        variant="subtitle2"
                        fontWeight={'bold'}
                    >
                        Editar
                    </Typography>
                </Button>
                <Button variant="text" onClick={() => navigate(`/campanhas/${idCampaign}`)}>
                    <Typography
                        color={'black'}
                        variant="subtitle2"
                        fontWeight={'bold'}
                    >
                        Visualizar
                    </Typography>
                </Button>
                <Button 
                    variant="text"
                    onClick={() => hanldeUpdateStatus(props.status === "RODANDO" ? "PARALISADA" : "RODANDO")}
                >
                    <Typography
                        color={'black'}
                        variant="subtitle2"
                        fontWeight={'bold'}
                    >
                        {props.status === "RODANDO" ? "Desativar" : "Ativar"}
                    </Typography>
                </Button>
            </Stack>
        </>
    )
}