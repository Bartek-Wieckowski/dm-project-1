import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addClient as addClientApi } from '../../apiClients';
import { useNotification } from '../../../contexts/NotificationContext';
import { QUERY_KEYS } from '../../constants';

export function useClientAdd() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: addClient,
    error,
  } = useMutation({
    mutationFn: addClientApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.clientsAll],
      });
      showNotification('Klient dodany poprawnie', 'success');
    },
    onError: () => {
      showNotification('Coś poszło nie tak...', 'error');
    },
  });

  return { isPending, addClient, error };
}
