import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useFavoritesOngsByDonor (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['favoritesOngsByDonor', id],
    queryFn: ({ signal }) => client.ongs.getFavoritesOngsByDonor(id, signal)
  })
}