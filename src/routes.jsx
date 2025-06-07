import { Auth } from "./pages/auth"
import { DashboardPage } from "./pages/Dashboard";
// import { Register } from "./components/setting/Register";

const routes = [
  { path: "/", element: <Auth/> },           
  { path: "/dashboardPage", element: <DashboardPage/> }
  //{ path: "/register", element: <Register/> }
]

export default routes