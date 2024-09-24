import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useDonationsById (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['donationsById', id],
    queryFn: ({ signal }) => client.donations.getDonationsById(id, signal)
  })
}