// context/auth.tsx
import React, {
  createContext, useState, useContext, useMemo, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction, logout as logoutAction } from '@/redux/slices/sessionSlice';
import { IUser } from '@/interfaces/User';

interface IAuthContext {
    isAuthenticated: boolean;
    // eslint-disable-next-line no-unused-vars
    login: (user: IUser) => void;
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

  const login = useCallback((user: IUser) => {
    setIsAuthenticated(true);
    dispatch(loginAction(user));
  }, [dispatch]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    dispatch(logoutAction());
  }, [dispatch]);

  const contextValue = useMemo(() => (
    {
      isAuthenticated,
      login,
      logout,
    }
  ), [isAuthenticated, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
