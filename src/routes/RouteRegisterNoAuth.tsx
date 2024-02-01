import { Route, Routes } from "react-router-dom";
import { FormRegisterClient } from "../screens/FormRegisterClient";


export function RouteRegisterNoAuth() {
  return (
    <Routes>
      <Route path="/" element={<FormRegisterClient />} />
    </Routes>
  )
}
