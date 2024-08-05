import {
  ISearchProductsRequest,
  ISearchProductsResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export function useProductsSearch(
  data: Omit<ISearchProductsRequest, 'page'>,
  authToken?: string,
  options?: Partial<
    UseInfiniteQueryOptions<
      ISearchProductsResponse,
      Error,
      InfiniteData<ISearchProductsResponse, number>,
      ISearchProductsResponse,
      ReadonlyArray<string | number | undefined>,
      number
    >
  >,
) {
  const { searchProducts } = useAtlasApiClient();
  const countryId = data.countryId;
  const query = data.name;
  const limit = data.limit || 10;

  return useInfiniteQuery({
    queryKey: ['product-search', countryId, query, limit],
    enabled:
      !!authToken &&
      authToken.length > 0 &&
      !!countryId &&
      countryId.length > 0 &&
      query.length > 0,
    queryFn: async ({ pageParam }) => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      if (!countryId) {
        throw new Error('Country ID is missing');
      }

      const requestData: ISearchProductsRequest = {
        countryId: countryId,
        name: query,
        page: pageParam || 0,
        limit,
      };

      return await searchProducts(requestData, authToken);
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
