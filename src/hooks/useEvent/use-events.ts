import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { Pagination } from '../../../client/pagination'

export function useEvents(query: Pagination) {
  const client = useClient()

  return useQuery({
    queryKey: ['events'],
    queryFn: ({ signal }) => client.events.getEvents(query, signal)
  })
}