import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom"
import { FormRegisterClient } from "../screens/FormRegisterClient"
import { FeedBackScreen } from "../screens/FormRegisterClient/FeedBackScreen"
import { Login } from "../screens/Login"
import { ForgoutPassword } from "../screens/Login/ForgoutPassword"
import { SendForgout } from "../screens/Login/SendForgout"
import { NewPassword } from "../screens/Login/NewPassword"
import { AwaitingPayment } from "../screens/FormRegisterClient/AwaitingPayment"

export function RouteRegisterNoAuth() {
  return (
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
  )
}
