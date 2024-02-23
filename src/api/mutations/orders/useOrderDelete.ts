import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder as deleteOrderApi } from '../../apiOrders';
import { useNotification } from '../../../contexts/NotificationContext';
import { QUERY_KEYS } from '../../constants';

export function useOrderDelete() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { mutate: deleteOrder } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ordersAll],
      });
      showNotification('Zamówienie usunięto poprawnie', 'success');
    },
    onError: () => {
      showNotification('Coś poszło nie tak...', 'error');
    },
  });

  return { deleteOrder };
}
