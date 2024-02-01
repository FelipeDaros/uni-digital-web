import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './styled'
import { AuthContextProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { RouteRegisterNoAuth } from './routes/RouteRegisterNoAuth'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <RouteRegisterNoAuth />
        </BrowserRouter>
      </AuthContextProvider >
    </ThemeProvider>
  )
}

export default App
