import { GetProductByIdRequest } from '@red-pill/atlas-proto';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery } from '@tanstack/react-query';

export function useGetProductById({
  productId,
}: Partial<GetProductByIdRequest>) {
  const { getProductsById } = useAtlasApiClient();

  return useQuery({
    queryKey: ['product', productId],
    enabled: !!productId && productId.length > 0,
    queryFn: async () => {
      return await getProductsById({ productId });
    },
  });
}
