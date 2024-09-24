import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { NearOngsQuery } from '../../../client/ong-client/types'

export function useNearOngs (cep: string, distance: string, query: NearOngsQuery, submit: boolean) {
  const client = useClient()

  return useQuery({
    queryKey: ['nearOngs', query],
    queryFn: ({ signal }) => client.ongs.getNearOngs(cep, distance, query, signal),
    enabled: query.idDoador !== '' && submit == true
  })
}