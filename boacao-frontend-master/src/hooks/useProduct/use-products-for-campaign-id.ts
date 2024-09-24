import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useProductsForCampaignId (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['productsForCampaignId'],
    queryFn: ({ signal }) => client.products.getProductsForCampaignId(id, signal)
  })
}