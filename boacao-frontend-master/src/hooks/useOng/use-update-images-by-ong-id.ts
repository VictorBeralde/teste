import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateImagesDonationsByIdCommand } from '../../../client/minhas-doacoes-client/types'

export function useUpdateImagesByOngId() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateImagesDonationsByIdCommand) => client.ongs.updateImagesOng(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ongsById'] })
    },
    onError: () => {
        enqueueSnackbar('Erro ao enviar imagens da ong', { variant: 'error' })
    }
  })
}
