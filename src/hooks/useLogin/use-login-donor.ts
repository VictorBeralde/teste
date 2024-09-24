import { useMutation } from '@tanstack/react-query'
import { useClient } from '../use-client'
import { enqueueSnackbar } from 'notistack'
import { LoginCommand, LoginDonorResult } from '../../../client/login-client/types'
import { useNavigate } from 'react-router-dom'
import { useToken } from '../../components/TokenManager'

export function useLoginDonor() {
  const client = useClient()
  const [, setToken] = useToken()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: LoginCommand) => await client.login.loginDonor(data),
    onSuccess: (result: LoginDonorResult) => {
      const token = result.access_token
      setToken(token, new Date(result.expires_in), result.idDoador, 'DONOR')
      enqueueSnackbar('Login feito com sucesso', { variant: 'success' })
      navigate('/home')
    },
    onError: () => {
      enqueueSnackbar('Erro ao fazer login', { variant: 'error' })
    }
  })
}
