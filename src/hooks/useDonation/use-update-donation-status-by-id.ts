import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpdateDonationStatusByIdCommand } from '../../../client/minhas-doacoes-client/types'

export function useUpdateDonationStatusById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateDonationStatusByIdCommand) => client.donations.updateDonationStatusById(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['donationsByOngId'] }),
        queryClient.invalidateQueries({ queryKey: ['donationsByDonorId'] }),
        enqueueSnackbar('Status atualizado com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar status da doação', { variant: 'error' })
    }
  })
}
