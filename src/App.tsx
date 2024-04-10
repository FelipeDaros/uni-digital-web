import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "./styled"
import { AuthContextProvider } from "./context/AuthContext"

import { DrawerProvider } from "./context/DrawerContext"
import { ToastContextProvider } from "./context/ToastContext"
import { AppRouter } from "./routes/Router"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        {/* @ts-ignore */}
        <DrawerProvider>
          {/* @ts-ignore */}
          <ToastContextProvider>
            <CssBaseline />
            <AppRouter />
          </ToastContextProvider>
        </DrawerProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
