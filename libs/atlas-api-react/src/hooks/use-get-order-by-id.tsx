import { IGetOrderByIdRequest } from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetOrdersById(
  data: Partial<IGetOrderByIdRequest>,
  authToken?: string,
) {
  const { getOrderById } = useAtlasApiClient();
  const orderId = data.orderId;

  return useQuery({
    queryKey: ['order', orderId],
    enabled:
      !!authToken && authToken.length > 0 && !!orderId && orderId.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getOrderById(data, authToken);
    },
  });
}
