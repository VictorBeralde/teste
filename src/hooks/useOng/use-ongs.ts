import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useOngs () {
  const client = useClient()

  return useQuery({
    queryKey: ['ongs'],
    queryFn: ({ signal }) => client.ongs.getOngs(signal)
  })
}