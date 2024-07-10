import { useState } from 'react';
import { Card } from '../components/card';
import {
  useCreateOrder,
  useGetAllOrders,
  useGetCountries,
  useGetOrdersById,
  useGetProductById,
  useGetProductsByCountry,
} from '@red-pill/atlas-api-react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { haqqMainnet } from 'viem/chains';
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
            chainId: haqqMainnet.id,
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

export function AtlasGetAllOrders() {
  const [authToken, setAuthToken] = useState<string>('');
  const { data: orders } = useGetAllOrders(authToken);

  return (
    <Card title="getAllOrders" response={orders}>
      <Input
        placeholder="authToken"
        onChange={(event) => {
          setAuthToken(event.currentTarget.value);
        }}
      />
    </Card>
  );
}
export function AtlasGetOrderById() {
  const [authToken, setAuthToken] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const { data: orders } = useGetOrdersById({ orderId }, authToken);

  return (
    <Card title="getAllOrders" response={orders}>
      <Input
        placeholder="authToken"
        onChange={(event) => {
          setAuthToken(event.currentTarget.value);
        }}
      />
      <Input
        placeholder="orderId"
        onChange={(event) => {
          setOrderId(event.currentTarget.value);
        }}
      />
    </Card>
  );
}

export function AtlasCreateOrder() {
  const [authToken, setAuthToken] = useState<string>('');
  const [productId, setProductId] = useState<string>('');
  const [productDenomination, setProductDenomination] = useState<number | null>(
    null,
  );
  const { mutateAsync, data: response } = useCreateOrder(authToken);

  return (
    <Card title="createOrder" response={response}>
      <Input
        placeholder="authToken"
        onChange={(event) => {
          setAuthToken(event.currentTarget.value);
        }}
      />
      <Input
        placeholder="productId"
        onChange={(event) => {
          setProductId(event.currentTarget.value);
        }}
      />
      <Input
        placeholder="productDenomination"
        onChange={(event) => {
          setProductDenomination(Number.parseFloat(event.currentTarget.value));
        }}
      />

      <Button
        onClick={async () => {
          await mutateAsync({
            productId,
            productDenomination: productDenomination ?? 0,
          });
        }}
      >
        Create order
      </Button>
    </Card>
  );
}
