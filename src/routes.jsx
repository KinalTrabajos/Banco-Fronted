import {Login} from "./components/setting/Login" 
import { DashboardPage } from "./pages/Dashboard";
import { Register } from "./components/setting/Register";
import { UserPage } from "./pages/User";
import { ShoppingPage } from "./pages/Shopping";
import {CuentaPage} from './pages/Cuenta/CuentasPage'
import { BillPage } from "./pages/Bill/BillPage";
import {TransfersPage} from "./pages/Transfers"
import {Favorites} from "./pages/favorite"
import { AccountRequestsPage } from "./pages/AccountRequests/AccountRequestsPage";

import { PrivateRoute } from "./components/setting/PrivateRoute";

const routes = [
  { path: "/", element: <Login/> },           
  { path: "/dashboardPage", element: <PrivateRoute><DashboardPage/></PrivateRoute>}, 
  { path: "/register", element: <Register/> },
  { path: "/compras", element: <PrivateRoute><ShoppingPage/></PrivateRoute> },
  { path: "/cuenta", element: <CuentaPage/>},
  { path: "/user", element: <PrivateRoute><UserPage/></PrivateRoute> },
  { path: "/bills", element: <BillPage/>},
  { path: "/tranferencia", element: <PrivateRoute><TransfersPage/></PrivateRoute>},
  { path: "/favorito", element: <PrivateRoute><Favorites/></PrivateRoute>},
  { path: "/requests", element: <PrivateRoute><AccountRequestsPage/></PrivateRoute>}
]

export default routes