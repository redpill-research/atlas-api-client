import { GetProductsByCountryRequest } from '@red-pill/atlas-proto';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetProductsByCountry({
  countryId,
}: Partial<GetProductsByCountryRequest>) {
  const { getProductsByCountry } = useAtlasApiClient();

  return useQuery({
    queryKey: ['product-by-country', countryId],
    enabled: !!countryId && countryId.length > 0,
    queryFn: async () => {
      const response = await getProductsByCountry({ countryId });

      return response.products;
    },
  });
}
