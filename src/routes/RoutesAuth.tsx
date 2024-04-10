import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  HashRouter
} from "react-router-dom"
import { DefaultLayout } from "../layout/DefaultLayout"
import { Home } from "../screens/Home"
import { Signature } from "../screens/Signature"
import { useDrawerContext } from "../context/DrawerContext"
import { useEffect } from "react"

import HouseIcon from "@mui/icons-material/House"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import TimelineIcon from "@mui/icons-material/Timeline"
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import GroupsIcon from '@mui/icons-material/Groups';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { Profile } from "../screens/Profile"
import { Payment } from "../screens/Payments"
import { useAuth } from "../context/AuthContext"
import { ChangePaymentMethod } from "../screens/ChangePaymentMethod"
import { Dependents } from "../screens/Dependents"
import { DashBoard } from "../screens/DashBoard"
import { Cupom } from "../screens/Cupom"
import { RegisterCupom } from "../screens/Cupom/RegisterCupom"
import { Policies } from "../screens/Policies"
import { RegisterPolicy } from "../screens/Policies/RegisterPolicy"
import { Administers } from "../screens/Administers"
import { RegisterAdminister } from "../screens/Administers/RegisterPolicy"
import { Products } from "../screens/Product"
import { RegisterProduct } from "../screens/Product/RegisterProduct"
import { Permissions } from "../screens/Permissions"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { RegisterPermission } from "../screens/Permissions/RegisterPermission"
import { UsersPermissions } from "../screens/Permissions/UsersPermissions"
import { CreditCard } from "../screens/CreditCard"
import { RegisterCreditCard } from "../screens/CreditCard/RegisterCreditCard"
import { HandleSignature } from "../screens/Signature/HandleSignature"
import { Holders } from "../screens/Holders"
import { ProfileUser } from "../screens/Holders/ProfileUser"
import { StorePermissions } from "../store/StorePermissions"
import { Conciliation } from "../screens/Conciliation"




export function RoutesAuth() {
  const [permissions] = StorePermissions((state) => [state.permissions]);

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
        path: "/home",
        label: "Página inicial",
        disabled: !(user?.user.tipo === "T" || user?.user.tipo === "S" || user?.user.tipo === "A")
      },
      {
        id: 2,
        icon: WorkHistoryIcon,
        path: `/signature/${user.user.id}`,
        label: "Assinatura",
        disabled: !(user?.user.tipo === "T") || !permissions?.assinatura?.find(item => item.tipo === "VISUALIZAR")
      },
      {
        id: 3,
        icon: CreditCardIcon,
        path: "/credit-card",
        label: "Cartão de crédito",
        disabled: !(user?.user.tipo === "T") || !permissions?.cartaoCredito?.find(item => item.tipo === "VISUALIZAR")
      },
      {
        id: 4,
        icon: TimelineIcon,
        path: "/payment",
        label: "Hist. Pagamentos",
        disabled: !(user?.user.tipo === "T") || !permissions?.hisotricoPagamentos?.find(item => item.tipo === "VISUALIZAR")
      },
      {
        id: 5,
        icon: GroupsIcon,
        path: "/dependents",
        label: "Dependentes",
        disabled: !(user?.user.tipo === "T" || user?.user.tipo === "A") || !permissions?.dependentes?.find(item => item.tipo === "VISUALIZAR")
      },
      {
        id: 6,
        icon: DonutSmallIcon,
        path: "/dashboard",
        label: "DashBoard",
        disabled: !(user?.user.tipo === "A")
      },
      {
        id: 7,
        icon: ConfirmationNumberIcon,
        path: "/cupom",
        label: "Cupom",
        disabled: !(user?.user.tipo === "A")
      },
      {
        id: 8,
        icon: ProductionQuantityLimitsIcon,
        path: "/products",
        label: "Produtos",
        disabled: !(user?.user.tipo === "A")
      },
      {
        id: 9,
        icon: NewspaperIcon,
        path: "/policies",
        label: "Políticas",
        disabled: !(user?.user.tipo === "A")
      },
      {
        id: 10,
        icon: SupervisorAccountIcon,
        path: "/administers",
        label: "Administradores",
        disabled: !(user?.user.tipo === "A")
      },
      {
        id: 11,
        icon: VpnKeyIcon,
        path: "/permissions",
        label: "Permissões",
        disabled: !(user?.user.tipo === "A")
      },
      {
        id: 12,
        icon: RequestQuoteIcon,
        path: "/holders",
        label: "Titulares",
        disabled: !(user?.user.tipo === "A")
      },
      {
        id: 13,
        icon: SummarizeIcon,
        path: "/conciliation",
        label: "Conciliação",
        disabled: !(user?.user.tipo === "A")
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
        
        <Route path="/payment" element={<Payment />} />
        <Route path="/change-payment-method/:id" element={<ChangePaymentMethod />} />
        <Route path="/dependents" element={<Dependents />} />
        <Route path="/dashboard" element={<DashBoard />} />

        <Route path="/cupom" element={<Cupom />} />
        <Route path="/register-cupom" element={<RegisterCupom />} />
        <Route path="/register-cupom/:codigo" element={<RegisterCupom />} />

        <Route path="/policies" element={<Policies />} />
        <Route path="/register-policy" element={<RegisterPolicy />} />
        <Route path="/register-policy/:id" element={<RegisterPolicy />} />

        <Route path="/administers" element={<Administers />} />
        <Route path="/register-administer" element={<RegisterAdminister />} />

        <Route path="/products" element={<Products />} />
        <Route path="/register-product" element={<RegisterProduct />} />
        <Route path="/register-product/:id" element={<RegisterProduct />} />

        <Route path="/permissions" element={<Permissions />} />
        <Route path="/register-permission" element={<RegisterPermission />} />
        <Route path="/register-permission/:id" element={<RegisterPermission />} />
        <Route path="/permissions-users" element={<UsersPermissions />} />

        <Route path="/credit-card" element={<CreditCard />} />
        <Route path="/register-credit-card" element={<RegisterCreditCard />} />

        <Route path="/signature/:id" element={<Signature />} />
        <Route path="/handle-signature/:id" element={<HandleSignature />} />

        <Route path="/holders" element={<Holders />} />
        <Route path="/holder/:id" element={<ProfileUser />} />

        <Route path="/conciliation" element={<Conciliation />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
