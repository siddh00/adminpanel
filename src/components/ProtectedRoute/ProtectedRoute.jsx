import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = Cookies.get("token");
  return token !== undefined ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
