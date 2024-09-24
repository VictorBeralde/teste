import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateEventCommand } from '../../../client/evento-client/types'

export function useCreateEvent() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateEventCommand) => client.events.createEvent(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['events'] })
        enqueueSnackbar('Evento criado com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao criar evento', { variant: 'error' })
    }
  })
}
