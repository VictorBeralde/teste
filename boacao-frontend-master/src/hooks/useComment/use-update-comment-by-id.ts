import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpdateCommentCommand } from '../../../client/comentario-client/types'

export function useUdateCommentById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateCommentCommand) => await client.comments.patchComment(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
        enqueueSnackbar('Comentário atualizado com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar comentário', { variant: 'error' })
    }
  })
}
