import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './styled'
import { AuthContextProvider } from './context/AuthContext'
import { Router } from './routes/Router'
import { DrawerProvider } from './context/DrawerContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        {/* @ts-ignore */}
        <DrawerProvider>
          <CssBaseline />
          <Router />
        </DrawerProvider>
      </AuthContextProvider >
    </ThemeProvider>
  )
}

export default App
