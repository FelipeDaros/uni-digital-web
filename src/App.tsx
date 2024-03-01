import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "./styled"
import { AuthContextProvider } from "./context/AuthContext"
import { Router } from "./routes/Router"
import { DrawerProvider } from "./context/DrawerContext"
import { useToast } from "./components/Toast"
import { ToastContextProvider } from "./context/ToastContext"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        {/* @ts-ignore */}
        <DrawerProvider>
          {/* @ts-ignore */}
          <ToastContextProvider>
            <CssBaseline />
            <Router />
          </ToastContextProvider>
        </DrawerProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
