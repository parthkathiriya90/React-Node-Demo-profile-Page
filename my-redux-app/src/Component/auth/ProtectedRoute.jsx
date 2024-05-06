import { Navigate } from "react-router-dom";
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ Component }) => {
    const value = useAuth();

    return value.isLogin ? <Navigate to="/profile" /> : <Component />;
};
export default ProtectedRoute;