import {Login} from "./components/setting/Login" 
import { DashboardPage } from "./pages/Dashboard";
import {Register} from "./components/setting/Register";
import { UserPage } from "./pages/User";
import { ShoppingPage } from "./pages/Shopping";

import { PrivateRoute } from "./components/setting/PrivateRoute";

const routes = [
  { path: "/", element: <Login/> },           
  { path: "/dashboardPage", element: <PrivateRoute><DashboardPage/></PrivateRoute>}, 
  { path: "/register", element: <PrivateRoute><Register/></PrivateRoute> },
  { path: "/user", element: <PrivateRoute><UserPage/></PrivateRoute> },
  { path: "/compras", element: <PrivateRoute><ShoppingPage/></PrivateRoute> }
]

export default routes