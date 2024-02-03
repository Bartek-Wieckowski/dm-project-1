import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants';
import { getAllInvoices } from '../apiInvoices';
import { InvoiceData } from '../../../types/Invoice.types';

export function useInvoices() {
  const {
    isLoading,
    data: invoicesAll,
    error,
  } = useQuery<InvoiceData[]>({
    queryKey: [QUERY_KEYS.invoicesAll],
    queryFn: getAllInvoices,
    initialData: [],
  });

  return { isLoading, invoicesAll, error };
}
