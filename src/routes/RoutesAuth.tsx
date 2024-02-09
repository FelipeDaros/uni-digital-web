import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Home } from "../screens/Home";
import { Signature } from "../screens/Signature";

export function RoutesAuth() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signature" element={<Signature />} />
      </Route>

      {/* Rota para redirecionar para a página principal quando a rota não existir */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

