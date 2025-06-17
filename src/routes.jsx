import {Login} from "./components/setting/Login" 
import { DashboardPage } from "./pages/Dashboard";
import { Register } from "./components/setting/Register";
import {CuentaPage} from './pages/Cuenta/CuentasPage'
import { UserPage } from "./pages/User";
import { PrivateRoute } from "./components/setting/PrivateRoute";
import { BillPage } from "./pages/Bill/BillPage";

const routes = [
  { path: "/", element: <Login/> },           
  { path: "/dashboardPage", element: <PrivateRoute><DashboardPage/></PrivateRoute>}, 
  { path: "/register", element: <PrivateRoute><Register/></PrivateRoute> },
  { path: "/cuenta", element: <CuentaPage/>},
  { path: "/user", element: <PrivateRoute><UserPage/></PrivateRoute> },
  { path: "/bills", element: <BillPage/>}
]

export default routes