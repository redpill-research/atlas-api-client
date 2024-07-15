import {
  ISendInviteRequest,
  ISendInviteResponse,
} from '@red-pill/atlas-api-js';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAtlasApiClient } from '../atlas-api-provider';

export function useSendInvite(
  authToken?: string,
  options?: Partial<
    UseMutationOptions<ISendInviteResponse, Error, Partial<ISendInviteRequest>>
  >,
) {
  const { sendInvite } = useAtlasApiClient();

  return useMutation<ISendInviteResponse, Error, Partial<ISendInviteRequest>>({
    mutationFn: async (data) => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await sendInvite(data, authToken);
    },
    ...options,
  });
}
