import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { EventQuery } from '../../../client/evento-client/types'

export function useEventsByOngId(idOng: string, params: EventQuery) {
  const client = useClient()

  return useQuery({
    queryKey: ['eventsByOngId', idOng, params],
    queryFn: ({ signal }) => client.events.getEventsByOngId(idOng, params, signal)
  })
}