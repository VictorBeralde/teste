import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreatePixCommand } from '../../../client/ong-client/types'

export function useCreatePix(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: CreatePixCommand) => await client.ongs.createPix(id, params),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ongsById'] })
        queryClient.invalidateQueries({ queryKey: ['ongs'] })
        enqueueSnackbar('Pix criado com sucesso', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Erro ao criar pix', { variant: 'error' })
    }
  })
}
