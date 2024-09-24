import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpdateOngCommand } from '../../../client/ong-client/types'

export function useUpdateOngById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateOngCommand) => await client.ongs.updateOngById(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ongsById'] })
        enqueueSnackbar('Ong atualizada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar ong', { variant: 'error' })
    }
  })
}
