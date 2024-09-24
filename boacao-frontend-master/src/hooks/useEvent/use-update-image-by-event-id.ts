import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpdateImageByEventIdCommand } from '../../../client/evento-client/types'

export function useUpdateImageByEventId() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateImageByEventIdCommand) => client.events.putEventById(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Events'] })
        enqueueSnackbar('Imagem atualizada com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar imagem', { variant: 'error' })
    }
  })
}
