import { GetOrderByIdRequest } from '@red-pill/atlas-proto';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetOrdersById(
  data: Partial<GetOrderByIdRequest>,
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
