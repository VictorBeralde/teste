import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useDonationsByDonorId (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['donationsByDonorId', id],
    queryFn: ({ signal }) => client.donations.getDonationsByDonorId(id, signal)
  })
}