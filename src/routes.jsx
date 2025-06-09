import {Login} from "./components/setting/Login" 
import { DashboardPage } from "./pages/Dashboard";
import { Register } from "./components/setting/Register";

import { PrivateRoute } from "./components/setting/PrivateRoute";

const routes = [
  { path: "/", element: <Login/> },           
  { path: "/dashboardPage", element: <PrivateRoute><DashboardPage/></PrivateRoute>}, 
  { path: "/register", element: <PrivateRoute><Register/></PrivateRoute> } 
]

export default routes