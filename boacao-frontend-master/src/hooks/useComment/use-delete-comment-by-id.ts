import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'

export function useDeleteCommentById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => await client.comments.deleteComment(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
        enqueueSnackbar('Comentário deletado com sucesso!', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao deletar comentário!', { variant: 'error' })
    }
  })
}
