import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../../contexts/NotificationContext';
import { QUERY_KEYS } from '../../constants';
import { addInvoice as addInvoiceApi } from '../../apiInvoices';

export function useInvoiceAdd() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: addInvoice,
    error,
  } = useMutation({
    mutationFn: addInvoiceApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.invoicesAll],
      });
      showNotification('Faktura dodany poprawnie', 'success');
    },
    onError: () => {
      showNotification('Coś poszło nie tak...', 'error');
    },
  });

  return { isPending, addInvoice, error };
}
