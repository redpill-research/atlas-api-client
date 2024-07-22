import {
  IGetProductsByCountryRequest,
  IGetProductsByCountryResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export function useInfiniteGetProductsByCountry(
  data: Omit<IGetProductsByCountryRequest, 'page'>,
  authToken?: string,
  options?: Partial<
    UseInfiniteQueryOptions<
      IGetProductsByCountryResponse,
      Error,
      InfiniteData<IGetProductsByCountryResponse, number>,
      IGetProductsByCountryResponse,
      ReadonlyArray<string | number | undefined>,
      number
    >
  >,
) {
  const { getProductsByCountry } = useAtlasApiClient();
  const countryId = data.countryId;
  const limit = data.limit || 10;

  return useInfiniteQuery({
    queryKey: ['products', countryId, limit],
    enabled:
      !!authToken &&
      authToken.length > 0 &&
      !!countryId &&
      countryId.length > 0,
    queryFn: async ({ pageParam }) => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      if (!countryId) {
        throw new Error('Country ID is missing');
      }

      const requestData: IGetProductsByCountryRequest = {
        countryId: countryId,
        page: pageParam || 0,
        limit,
      };

      return await getProductsByCountry(requestData, authToken);
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
