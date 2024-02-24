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
import GroupsIcon from '@mui/icons-material/Groups';

import { Profile } from "../screens/Profile"
import { Payment } from "../screens/Payments"
import { useAuth } from "../context/AuthContext"
import { ChangePaymentMethod } from "../screens/ChangePaymentMethod"
import { Dependents } from "../screens/Dependents"
import { DashBoard } from "../screens/DashBoard"

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
        id: 1,
        icon: HouseIcon,
        path: "/",
        label: "Página inicial",
        disabled: !(user?.user.tipo === "T" || user?.user.tipo === "S" || user?.user.tipo === "A")
      },
      {
        id: 2,
        icon: WorkHistoryIcon,
        path: "/signature",
        label: "Assinatura",
        disabled: !(user?.user.tipo === "T" || user?.user.tipo === "A")
      },
      {
        id: 3,
        icon: TimelineIcon,
        path: "/payment",
        label: "Hist. Pagamentos",
        disabled: !(user?.user.tipo === "T" || user?.user.tipo === "A")
      },
      {
        id: 4,
        icon: GroupsIcon,
        path: "/dependents",
        label: "Dependentes",
        disabled: !(user?.user.tipo === "T" || user?.user.tipo === "A")
      },
      {
        id: 5,
        icon: GroupsIcon,
        path: "/dashboard",
        label: "DashBoard",
        disabled: !(user?.user.tipo === "T" || user?.user.tipo === "A")
      }
    ]);    

    if (user) {
      if (user.user.ativo !== 1) return handleNavigate()
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signature" element={<Signature />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/change-payment-method" element={<ChangePaymentMethod />} />
        <Route path="/dependents" element={<Dependents />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>

      {/* Rota para redirecionar para a página principal quando a rota não existir */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  )
}
