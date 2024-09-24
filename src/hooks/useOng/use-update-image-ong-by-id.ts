import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'

export function useUpdateImageOngById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: File) => await client.ongs.updateImageOng(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ongsById'] })
        enqueueSnackbar('Foto atualizada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar Foto', { variant: 'error' })
    }
  })
}
