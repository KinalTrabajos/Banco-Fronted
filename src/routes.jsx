import {Login} from "./components/setting/Login" 
import { DashboardPage } from "./pages/Dashboard";
import {Register} from "./components/setting/Register";

const routes = [
  { path: "/", element: <Login/> },           
  { path: "/dashboardPage", element: <DashboardPage /> }, 
  { path: "/register", element: <Register/> } 
]

export default routes