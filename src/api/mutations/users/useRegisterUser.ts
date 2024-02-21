import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser as registerUserApi } from '../../apiUsers';
import { QUERY_KEYS } from '../../constants';

export function useRegisterUser() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: addNewUser,
    error,
  } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.usersAll] });
    },
  });

  return { isPending, addNewUser, error };
}
