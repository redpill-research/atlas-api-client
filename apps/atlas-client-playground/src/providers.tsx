import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AtlasApiProvider, AtlasAuthProvider } from '@red-pill/atlas-api-react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'viem/chains';

const queryClient = new QueryClient();
export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export function AppProviders({
  children,
  baseUrl,
}: PropsWithChildren<{ baseUrl: string }>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AtlasApiProvider baseUrl={baseUrl}>
          <AtlasAuthProvider>{children}</AtlasAuthProvider>
        </AtlasApiProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
