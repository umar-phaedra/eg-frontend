import React, { createContext, useState, useContext, ReactNode, useLayoutEffect } from 'react';
import { AUTH_TOKEN, USER_OBJECT } from '../services/constants';
import { IAuthContextProps, IUser } from '../services/types/auth-context-types';


const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null)

  const login = (token: string | null, user: IUser) => {
    setTokenState(token);
    setUser(user)
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem(USER_OBJECT, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USER_OBJECT);
    }
  };

  const clearToken = () => {
    setTokenState(null);
    localStorage.removeItem(AUTH_TOKEN);
  };

  useLayoutEffect(() => {
    const auth = localStorage.getItem(AUTH_TOKEN)
    const userObj = localStorage.getItem(USER_OBJECT)  
    if(auth && userObj){
        login(auth, JSON.parse(userObj))
    }
  }, [])
  

  return (
    <AuthContext.Provider value={{ token, login, clearToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
