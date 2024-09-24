import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { CollectionPointsQuery } from '../../../client/collection-points-client/types'

export function useCollectionPointsPage (idOng: string, query: CollectionPointsQuery) {
  const client = useClient()

  return useQuery({
    queryKey: ['collectionPointsPage', idOng, query],
    queryFn: ({ signal }) => client.collectionPoints.getCollectionPointsPage(idOng, query, signal)
  })
}