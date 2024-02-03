import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants';
import { getAllOrdersByClient } from '../../apiOrders';
import { OrderData } from '../../../types/Order.types';

export function useOrdersAllByClient(clientId: string) {
  const {
    isLoading,
    data: ordersByClient,
    error,
  } = useQuery<OrderData[]>({
    queryKey: [QUERY_KEYS.ordersAllByClient, clientId],
    queryFn: () => getAllOrdersByClient(clientId),
  });

  return { isLoading, ordersByClient, error };
}
