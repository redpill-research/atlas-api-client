import { IGetAllOrdersResponse } from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetAllOrders(
  authToken?: string,
  options?: Partial<UseQueryOptions<IGetAllOrdersResponse, Error>>,
) {
  const { getAllOrders } = useAtlasApiClient();

  return useQuery<IGetAllOrdersResponse>({
    queryKey: ['orders'],
    enabled: !!authToken && authToken.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getAllOrders({}, authToken);
    },
    ...options,
  });
}
