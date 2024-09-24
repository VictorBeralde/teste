import { useMutation } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateOngCommand } from '../../../client/ong-client/types'
import { useNavigate } from 'react-router-dom'

export function useCreateOng() {
  const client = useClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (command: CreateOngCommand) => await client.ongs.createOng(command),
    onSuccess: () => {
      enqueueSnackbar('Ong criada com sucesso', { variant: 'success' })
      navigate('/login')
    },
    onError: () => {
      enqueueSnackbar('Erro ao criar ong', { variant: 'error' })
    }
  })
}
