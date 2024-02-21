import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser as registerUserApi } from '../../apiUsers';
import { QUERY_KEYS } from '../../constants';
import { useNotification } from '../../../contexts/NotificationContext';

export function useRegisterUser() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: addNewUser,
    error,
  } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.usersAll] })
        .then(() => {
          showNotification('Konto utworzone poprawnie!', 'success');
        })
        .catch((error) => {
          console.error('Error invalidating queries:', error);
        });
    },
    onError: (error) => {
      console.error(error);
      showNotification('Coś poszło nie tak...', 'error');
    },
  });

  return { isPending, addNewUser, error };
}
