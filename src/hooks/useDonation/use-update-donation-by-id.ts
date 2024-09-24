import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpdateDonationByIdCommand } from '../../../client/minhas-doacoes-client/types'

export function useUpdateDonationById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateDonationByIdCommand) => client.donations.updateDonationById(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['donationsByOngId'] }),
        queryClient.invalidateQueries({ queryKey: ['donationsByDonorId'] }),
        enqueueSnackbar('Doação atualizada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar doação', { variant: 'error' })
    }
  })
}
