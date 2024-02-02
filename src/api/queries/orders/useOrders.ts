import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../../apiOrders';
import { OrderData } from '../../../types/Order.types';
import { QUERY_KEYS } from '../../constants';

export function useOrders() {
  const {
    isLoading,
    data: ordersAll,
    error,
  } = useQuery<OrderData[]>({
    queryKey: [QUERY_KEYS.ordersAll],
    queryFn: getAllOrders,
    initialData: [],
  });

  return { isLoading, ordersAll, error };
}
