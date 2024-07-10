import { CreateOrderRequest, CreateOrderResponse } from '@red-pill/atlas-proto';
import { useMutation } from '@tanstack/react-query';
import { useAtlasApiClient } from '../atlas-api-provider';

export function useCreateOrder(authToken?: string) {
  const { createOrder } = useAtlasApiClient();

  return useMutation<CreateOrderResponse, Error, Partial<CreateOrderRequest>>({
    mutationFn: async (data) => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await createOrder(data, authToken);
    },
  });
}
