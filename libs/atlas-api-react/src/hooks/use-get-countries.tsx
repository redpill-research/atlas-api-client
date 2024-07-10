import { IGetCountriesRequest } from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetCountries(data: Partial<IGetCountriesRequest>) {
  const { getCountries } = useAtlasApiClient();

  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      return await getCountries(data);
    },
  });
}
