import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { boaAcaoThemeOptions } from './theme/theme-options'
import { SnackbarProvider } from 'notistack'

const queryClient = new QueryClient()
const theme = createTheme(boaAcaoThemeOptions())

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <RouterProvider router={router} />
            </SnackbarProvider>
          </CssBaseline>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
