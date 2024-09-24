import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpsertFavoriteOngCommand } from '../../../client/ong-client/types'

export function useCreateFavoriteOng() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: UpsertFavoriteOngCommand) => await client.ongs.createFavoriteOng(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nearOngs'] })
      queryClient.invalidateQueries({ queryKey: ['ongsById'] })
      enqueueSnackbar('Ong favoritada com sucesso', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Erro ao favoritar ong', { variant: 'error' })
    }
  })
}
