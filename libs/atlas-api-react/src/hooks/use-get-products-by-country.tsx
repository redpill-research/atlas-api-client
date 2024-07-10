import { GetProductsByCountryRequest } from '@red-pill/atlas-proto';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetProductsByCountry(
  data: Partial<GetProductsByCountryRequest>,
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
