import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateCampaignCommand } from '../../../client/campanha-client/types'

export function useCreateCampaign() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCampaignCommand) => client.campaigns.createCampaign(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['campaigns'] })
        enqueueSnackbar('Campanha criada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao criar campanha', { variant: 'error' })
    }
  })
}
