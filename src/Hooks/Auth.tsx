import React, {
  FC,
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';
import api from '../Services/api';

interface User {
  name: string;
  id: string;
  avatar_url: string;
}

interface AuthData {
  token: string;
  user: User;
}

interface SignInProps {
  password: string;
  email: string;
}

interface AuthProps {
  user: User;
  signIn(credentials: SignInProps): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/login', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback((): void => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
};
