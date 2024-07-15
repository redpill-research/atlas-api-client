import {
  IGenerateInviteCodeRequest,
  IGenerateInviteCodeResponse,
} from '@red-pill/atlas-api-js';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAtlasApiClient } from '../atlas-api-provider';

export function useGenerateInviteCode(
  authToken?: string,
  options?: Partial<
    UseMutationOptions<
      IGenerateInviteCodeResponse,
      Error,
      Partial<IGenerateInviteCodeRequest>
    >
  >,
) {
  const { generateInviteCode } = useAtlasApiClient();

  return useMutation<
    IGenerateInviteCodeResponse,
    Error,
    Partial<IGenerateInviteCodeRequest>
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
