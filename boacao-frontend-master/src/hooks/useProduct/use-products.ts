import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useProducts () {
  const client = useClient()

  return useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => client.products.getProducts(signal)
  })
}