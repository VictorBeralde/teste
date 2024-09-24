import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { GetDonationsByOngIdQuery } from '../../../client/minhas-doacoes-client/types'

export function useDonationsByOngId (id: string, params: GetDonationsByOngIdQuery) {
  const client = useClient()

  return useQuery({
    queryKey: ['donationsByOngId', id, params],
    queryFn: ({ signal }) => client.donations.getDonationsByOngId(id, params, signal)
  })
}