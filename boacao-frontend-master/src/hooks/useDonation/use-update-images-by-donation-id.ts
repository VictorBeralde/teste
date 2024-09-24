import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateImagesDonationsByIdCommand } from '../../../client/minhas-doacoes-client/types'

export function useUpdateImagesByDonationId() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateImagesDonationsByIdCommand) => client.donations.putDonationImages(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['donationsByDonorId'] })
    },
    onError: () => {
        enqueueSnackbar('Erro ao enviar imagens da doação', { variant: 'error' })
    }
  })
}
