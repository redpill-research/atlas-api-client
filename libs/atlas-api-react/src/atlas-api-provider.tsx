import { AtlasApiClient, createAtlasApiClient } from '@red-pill/atlas-api-js';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';

const AtlasApiContext = createContext<AtlasApiClient>(null!);

export function AtlasApiProvider({
  children,
  baseUrl,
}: PropsWithChildren<{ baseUrl: string }>) {
  const client = useMemo(() => {
    return createAtlasApiClient({ baseUrl });
  }, [baseUrl]);

  return (
    <AtlasApiContext.Provider value={client}>
      {children}
    </AtlasApiContext.Provider>
  );
}

export function useAtlasApiClient() {
  const client = useContext(AtlasApiContext);

  if (!client) {
    throw new Error(
      'useAtlasApiClient must be used within an AtlasApiProvider',
    );
  }

  return client;
}
