import { QUERY_KEYS } from '../../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder as createOrderApi } from '../../apiOrders';
import { useNotification } from '../../../contexts/NotificationContext';

export function useOrderCreate() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: createOrder,
    error,
  } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ordersAll] });
      showNotification('Zamówienie dodane poprawnie', 'success');
    },
    onError: () => {
      showNotification('Coś poszło nie tak...', 'error');
    },
  });
  return { isPending, createOrder, error };
}
