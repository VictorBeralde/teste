import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpdateImageDonorByDonorIdCommand } from '../../../client/doador-client/types'

export function useUpdateImageDonorByDonorId(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: string) => client.donors.updateImageDonor(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Donor'] })
        enqueueSnackbar('Imagem atualizada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar imagem', { variant: 'error' })
    }
  })
}
