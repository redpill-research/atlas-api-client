import {
  IGetProductByIdRequest,
  IGetProductByIdResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetProductById(
  data: Partial<IGetProductByIdRequest>,
  authToken?: string,
  options?: Partial<UseQueryOptions<IGetProductByIdResponse, Error>>,
) {
  const { getProductsById } = useAtlasApiClient();
  const productId = data.productId;

  return useQuery<IGetProductByIdResponse>({
    queryKey: ['product', productId],
    enabled:
      !!authToken &&
      authToken.length > 0 &&
      !!productId &&
      productId.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getProductsById(data, authToken);
    },
    ...options,
  });
}
