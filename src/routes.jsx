import { DashboardPage } from "./pages/Dashboard";
import { CuentaPage } from "./pages/Cuenta/CuentasPage";

const routes = [
  { path: "/", element: <DashboardPage /> },           
  { path: "/dashboardPage", element: <DashboardPage /> },
  { path: "/cuenta", element: <CuentaPage/>} 
]

export default routes