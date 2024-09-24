import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useDashboardInfos (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['dashboard-infos'],
    queryFn: async ({ signal }) => await client.campaigns.getDashboardInfos(id, signal)
  })
}