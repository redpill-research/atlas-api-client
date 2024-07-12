import {
  IGetCountriesRequest,
  IGetCountriesResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetCountries(
  data: Partial<IGetCountriesRequest>,
  authToken?: string,
  options?: Partial<UseQueryOptions<IGetCountriesResponse, Error>>,
) {
  const { getCountries } = useAtlasApiClient();

  return useQuery<IGetCountriesResponse>({
    queryKey: ['countries'],
    enabled: !!authToken && authToken.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getCountries(data, authToken);
    },
    ...options,
  });
}
