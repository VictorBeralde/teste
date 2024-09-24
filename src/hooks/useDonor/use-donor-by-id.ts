import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useDonor (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['Donor'],
    queryFn: ({ signal }) => client.donors.getDonorById(id, signal)
  })
}