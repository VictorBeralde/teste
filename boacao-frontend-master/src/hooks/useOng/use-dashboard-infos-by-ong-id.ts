import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useDashoboardInforByOngId (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['dashboardInfosByOngId', id],
    queryFn: ({ signal }) => client.ongs.getDashboardInfosByOngId(id, signal)
  })
}