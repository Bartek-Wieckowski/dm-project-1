import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../../contexts/NotificationContext';
import { QUERY_KEYS } from '../../constants';
import { deleteInvoice as deleteInvoiceApi } from '../../apiInvoices';

export function useInvoiceDelete() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { mutate: deleteClient } = useMutation({
    mutationFn: deleteInvoiceApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.invoicesAll],
      });
      showNotification('Faktura usunięta poprawnie', 'success');
    },
    onError: () => {
      showNotification('Coś poszło nie tak...', 'error');
    },
  });

  return { deleteClient };
}
