import {
  IGenerateInviteCodeRequest,
  IGenerateInviteCodeResponse,
} from '@red-pill/atlas-api-js';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAtlasApiClient } from '../atlas-api-provider';

export function useGenerateInviteCode(
  authToken?: string,
  options?: UseMutationOptions<
    IGenerateInviteCodeResponse,
    Error,
    IGenerateInviteCodeRequest
  >,
) {
  const { generateInviteCode } = useAtlasApiClient();

  return useMutation<
    IGenerateInviteCodeResponse,
    Error,
    IGenerateInviteCodeRequest
  >({
    mutationFn: async (data) => {
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      return await generateInviteCode(data, authToken);
    },
    ...options,
  });
}
