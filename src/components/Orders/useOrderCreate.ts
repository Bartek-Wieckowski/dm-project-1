import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../api/apiOrders";

export function useOrderCreate() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: createOrder,
    error,
  } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordersAll"] });
    },
    onError: () => {
      console.log("Coś poszło nie tak");
    },
  });
  return { isPending, createOrder, error };
}
