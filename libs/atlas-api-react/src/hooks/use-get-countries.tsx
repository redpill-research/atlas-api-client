import { GetCountriesRequest } from '@red-pill/atlas-proto';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetCountries(data: Partial<GetCountriesRequest>) {
  const { getCountries } = useAtlasApiClient();

  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      return await getCountries(data);
    },
  });
}
