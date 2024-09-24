import { useQuery } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { ValidateEmail } from '../../../client/login-client/types'

export function useValidateEmail (query: ValidateEmail, send?: boolean) {
  const client = useClient()

  return useQuery({
    queryKey: ['validateEmail', query],
    queryFn: ({ signal }) => client.login.validateEmail(query, signal),
    enabled: query.email !== '' && send
  })
}