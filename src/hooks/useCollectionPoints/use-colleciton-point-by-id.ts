import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useCollectionPointById (idCollectionPoint: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['collectionPointById', idCollectionPoint],
    queryFn: ({ signal }) => client.collectionPoints.getCollectionPointsById(idCollectionPoint, signal)
  })
}