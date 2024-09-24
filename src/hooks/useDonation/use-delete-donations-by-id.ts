import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'

export function useDeleteDonationsById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => await client.donations.deleteDonationsById(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['donationsByDonorId'] })
        queryClient.invalidateQueries({ queryKey: ['donationsByOngId'] })
        enqueueSnackbar('Doação deletada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao deletar doação', { variant: 'error' })
    }
  })
}
