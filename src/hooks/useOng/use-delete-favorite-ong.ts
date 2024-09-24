import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpsertFavoriteOngCommand } from '../../../client/ong-client/types'

export function useDeleteFavoriteOng() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: UpsertFavoriteOngCommand) => await client.ongs.deleteFavoriteOng(params),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['nearOngs'] })
        queryClient.invalidateQueries({ queryKey: ['ongsById'] })
        enqueueSnackbar('Ong desfavoritada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao desfavoritar ong', { variant: 'error' })
    }
  })
}
