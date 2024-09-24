import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { UpdateDonorCommand } from '../../../client/doador-client/types/update-donor-command'

export function useUpdateDonorById(id: string) {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateDonorCommand) => client.donors.updateDonorById(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Donor'] })
        enqueueSnackbar('Perfil atualizado com sucesso', { variant: 'success' })
    },
    onError: () => {
        enqueueSnackbar('Erro ao atualizar perfil', { variant: 'error' })
    }
  })
}
