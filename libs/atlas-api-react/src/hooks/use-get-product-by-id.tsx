import { GetProductByIdRequest } from '@red-pill/atlas-proto';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetProductById(data: Partial<GetProductByIdRequest>) {
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
