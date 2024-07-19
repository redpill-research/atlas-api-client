'use client';
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
  useCallback,
  useEffect,
} from 'react';
import { useAtlasApiClient } from '@red-pill/atlas-api-react';
import store from 'store2';
import { Hex } from 'viem';
import { useSignMessage } from 'wagmi';
import { useWallet } from './wallet-provider';

interface AuthContextTypeBase {
  signIn: (address: Hex, refCode?: string) => Promise<void>;
  logout: () => void;
  setSignInError: (error: Error | null) => void;
  signInError: Error | null;
}

interface AuthContextTypeAuthorized extends AuthContextTypeBase {
  isLogged: true;
  token: string;
}

interface AuthContextTypeUnauthorized extends AuthContextTypeBase {
  isLogged: false;
  token: undefined;
}

type AuthContextType = AuthContextTypeAuthorized | AuthContextTypeUnauthorized;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAtlasAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | undefined>(() => {
    return store.local.get('atlas-auth-token') ?? undefined;
  });
  const { authStart, authConfirm } = useAtlasApiClient();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useWallet();
  const [signInError, setSignInError] = useState<null | Error>(null);

  useEffect(() => {
    if (token) {
      store.local.set('atlas-auth-token', token);
    } else {
      store.local.remove('atlas-auth-token');
    }
  }, [token]);

  const signIn = useCallback(
    async (address: string, refCode?: string) => {
      try {
        const { messageForSign, authId } = await authStart({
          address,
          refCode,
        });
        const signature = await signMessageAsync({
          message: messageForSign,
        });

        try {
          const { sessionToken } = await authConfirm({
            authId: authId,
            signature,
          });
          setToken(sessionToken);
        } catch (confirmError) {
          console.error(
            'Error during authentication confirmation:',
            confirmError,
          );
          throw confirmError;
        }
      } catch (startError) {
        console.error('Error during authentication start:', startError);
        throw startError;
      }
    },
    [authConfirm, authStart, signMessageAsync],
  );

  const logout = useCallback(() => {
    setToken(undefined);
    setSignInError(null);
    disconnect();
  }, [disconnect]);

  const value = useMemo(() => {
    if (token) {
      return {
        token,
        isLogged: true as const,
        signIn,
        logout,
        signInError,
        setSignInError,
      };
    }

    return {
      token: undefined,
      isLogged: false as const,
      signIn,
      logout,
      signInError,
      setSignInError,
    };
  }, [token, signIn, logout, signInError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
