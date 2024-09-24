import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { CampaignQuery } from '../../../client/campanha-client/types'

export function useCampaignsByOngId (id: string, params: CampaignQuery) {
  const client = useClient()

  return useQuery({
    queryKey: ['campaignsByOngId', id, params],
    queryFn: ({ signal }) => client.campaigns.getCampaignsByOngId(id, params, signal)
  })
}