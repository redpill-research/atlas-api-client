'use client';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { Chain, Hex } from 'viem';
import 'viem/window';
import {
  useDisconnect,
  useSwitchChain,
  useChains,
  useConnectors,
  useConnect,
  Config,
  useAccount,
  useSendTransaction,
} from 'wagmi';
import { ConnectData, SendTransactionMutateAsync } from 'wagmi/query';

export interface WalletProviderInterface {
  connect: (connectorId: number) => Promise<ConnectData<Config>>;
  disconnect: () => Promise<void>;
  connectors: { id: number; name: string }[];
  supportedChains: readonly [Chain, ...Chain[]];
  switchNetwork: (chainId: number) => Promise<void>;
  isSelectWalletOpen: boolean;
  openSelectWallet: () => void;
  closeSelectWallet: () => void;
  address?: Hex;
  chain?: Chain;
  sendTransaction: SendTransactionMutateAsync<Config, unknown>;
}

const WalletContext = createContext<WalletProviderInterface | null>(null);

export function useWallet() {
  const walletService = useContext(WalletContext);

  if (!walletService) {
    throw new Error(
      'useWallet should be used only from child of WalletProvider',
    );
  }

  return walletService;
}

export function WalletProvider({ children }: PropsWithChildren) {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const supportedChains = useChains();
  const { switchChainAsync } = useSwitchChain();
  const availableConnectors = useConnectors();
  const { address, chain } = useAccount();
  const [isWalletSelectModalOpen, setWalletSelectModalOpen] = useState(false);
  const { sendTransactionAsync } = useSendTransaction();

  const handleConnect = useCallback(
    async (connectorId: number) => {
      return await connectAsync({
        connector: availableConnectors[connectorId],
      });
    },
    [availableConnectors, connectAsync],
  );

  const connectors = useMemo(() => {
    return availableConnectors.map((connector, index) => {
      return {
        id: index,
        name: connector.name,
      };
    });
  }, [availableConnectors]);

  const handleNetworkChange = useCallback(
    async (chainId: number) => {
      await switchChainAsync({ chainId });
    },
    [switchChainAsync],
  );

  const memoizedContext = useMemo<WalletProviderInterface>(() => {
    return {
      connect: handleConnect,
      disconnect: disconnectAsync,
      connectors,
      supportedChains,
      switchNetwork: handleNetworkChange,
      isSelectWalletOpen: isWalletSelectModalOpen,
      openSelectWallet: () => {
        setWalletSelectModalOpen(true);
      },
      closeSelectWallet: () => {
        setWalletSelectModalOpen(false);
      },
      address,
      chain,
      sendTransaction: sendTransactionAsync,
    };
  }, [
    handleConnect,
    disconnectAsync,
    connectors,
    supportedChains,
    isWalletSelectModalOpen,
    handleNetworkChange,
    address,
    chain,
    sendTransactionAsync,
  ]);

  return (
    <WalletContext.Provider value={memoizedContext}>
      {children}
    </WalletContext.Provider>
  );
}
