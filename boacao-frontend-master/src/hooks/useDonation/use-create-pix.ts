import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateDonationPixCommand } from '../../../client/minhas-doacoes-client/types'

export function useCreateDonationPix() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateDonationPixCommand) => client.donations.createDonationPix(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
        enqueueSnackbar('Comprovante enviado com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao enviar comprovante', { variant: 'error' })
    }
  })
}
