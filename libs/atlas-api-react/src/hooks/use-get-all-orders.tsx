import {
  IGetAllOrdersRequest,
  IGetAllOrdersResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export function useInfiniteGetAllOrders(
  data: Omit<IGetAllOrdersRequest, 'page'>,
  authToken?: string,
  options?: Partial<
    UseInfiniteQueryOptions<
      IGetAllOrdersResponse,
      Error,
      InfiniteData<IGetAllOrdersResponse, number>,
      IGetAllOrdersResponse,
      ReadonlyArray<string>,
      number
    >
  >,
) {
  const { getAllOrders } = useAtlasApiClient();

  const limit = data.limit || 10;

  return useInfiniteQuery({
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
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const totalPages = Math.ceil(lastPage.total / limit);
      const nextPage = lastPageParam + 1;

      return nextPage < totalPages ? nextPage : null;
    },
    ...options,
  });
}
