import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { DefaultLayout } from "../layout/DefaultLayout"
import { Home } from "../screens/Home"
import { Signature } from "../screens/Signature"
import { useDrawerContext } from "../context/DrawerContext"
import { useEffect } from "react"

import HouseIcon from "@mui/icons-material/House"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import TimelineIcon from "@mui/icons-material/Timeline"

import { Profile } from "../screens/Profile"
import { Payment } from "../screens/Payments"
import { useAuth } from "../context/AuthContext"
import { ChangePaymentMethod } from "../screens/ChangePaymentMethod"

export function RoutesAuth() {
  const { user } = useAuth()
  const { setDrawerOptions } = useDrawerContext()
  const location = useLocation()
  const navigation = useNavigate()

  function handleNavigate() {
    navigation("/payment")
  }

  useEffect(() => {
    setDrawerOptions([
      {
        icon: HouseIcon,
        path: "/",
        label: "Página inicial",
      },
      {
        icon: WorkHistoryIcon,
        path: "/signature",
        label: "Assinatura",
      },
      {
        icon: TimelineIcon,
        path: "/payment",
        label: "Hist. Pagamentos",
      },
    ])

    if (user) {
      if (user.defaulterSignature) return handleNavigate()
    }
  }, [location])

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signature" element={<Signature />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/change-payment-method" element={<ChangePaymentMethod />} />
      </Route>

      {/* Rota para redirecionar para a página principal quando a rota não existir */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
