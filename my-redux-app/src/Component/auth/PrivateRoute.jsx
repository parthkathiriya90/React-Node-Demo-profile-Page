import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const PrivateRoute = ({ Component }) => {
  const value = useAuth();

  return value.isLogin ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;
