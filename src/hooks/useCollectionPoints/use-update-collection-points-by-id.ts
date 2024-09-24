import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { CreateCollectionPointCommand, UpdateCollectionPointsById } from '../../../client/collection-points-client/types'

export type useUpdateCollectionPointByIdProps = {
  setSize: (size: number) => void
  size: number
  id: string
}

export function useUpdateCollectionPointById(props: useUpdateCollectionPointByIdProps) {
  const { setSize, size, id } = props
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateCollectionPointsById) => client.collectionPoints.updateCollectionPointsById(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['collectionPointsPage'] })
        enqueueSnackbar('Ponto de coleta editado com sucesso', { variant: 'success' })
        setSize(size + 1)
    },
    onError: () => {
        enqueueSnackbar('Erro ao editar ponto de coleta', { variant: 'error' })
    }
  })
}
