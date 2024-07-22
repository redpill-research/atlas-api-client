import { useState } from 'react';
import { Card } from '../components/card';
import {
  useCreateOrder,
  useGenerateInviteCode,
  useGetCountries,
  useGetOrdersById,
  useGetProductById,
  useGetReferralInfo,
  useInfiniteGetAllOrders,
  useInfiniteGetProductsByCountry,
  useSendInvite,
} from '@red-pill/atlas-api-react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useAtlasAuth } from '../providers/atlas-auth-provider';
import { useWallet } from '../providers/wallet-provider';

export function AtlasAuth() {
  const { signIn, logout, token, isLogged } = useAtlasAuth();
  const { connect, address, connectors } = useWallet();
  const [refCode, setRefCode] = useState<string>('');

  return (
    <Card title="Auth" className="md:col-span-2">
      <div>
        <div>address: {address}</div>
        <div>token: {token}</div>
        <div>refCode: {refCode}</div>
      </div>
      <Input
        placeholder="refCode"
        value={refCode}
        onChange={(event) => {
          setRefCode(event.currentTarget.value);
        }}
      />
      {!address &&
        connectors.map((connector, index) => {
          return (
            <Button
              key={`connector-${index}`}
              onClick={async () => {
                await connect(connector.id);
              }}
            >
              Connect {connector.name}
            </Button>
          );
        })}
      {!isLogged ? (
        <Button
          disabled={!address}
          onClick={async () => {
            if (address) {
              await signIn(
                address,
                refCode !== undefined && refCode !== '' ? refCode : undefined,
              );
            } else {
              console.error('No address to authenticate');
            }
          }}
        >
          Start auth
        </Button>
      ) : (
        <Button
          disabled={!address}
          onClick={async () => {
            logout();
          }}
        >
          Log out
        </Button>
      )}
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

export function AtlasInfiniteGetProductsByCountries() {
  const { token } = useAtlasAuth();
  const [countryId, setCountryId] = useState<string>(
    '557cd1c1-b048-45ec-8d56-6fccfbb3b41f',
  );
  const [limit, setLimit] = useState<number>(50);
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteGetProductsByCountry({ countryId, limit }, token ?? undefined);

  return (
    <Card title="useInfiniteGetProductsByCountry" response={data}>
      <Input
        placeholder="countryId"
        value={countryId}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setCountryId(value);
        }}
      />
      <Input
        placeholder="limit"
        value={limit}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setLimit(Number.parseInt(value, 10));
        }}
      />
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </Button>
      {!token && <div>Require auth before request</div>}
      {isFetching && !isFetchingNextPage ? <div>Fetching...</div> : null}
      <div>pages loaded: {data?.pages.length}</div>
    </Card>
  );
}

export function AtlasGetProductById() {
  const { token } = useAtlasAuth();
  const [productId, setProductId] = useState<string>(
    'dd59fd0e-616b-43f3-8b74-10a38490c713',
  );
  const { data: product } = useGetProductById(
    { productId },
    token ?? undefined,
  );

  return (
    <Card title="getProductById" response={product}>
      <Input
        placeholder="productId"
        value={productId}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setProductId(value);
        }}
      />
      {!token && <div>Require auth before request</div>}
    </Card>
  );
}

export function AtlasInfiniteGetAllOrders() {
  const { token } = useAtlasAuth();
  const [limit, setLimit] = useState<number>(10);
  const {
    data: orders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteGetAllOrders({ limit }, token ?? undefined);

  return (
    <Card title="useInfiniteGetAllOrders" response={orders}>
      <Input
        placeholder="limit"
        value={limit}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setLimit(Number.parseInt(value, 10));
        }}
      />
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </Button>
      {!token && <div>Require auth before request</div>}
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>{' '}
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
        value={orderId}
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
  const [productDenomination, setProductDenomination] = useState<
    number | undefined
  >(undefined);
  const { mutateAsync, data: response } = useCreateOrder(token ?? undefined);

  return (
    <Card title="createOrder" response={response}>
      <Input
        placeholder="productId"
        value={productId}
        onChange={(event) => {
          setProductId(event.currentTarget.value);
        }}
      />
      <Input
        placeholder="productDenomination"
        value={productDenomination}
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

export function AtlasGenerateInviteCode() {
  const { token } = useAtlasAuth();
  const { data: response, mutateAsync } = useGenerateInviteCode(
    token ?? undefined,
  );

  return (
    <Card title="generateInviteCode" response={response}>
      {!token && <div>Require auth before request</div>}
      <Button
        onClick={async () => {
          await mutateAsync({});
        }}
        disabled={!token}
      >
        Generate
      </Button>
    </Card>
  );
}

export function AtlasSendInvite() {
  const { token } = useAtlasAuth();
  const [address, setAddress] = useState<string>('');
  const { data: response, mutateAsync } = useSendInvite(token ?? undefined);

  return (
    <Card title="sendInvite" response={response}>
      {!token && <div>Require auth before request</div>}
      <Input
        placeholder="address"
        value={address}
        onChange={(event) => {
          setAddress(event.currentTarget.value);
        }}
      />
      <Button
        onClick={async () => {
          await mutateAsync({ address });
        }}
        disabled={!token}
      >
        Send invite
      </Button>
    </Card>
  );
}
