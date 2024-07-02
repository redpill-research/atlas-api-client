import { GetProductsByCountryRequest } from '@red-pill/atlas-proto';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetProductsByCountry(
  data: Partial<GetProductsByCountryRequest>
) {
  const { getProductsByCountry } = useAtlasApiClient();

  return useQuery({
    queryKey: ['getProductsByCountry', data.countryId],
    queryFn: async () => {
      const response = await getProductsByCountry(data);

      return response.products;
    },
  });
}
