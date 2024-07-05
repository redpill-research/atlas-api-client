import { useState } from 'react';
import { Card } from '../components/card';
import {
  useGetCountries,
  useGetProductById,
  useGetProductsByCountry,
} from '@red-pill/atlas-api-react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { mainnet } from 'viem/chains';
import { useAtlasAuth } from '../providers/atlas-auth-provider';

export function AtlasGetCountries() {
  const { data: countries } = useGetCountries({});

  return <Card title="getCountries" response={countries} />;
}

export function AtlasGetProductsByCountries() {
  const [countryId, setCountryId] = useState<string>('');
  const { data: products } = useGetProductsByCountry({ countryId });

  return (
    <Card title="getProductsByCountry" response={products}>
      <Input
        placeholder="countryId"
        onChange={(event) => {
          const value = event.currentTarget.value;
          setCountryId(value);
        }}
      />
    </Card>
  );
}

export function AtlasGetProductById() {
  const [productId, setProductId] = useState<string>('');
  const { data: product } = useGetProductById({ productId });

  return (
    <Card title="getProductById" response={product}>
      <Input
        placeholder="countryId"
        onChange={(event) => {
          const value = event.currentTarget.value;
          setProductId(value);
        }}
      />
    </Card>
  );
}

export function AtlasAuth() {
  const { authStart, authConfirm, logout, token } = useAtlasAuth();
  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  return (
    <Card title="Auth">
      <div>address: {address}</div>
      <div>token: {token}</div>
      <br />
      <Button
        onClick={async () => {
          await connectAsync({
            chainId: mainnet.id,
            connector: injected(),
          });
        }}
      >
        Connect wallet
      </Button>
      <Button
        disabled={!address}
        onClick={async () => {
          try {
            const { messageForSign, authId } = await authStart({
              address,
            });
            console.log('Auth Start Response:', { messageForSign, authId });
            const signature = await signMessageAsync({
              message: messageForSign,
            });
            try {
              const authConfirmResponse = await authConfirm({
                authId: authId,
                signature,
              });
              console.log('Auth Confirm Response:', authConfirmResponse);
            } catch (confirmError) {
              console.error(
                'Error during authentication confirmation:',
                confirmError,
              );
            }
          } catch (startError) {
            console.error('Error during authentication start:', startError);
          }
        }}
      >
        Start auth
      </Button>
      <Button
        disabled={!address}
        onClick={async () => {
          logout();
          await disconnectAsync();
        }}
      >
        Log out
      </Button>
    </Card>
  );
}
