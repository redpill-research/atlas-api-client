import { useState } from 'react';
import { Card } from '../components/card';
import {
  useCreateOrder,
  useGenerateInviteCode,
  useGetAllOrders,
  useGetCountries,
  useGetOrdersById,
  useGetProductById,
  useGetProductsByCountry,
  useGetReferralInfo,
  useInfiniteGetAllOrders,
  useInfiniteGetProductsByCountry,
  useSendInvite,
} from '@red-pill/atlas-api-react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { keepPreviousData } from '@tanstack/react-query';
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
        onChange={(event) => {
          setRefCode(event.currentTarget.value);
        }}
      />
      {!address &&
        connectors.map((connector) => {
          return (
            <Button
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

export function AtlasGetProductsByCountries() {
  const { token } = useAtlasAuth();
  const [countryId, setCountryId] = useState<string>('');
  const [page, setPage] = useState<string>(0);
  const [limit, setLimit] = useState<number>(10);
  const { data: products } = useGetProductsByCountry(
    { countryId },
    token ?? undefined,
  );

  return (
    <Card title="getProductsByCountry" response={products}>
      <Input
        placeholder="countryId"
        value={countryId}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setCountryId(value);
        }}
      />
      <Input
        placeholder="page"
        value={page}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setPage(value);
        }}
      />
      <Input
        placeholder="limit"
        value={limit}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setLimit(Number.parseFloat(value));
        }}
      />
      {!token && <div>Require auth before request</div>}
    </Card>
  );
}

export function AtlasInfiniteGetProductsByCountries() {
  const { token } = useAtlasAuth();
  const [countryId, setCountryId] = useState<string | undefined>(undefined);
  const [limit, setLimit] = useState<number | undefined>(10);
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteGetProductsByCountry({ countryId, limit }, token ?? undefined);

  return (
    <Card title="getProductsByCountry infinite hook" response={products}>
      <Input
        placeholder="countryId"
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
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
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
  const [page, setPage] = useState<number | undefined>(0);
  const [limit, setLimit] = useState<number | undefined>(10);
  const { data: orders } = useGetAllOrders(
    { page, limit },
    token ?? undefined,
    {
      placeholderData: keepPreviousData,
    },
  );

  return (
    <Card title="getAllOrders" response={orders}>
      <Input
        placeholder="page"
        value={page}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setPage(Number.parseInt(value, 10));
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
    <Card title="getAllOrders infinite hook" response={orders}>
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
