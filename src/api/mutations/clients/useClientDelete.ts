import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient as deleteClientApi } from "../../apiClients";
import { useNotification } from "../../../contexts/NotificationContext";
import { QUERY_KEYS } from "../../constants";

export function useClientDelete() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { mutate: deleteClient } = useMutation({
    mutationFn: deleteClientApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.clientsAll],
      });
      showNotification("Klient usunięty poprawnie", "success");
    },
    onError: () => {
      showNotification("Coś poszło nie tak...", "error");
    },
  });

  return { deleteClient };
}
