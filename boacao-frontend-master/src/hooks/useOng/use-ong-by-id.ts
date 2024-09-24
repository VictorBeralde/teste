import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { OngQuery } from '../../../client/ong-client/types'

export function useOngById (id: string, query?: OngQuery) {
  const client = useClient()

  return useQuery({
    queryKey: ['ongsById', id, query],
    queryFn: ({ signal }) => client.ongs.getOngById(id, query, signal)
  })
}