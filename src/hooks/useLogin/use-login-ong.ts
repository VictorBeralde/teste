import { useMutation } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { LoginCommand, LoginOngResult } from '../../../client/login-client/types'
import { useNavigate } from 'react-router-dom'
import { useToken } from '../../components/TokenManager'

export function useLoginOng() {
  const client = useClient()
  const [, setToken] = useToken()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: LoginCommand) => await client.login.loginOng(data),
    onSuccess: (result: LoginOngResult) => {
      const token = result.access_token
      setToken(token, new Date(result.expires_in), result.idOng, 'ONG')
      enqueueSnackbar('Login feito com sucesso', { variant: 'success' })
      navigate('/triagem')
    },
    onError: () => {
      enqueueSnackbar('Erro ao fazer login', { variant: 'error' })
    }
  })
}
