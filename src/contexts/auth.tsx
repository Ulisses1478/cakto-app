import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Utils } from '@/utils';
import { Service, ServiceProps, api } from '@/services';
import { HandleResponseProps } from '@/services/api';

type LoginCredentialsRequest = ServiceProps['Auth']['CredentialsRequest'];

interface AuthProviderProps {
  auth: AuthProps | null;
  handleLogin: (credentials: LoginCredentialsRequest) => Promise<Omit<HandleResponseProps, 'data'>>;
  handleLogout: () => Promise<void>;
  hideValue: boolean;
  toggleHideValue: () => Promise<void>;
  isReady: boolean;
}

interface AuthProps {
  user: ServiceProps['User']['Get']['user'];
  revenue: ServiceProps['User']['Get']['revenue'];
  token: string;
  refresh: string;
}

const Storage = Utils.Storage;
const AuthContext = createContext({} as AuthProviderProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [auth, setAuth] = useState<AuthProps | null>(null);
  const [hideValue, setHideValue] = useState(true);

  useEffect(() => {
    try {
      setIsReady(false);
      Storage.getItem<AuthProps>(Storage.Keys.AUTH).then((currentAuth) => {
        setAuth(currentAuth ?? null);

        if (currentAuth) {
          api.defaults.headers.Authorization = `Bearer ${currentAuth.token}`;
        }

        Storage.getItem<boolean>(Storage.Keys.HIDE_VALUE).then((v) => {
          setHideValue(v ?? false);
        });
      });
    } finally {
      setIsReady(true);
    }
  }, []);

  async function handleLogin(credentials: ServiceProps['Auth']['CredentialsRequest']) {
    const { success, data, error } = await Service.Auth.login(credentials);
    if (success && data) {
      api.defaults.headers.Authorization = `Bearer ${data.access}`;
      const { user, revenue } = await Service.User.get();
      const currentAuth = {
        user,
        revenue,
        token: data.access,
        refresh: data.refresh,
      };
      await Storage.setItem(Storage.Keys.AUTH, currentAuth);
      setAuth(currentAuth);
    }

    return { success, error };
  }

  async function handleLogout() {
    await Storage.removeItem(Storage.Keys.AUTH);
  }

  async function toggleHideValue() {
    const newValue = !hideValue;
    setHideValue(newValue);
    Storage.setItem(Storage.Keys.HIDE_VALUE, newValue);
  }

  return (
    <AuthContext.Provider
      value={{
        isReady,
        auth,
        handleLogin,
        handleLogout,
        hideValue,
        toggleHideValue,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
