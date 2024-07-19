import {
  IGetAllOrdersRequest,
  IGetAllOrdersResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export function useGetAllOrders(
  data: IGetAllOrdersRequest,
  authToken?: string,
  options?: Partial<UseQueryOptions<IGetAllOrdersResponse, Error>>,
) {
  const { getAllOrders } = useAtlasApiClient();

  return useQuery<IGetAllOrdersResponse>({
    queryKey: ['orders', data.page],
    enabled: !!authToken && authToken.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getAllOrders(data, authToken);
    },
    ...options,
  });
}

export function useInfiniteGetAllOrders(
  data: IGetAllOrdersRequest,
  authToken?: string,
  options?: Partial<
    UseInfiniteQueryOptions<
      IGetAllOrdersResponse,
      Error,
      IGetAllOrdersResponse,
      IGetAllOrdersResponse,
      ReadonlyArray<string>,
      number | false
    >
  >,
) {
  const { getAllOrders } = useAtlasApiClient();

  const limit = data.limit || 10;

  return useInfiniteQuery<
    IGetAllOrdersResponse,
    Error,
    IGetAllOrdersResponse,
    ReadonlyArray<string>,
    number | false
  >({
    queryKey: ['orders'],
    enabled: !!authToken && authToken.length > 0,
    queryFn: async ({ pageParam }) => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      const requestData: IGetAllOrdersRequest = {
        page: pageParam || 0,
        limit: limit,
      };

      return await getAllOrders(requestData, authToken);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.total / limit);
      const nextPage = pages.length + 1;

      return nextPage <= totalPages ? nextPage : false;
    },
    ...options,
  });
}
