import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    return token ? children : <Navigate to="/" replace />;
}