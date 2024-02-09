import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Home } from "../screens/Home";
import { Signature } from "../screens/Signature";
import { useDrawerContext } from "../context/DrawerContext";
import { useEffect } from "react";

import HouseIcon from '@mui/icons-material/House';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { Profile } from "../screens/Profile";

export function RoutesAuth() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: HouseIcon,
        path: '/',
        label: 'Página inicial',
      },
      {
        icon: WorkHistoryIcon,
        path: '/signature',
        label: 'Assinatura',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signature" element={<Signature />} />
      </Route>

      {/* Rota para redirecionar para a página principal quando a rota não existir */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

