import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
  useCallback,
} from 'react';
import { AuthStartRequest, AuthConfirmRequest } from '@red-pill/atlas-proto';
import { useAtlasApiClient } from '@red-pill/atlas-api-react';

interface AuthContextType {
  token: string | null;
  authStart: (data: Partial<AuthStartRequest>) => Promise<{
    authId: string;
    messageForSign: string;
  }>;
  authConfirm: (
    data: Partial<AuthConfirmRequest>,
  ) => Promise<{ sessionToken: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AtlasAuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const apiClient = useAtlasApiClient();

  const authStart = useCallback(
    async (data: Partial<AuthStartRequest>) => {
      return await apiClient.authStart(data);
    },
    [apiClient],
  );

  const authConfirm = useCallback(
    async (data: Partial<AuthConfirmRequest>) => {
      const { sessionToken } = await apiClient.authConfirm(data);
      setToken(sessionToken);
      return { sessionToken };
    },
    [apiClient],
  );

  const value = useMemo(() => {
    return {
      token,
      authStart,
      authConfirm,
      logout: () => {
        setToken(null);
      },
    };
  }, [token, authStart, authConfirm]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAtlasAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
