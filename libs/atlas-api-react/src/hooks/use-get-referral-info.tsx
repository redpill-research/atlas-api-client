import {
  IGetReferralInfoRequest,
  IGetReferralInfoResponse,
} from '@red-pill/atlas-api-js';
import { useAtlasApiClient } from '../atlas-api-provider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetReferralInfo(
  data: IGetReferralInfoRequest,
  authToken?: string,
  options?: Partial<UseQueryOptions<IGetReferralInfoResponse, Error>>,
) {
  const { getReferralInfo } = useAtlasApiClient();

  return useQuery<IGetReferralInfoResponse>({
    queryKey: ['referral-info'],
    enabled: !!authToken && authToken.length > 0,
    queryFn: async () => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await getReferralInfo(data, authToken);
    },
    ...options,
  });
}
