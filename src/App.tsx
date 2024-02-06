import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './styled'
import { AuthContextProvider } from './context/AuthContext'
import { Router } from './routes/Router'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <CssBaseline />
        <Router />
      </AuthContextProvider >
    </ThemeProvider>
  )
}

export default App
