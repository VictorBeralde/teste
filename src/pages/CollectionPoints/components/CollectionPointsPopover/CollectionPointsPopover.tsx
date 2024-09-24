import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDeleteCollectionPoints } from "../../../../hooks/useCollectionPoints/use-delete-collection-points";

export type CollectionPointsPopoverProps = {
    idCollectionPoint: string
}

export function CollectionPointsPopover(ptops: CollectionPointsPopoverProps) {
    const { idCollectionPoint } = ptops
    const navigate = useNavigate()
    const { mutateAsync: deleteCollectionPoint } = useDeleteCollectionPoints()

    return (
        <>
            <Stack
                minHeight={'125px'}
            >
                <Button variant="text" onClick={() => navigate(`/pontos-de-coleta/editar-ponto-de-coleta/${idCollectionPoint}`)}>
                    <Typography
                        color={'black'}
                        variant="subtitle2"
                        fontWeight={'bold'}
                    >
                        Editar
                    </Typography>
                </Button>
                <Button
                    variant="text"
                    onClick={() => deleteCollectionPoint(idCollectionPoint)}
                >
                    <Typography
                        color={'black'}
                        variant="subtitle2"
                        fontWeight={'bold'}
                    >
                        Excluir
                    </Typography>
                </Button>
            </Stack>
        </>
    )
}