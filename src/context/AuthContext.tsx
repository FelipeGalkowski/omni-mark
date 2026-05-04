import { storageKeys } from "@/config/storageKeys";
import { AuthService } from "@/service/AuthService";
import { httpClient } from "@/service/httpClient";
import { createContext, useLayoutEffect, useState } from "react";
import { toast } from "sonner";

interface IAuthContextValue {
  signed: boolean;
  signIn: () => Promise<string>;
  setSignedIn: (value: React.SetStateAction<boolean>) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!sessionStorage.getItem(storageKeys.accessToken);
  });

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use(
      (config) => {
        const accessToken = sessionStorage.getItem(storageKeys.accessToken);

        if (accessToken) {
          config.headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return config;
      }
    );

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get('auth');
    const token = params.get('token');

    if (auth === 'success' && token) {
      sessionStorage.setItem(storageKeys.accessToken, token);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (auth === 'error') {
      const error = params.get('error');
      console.error('Auth error:', error);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  async function signIn(): Promise<string> {
    try {
      const authUrl = await AuthService.getAuthUrl();
      setSignedIn(true);
      return authUrl;
    } catch {
      toast.error("Ocorreu um erro ao redireciona-lo para a página de login do Mercado Livre. Tente novamente");
      throw new Error("An unknown error occurred to try authenticate with Mercado Livre");
    }
  };

  const signOut = () => {
    sessionStorage.clear();
    setSignedIn(false);
  };

  const value: IAuthContextValue = {
    signed: signedIn,
    signIn,
    setSignedIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};
