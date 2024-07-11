import {
  IGetCountriesRequest,
  IGetCountriesResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetCountries(
  data: Partial<IGetCountriesRequest>,
  options?: Partial<UseQueryOptions<IGetCountriesResponse, Error>>,
) {
  const { getCountries } = useAtlasApiClient();

  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      return await getCountries(data);
    },
    ...options,
  });
}
