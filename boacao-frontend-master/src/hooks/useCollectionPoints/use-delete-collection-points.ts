import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'

export function useDeleteCollectionPoints() {
    const client = useClient()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (idCollectionPoint: string) => await client.collectionPoints.deleteCollectionPointsById(idCollectionPoint),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collectionPointsPage'] })
            enqueueSnackbar('Ponto de coleta deletado com sucesso!', { variant: 'success' })
        },
        onError: () => {
            enqueueSnackbar('Erro ao deletar ponto de coleta!', { variant: 'error' })
        }
    })
}
