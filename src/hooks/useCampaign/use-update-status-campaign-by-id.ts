import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpdateStatusCommand } from '../../../client/campanha-client/types'

export function useUpdateStatusCampaignById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateStatusCommand) => client.campaigns.updateStatusCampaignById(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['campaignsByOngId'] }),
        queryClient.invalidateQueries({ queryKey: ['campaigns'] }),
        enqueueSnackbar('Status atualizado com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar status da doação', { variant: 'error' })
    }
  })
}
