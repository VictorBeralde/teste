import { ApiClient } from '../../client/api-client/api-client'
import { createContext } from 'react'

export const ApiClientContext = createContext<ApiClient>(new ApiClient());
