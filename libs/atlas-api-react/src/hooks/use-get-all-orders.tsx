import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetAllOrders(authToken?: string) {
  const { getAllOrders } = useAtlasApiClient();

  return useQuery({
    queryKey: ['orders'],
    enabled: !!authToken && authToken.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getAllOrders({}, authToken);
    },
  });
}
