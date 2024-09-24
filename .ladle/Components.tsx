import type { GlobalProvider } from '@ladle/react'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../src/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export const Provider: GlobalProvider = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>
        <CssBaseline />
        {children}
    </MemoryRouter>
  </QueryClientProvider>
)