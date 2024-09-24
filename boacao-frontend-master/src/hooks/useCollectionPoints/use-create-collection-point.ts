import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateCollectionPointCommand } from '../../../client/collection-points-client/types'

export type useCreateCollectionPointProps = {
  setSize: (size: number) => void
  size: number
}

export function useCreateCollectionPoint(props: useCreateCollectionPointProps) {
  const { setSize, size } = props
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCollectionPointCommand) => client.collectionPoints.createCollectionPoint(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['collectionPointsPage'] })
        enqueueSnackbar('Ponto de coleta criado com sucesso', { variant: 'success' })
        setSize(size + 1)
    },
    onError: () => {
        enqueueSnackbar('Erro ao criar ponto de coleta', { variant: 'error' })
    }
  })
}
