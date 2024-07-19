import {
  IGetProductsByCountryRequest,
  IGetProductsByCountryResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export function useGetProductsByCountry(
  data: IGetProductsByCountryRequest,
  authToken?: string,
  options?: Partial<UseQueryOptions<IGetProductsByCountryResponse, Error>>,
) {
  const { getProductsByCountry } = useAtlasApiClient();
  const countryId = data.countryId;

  return useQuery<IGetProductsByCountryResponse>({
    queryKey: ['products', countryId, data.page],
    enabled:
      !!authToken &&
      authToken.length > 0 &&
      !!countryId &&
      countryId.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getProductsByCountry(data, authToken);
    },
    ...options,
  });
}

export function useInfiniteGetProductsByCountry(
  data: Partial<IGetProductsByCountryRequest>,
  authToken?: string,
  options?: Partial<
    UseInfiniteQueryOptions<
      IGetProductsByCountryResponse,
      Error,
      IGetProductsByCountryResponse,
      IGetProductsByCountryResponse,
      ReadonlyArray<string | number | undefined>,
      number | false
    >
  >,
) {
  const { getProductsByCountry } = useAtlasApiClient();
  const countryId = data.countryId;
  const limit = data.limit || 10;

  return useInfiniteQuery<
    IGetProductsByCountryResponse,
    Error,
    IGetProductsByCountryResponse,
    ReadonlyArray<string | number | undefined>,
    number | false
  >({
    queryKey: ['products', countryId],
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
        limit: limit,
      };

      return await getProductsByCountry(requestData, authToken);
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
