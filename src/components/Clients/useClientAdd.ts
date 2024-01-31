import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClient as addClientApi } from "../../api/apiClients";
import { useNotification } from "../../contexts/NotificationContext";

export function useClientAdd() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: addClient,
    error,
  } = useMutation({
    mutationFn: addClientApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["clientsAll"] });
      showNotification("Klient dodany poprawnie", "success");
    },
    onError: () => {
      showNotification("Coś poszło nie tak...", "error");
    },
  });

  return { isPending, addClient, error };
}
