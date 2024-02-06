import { BrowserRouter } from "react-router-dom";
import { RouteRegisterNoAuth } from "./RoutesNoAuth";
import { useAuth } from "../context/AuthContext";
import { RoutesAuth } from "./RoutesAuth";


export function Router() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      {user ? <RouteRegisterNoAuth /> : <RoutesAuth />}
    </BrowserRouter>
  )
}
