import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../features/crud/userAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const error = useSelector((state) => state.user.error);
    const users = useSelector((state) => state.user.users);
    const token = useSelector((state) => state.user.access_token);

    useEffect(() => {
        if (token) {
            setIsLogin(true)
        }
    }, [users, token])

    useEffect(() => {
        if (error.isError && error.location == 'login') {
            setIsLogin(false)
            setUser(null)
        }

        if (!error.isError && error.location == 'logout') {
            setIsLogin(false)
            setUser(null)
            // navigate('login')
        }
    }, [error])

    const loginUser = async (formData) => {
        setUser(formData)
        dispatch(login(formData))
        navigate('list')
    };

    const logoutUser = () => {
        dispatch(logout(token))
    };

    return (
        <AuthContext.Provider value={{ user, error, login: loginUser, logout: logoutUser, isLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
