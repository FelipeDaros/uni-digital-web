import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "./styled"
import { AuthContextProvider } from "./context/AuthContext"

import { DrawerProvider } from "./context/DrawerContext"
import { ToastContextProvider } from "./context/ToastContext"
import { AppRouter } from "./routes/Router"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./screens/Login"
import { ForgoutPassword } from "./screens/Login/ForgoutPassword"
import { SendForgout } from "./screens/Login/SendForgout"
import { FormRegisterClient } from "./screens/FormRegisterClient"
import { FeedBackScreen } from "./screens/FormRegisterClient/FeedBackScreen"
import { NewPassword } from "./screens/Login/NewPassword"
import { AwaitingPayment } from "./screens/FormRegisterClient/AwaitingPayment"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        {/* @ts-ignore */}
        <DrawerProvider>
          {/* @ts-ignore */}
          <ToastContextProvider>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forgout" element={<ForgoutPassword />} />
                <Route path="/send-forgout" element={<SendForgout />} />
                <Route path="/register/:id" element={<FormRegisterClient />} />
                <Route path="/concluded" element={<FeedBackScreen />} />
                <Route path="/confirm-password/:id" element={<NewPassword />} />

                <Route path="/awaiting-payment/:type" element={<AwaitingPayment />} />

                {/* Rota para redirecionar para a página principal quando a rota não existir */}
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
              </Routes>
            </BrowserRouter>
          </ToastContextProvider>
        </DrawerProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
