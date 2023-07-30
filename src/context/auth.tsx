// context/auth.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
    login as loginAction,
    logout as logoutAction
} from '../redux/slices/sessionSlice'; // Importa la acción de inicio de sesión de tu slice de sesión
import { IUser } from '@/interfaces/User';

interface IAuthContext {
    isAuthenticated: boolean;
    login: (user: any) => void; // Asume que el usuario es del tipo que necesitas
    logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    login: () => null,
    logout: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (token) {
    //         setIsAuthenticated(true);
    //     }
    // }, []);

    const login = (user: IUser) => {
        setIsAuthenticated(true);
        localStorage.setItem('authToken', user.token);
        dispatch(loginAction(user));
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
        dispatch(logoutAction());
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
