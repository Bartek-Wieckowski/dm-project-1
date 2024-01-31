import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder as deleteOrderApi } from "../../api/apiOrders";
import { useNotification } from "../../contexts/NotificationContext";

export function useOrderDelete() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { mutate: deleteOrder } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ordersAll"],
      });
      showNotification("Zamówienie usunięto poprawnie", "success");
    },
    onError: () => {
      showNotification("Coś poszło nie tak...", "error");
    },
  });

  return { deleteOrder };
}
