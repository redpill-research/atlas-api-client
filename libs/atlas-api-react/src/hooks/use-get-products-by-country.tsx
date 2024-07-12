import {
  IGetProductsByCountryRequest,
  IGetProductsByCountryResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetProductsByCountry(
  data: Partial<IGetProductsByCountryRequest>,
  authToken?: string,
  options?: Partial<UseQueryOptions<IGetProductsByCountryResponse, Error>>,
) {
  const { getProductsByCountry } = useAtlasApiClient();
  const countryId = data.countryId;

  return useQuery<IGetProductsByCountryResponse>({
    queryKey: ['products', countryId],
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
