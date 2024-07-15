import { useState } from 'react';
import { Card } from '../components/card';
import {
  useCreateOrder,
  useGetAllOrders,
  useGetCountries,
  useGetOrdersById,
  useGetProductById,
  useGetProductsByCountry,
  useGetReferralInfo,
} from '@red-pill/atlas-api-react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { haqqMainnet } from 'viem/chains';
import { useAtlasAuth } from '../providers/atlas-auth-provider';

export function AtlasAuth() {
  const { authStart, authConfirm, logout, token } = useAtlasAuth();
  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  return (
    <Card title="Auth" className="col-span-2">
      <div>
        <div>address: {address}</div>
        <div>token: {token}</div>
      </div>
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

export function AtlasGetCountries() {
  const { token } = useAtlasAuth();
  const { data: countries } = useGetCountries({}, token ?? undefined);

  return (
    <Card title="getCountries" response={countries}>
      {!token && <div>Require auth before request</div>}
    </Card>
  );
}

export function AtlasGetProductsByCountries() {
  const { token } = useAtlasAuth();
  const [countryId, setCountryId] = useState<string>('');
  const { data: products } = useGetProductsByCountry(
    { countryId },
    token ?? undefined,
  );

  return (
    <Card title="getProductsByCountry" response={products}>
      <Input
        placeholder="countryId"
        onChange={(event) => {
          const value = event.currentTarget.value;
          setCountryId(value);
        }}
      />
      {!token && <div>Require auth before request</div>}
    </Card>
  );
}

export function AtlasGetProductById() {
  const { token } = useAtlasAuth();
  const [productId, setProductId] = useState<string>('');
  const { data: product } = useGetProductById(
    { productId },
    token ?? undefined,
  );

  return (
    <Card title="getProductById" response={product}>
      <Input
        placeholder="productId"
        onChange={(event) => {
          const value = event.currentTarget.value;
          setProductId(value);
        }}
      />
      {!token && <div>Require auth before request</div>}
    </Card>
  );
}

export function AtlasGetAllOrders() {
  const { token } = useAtlasAuth();
  const { data: orders } = useGetAllOrders({}, token ?? undefined);

  return (
    <Card title="getAllOrders" response={orders}>
      {!token && <div>Require auth before request</div>}
    </Card>
  );
}
export function AtlasGetOrderById() {
  const { token } = useAtlasAuth();
  const [orderId, setOrderId] = useState<string>('');
  const { data: orders } = useGetOrdersById({ orderId }, token ?? undefined);

  return (
    <Card title="getOrderById" response={orders}>
      <Input
        placeholder="orderId"
        onChange={(event) => {
          setOrderId(event.currentTarget.value);
        }}
      />
      {!token && <div>Require auth before request</div>}
    </Card>
  );
}

export function AtlasCreateOrder() {
  const { token } = useAtlasAuth();
  const [productId, setProductId] = useState<string>('');
  const [productDenomination, setProductDenomination] = useState<number | null>(
    null,
  );
  const { mutateAsync, data: response } = useCreateOrder(token ?? undefined);

  return (
    <Card title="createOrder" response={response}>
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

      {!token && <div>Require auth before request</div>}

      <Button
        onClick={async () => {
          await mutateAsync({
            productId,
            productDenomination: productDenomination ?? 0,
          });
        }}
        disabled={!token}
      >
        Create order
      </Button>
    </Card>
  );
}

export function AtlasRefInfo() {
  const { token } = useAtlasAuth();
  const { data: response } = useGetReferralInfo({}, token ?? undefined);

  return (
    <Card title="getReferralInfo" response={response}>
      {!token && <div>Require auth before request</div>}
    </Card>
  );
}
