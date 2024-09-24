import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'

export function useCommentsByOngId (id: string) {
  const client = useClient()

  return useQuery({
    queryKey: ['comments'],
    queryFn: ({ signal }) => client.comments.getCommentsByOngId(id, signal)
  })
}