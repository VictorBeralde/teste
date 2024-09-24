import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useMonthly (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['ongsById', id],
    queryFn: ({ signal }) => client.ongs.getMonthly(id, signal)
  })
}