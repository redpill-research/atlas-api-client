import {
  ICreateOrderRequest,
  ICreateOrderResponse,
} from '@red-pill/atlas-api-js';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAtlasApiClient } from '../atlas-api-provider';

export function useCreateOrder(
  authToken?: string,
  options?: UseMutationOptions<
    ICreateOrderResponse,
    Error,
    Partial<ICreateOrderRequest>
  >,
) {
  const { createOrder } = useAtlasApiClient();

  return useMutation<ICreateOrderResponse, Error, Partial<ICreateOrderRequest>>(
    {
      mutationFn: async (data) => {
        if (!authToken) {
          throw new Error('Authentication token is missing');
        }

        return await createOrder(data, authToken);
      },
      ...options,
    },
  );
}
