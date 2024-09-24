import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateComment } from '../../../client/comentario-client/types/create-comment'

export function useCreateComment() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateComment) => client.comments.createComment(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
        enqueueSnackbar('Comentário criado com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao criar comentário', { variant: 'error' })
    }
  })
}
