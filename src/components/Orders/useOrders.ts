import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../api/apiOrders";
import { OrderData } from "../../types/Order.types";

export function useOrders() {
  const {
    isLoading,
    data: ordersAll,
    error,
  } = useQuery<OrderData[]>({
    queryKey: ["ordersAll"],
    queryFn: getAllOrders,
    initialData: [],
  });

  return { isLoading, ordersAll, error };
}
