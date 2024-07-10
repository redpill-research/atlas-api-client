import { IGetProductByIdRequest } from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetProductById(data: Partial<IGetProductByIdRequest>) {
  const { getProductsById } = useAtlasApiClient();
  const productId = data.productId;

  return useQuery({
    queryKey: ['product', productId],
    enabled: !!productId && productId.length > 0,
    queryFn: async () => {
      return await getProductsById(data);
    },
  });
}
