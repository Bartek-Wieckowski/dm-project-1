import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants';
import { OrderDataByClient } from '../../../types/Order.types';
import { getSingleOrder } from '../../apiOrders';

export function useOrderDetails(orderId: number) {
  const {
    isLoading,
    data: orderDetails,
    error,
  } = useQuery<OrderDataByClient>({
    queryKey: [QUERY_KEYS.orderDetails, orderId],
    queryFn: () => getSingleOrder(orderId),
  });

  return { isLoading, orderDetails, error };
}
