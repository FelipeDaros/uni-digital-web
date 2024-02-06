import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Home } from "../screens/Home";

export function RoutesAuth() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Rota para redirecionar para a página principal quando a rota não existir */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

