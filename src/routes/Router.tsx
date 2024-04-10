import { BrowserRouter as Router } from "react-router-dom";
import { RouteRegisterNoAuth } from "./RoutesNoAuth";
import { useAuth } from "../context/AuthContext";
import { RoutesAuth } from "./RoutesAuth";

export function AppRouter() {
  const { user } = useAuth();

  return (
    <Router>
      {!user ? <RouteRegisterNoAuth /> : <RoutesAuth />}
    </Router>
  );
}
