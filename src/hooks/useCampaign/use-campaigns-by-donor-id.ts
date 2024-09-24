import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useCampaignsByDonorId (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['campaignsByDonorId', id],
    queryFn: ({ signal }) => client.campaigns.getCampaignsByDonorId(id, signal)
  })
}