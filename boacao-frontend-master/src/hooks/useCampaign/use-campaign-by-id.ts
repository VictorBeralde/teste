import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useCampaignById (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['campaignById', id],
    queryFn: ({ signal }) => client.campaigns.getCampaignById(id, signal)
  })
}