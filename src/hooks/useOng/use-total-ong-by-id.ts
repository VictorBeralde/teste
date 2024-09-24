import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useTotal (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['ongsById', id],
    queryFn: ({ signal }) => client.ongs.getTotal(id, signal)
  })
}