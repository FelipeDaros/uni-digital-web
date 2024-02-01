import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { RouteRegisterNoAuth } from "./RouteRegisterNoAuth";


export function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* {user &&
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      }
      {
        !user && <Route path="/" element={<Login />} />
      } */}
    </Routes>
  )
}
