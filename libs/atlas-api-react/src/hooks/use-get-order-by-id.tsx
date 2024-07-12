import {
  IGetOrderByIdRequest,
  IGetOrderByIdResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetOrdersById(
  data: Partial<IGetOrderByIdRequest>,
  authToken?: string,
  options?: Partial<UseQueryOptions<IGetOrderByIdResponse, Error>>,
) {
  const { getOrderById } = useAtlasApiClient();
  const orderId = data.orderId;

  return useQuery<IGetOrderByIdResponse>({
    queryKey: ['order', orderId],
    enabled:
      !!authToken && authToken.length > 0 && !!orderId && orderId.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getOrderById(data, authToken);
    },
    ...options,
  });
}
