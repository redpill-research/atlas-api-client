import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AtlasApiProvider } from '@red-pill/atlas-api-react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'viem/chains';
import { WalletProvider } from './wallet-provider';
import { AuthProvider } from './atlas-auth-provider';

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
          <WalletProvider>
            <AuthProvider>{children}</AuthProvider>
          </WalletProvider>
        </AtlasApiProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
