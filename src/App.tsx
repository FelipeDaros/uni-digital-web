import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './styled'
import { AuthContextProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/Router'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
        <CssBaseline />
          <Router />
        </BrowserRouter>
      </AuthContextProvider >
    </ThemeProvider>
  )
}

export default App
