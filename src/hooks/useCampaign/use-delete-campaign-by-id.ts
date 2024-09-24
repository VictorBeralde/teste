import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'

export function useDeleteCampaignById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => await client.campaigns.deleteCampaignById(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['campaignsByOngId'] })
        enqueueSnackbar('Campanha deletada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao deletar campanha', { variant: 'error' })
    }
  })
}
