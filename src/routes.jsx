import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx";


const routes = [
  //{ path: '/login', element: <LoginPage /> },
  //{ path: '/register', element: <RegisterPage /> },
  { path: '/*', element: <DashboardPage /> }, // ← nota el asterisco
];

export default routes;