import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient as deleteClientApi } from "../../api/apiClients";
import { useNotification } from "../../contexts/NotificationContext";

export function useClientDelete() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { mutate: deleteClient } = useMutation({
    mutationFn: deleteClientApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["clientsAll"],
      });
      showNotification("Klient usunięty poprawnie", "success");
    },
    onError: () => {
      showNotification("Coś poszło nie tak...", "error");
    },
  });

  return { deleteClient };
}
