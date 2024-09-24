import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { CampaignQuery } from '../../../client/campanha-client/types'

export function useCampaigns (query: CampaignQuery) {
  const client = useClient()

  return useQuery({
    queryKey: ['campaigns', query],
    queryFn: ({ signal }) => client.campaigns.getCampaigns(query, signal)
  })
}