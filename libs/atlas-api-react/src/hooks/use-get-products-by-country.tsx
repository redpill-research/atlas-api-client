import {
  IGetProductsByCountryRequest,
  IGetProductsByCountryResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetProductsByCountry(
  data: Partial<IGetProductsByCountryRequest>,
  options?: Partial<UseQueryOptions<IGetProductsByCountryResponse, Error>>,
) {
  const { getProductsByCountry } = useAtlasApiClient();
  const countryId = data.countryId;

  return useQuery({
    queryKey: ['products', countryId],
    enabled: !!countryId && countryId.length > 0,
    queryFn: async () => {
      return await getProductsByCountry({ countryId });
    },
  });
}
