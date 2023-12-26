import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ token }: { token: string }) => {
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;