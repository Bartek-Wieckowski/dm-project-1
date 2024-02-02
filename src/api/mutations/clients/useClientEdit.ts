import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClientById as updateClientByIdApi } from "../../apiClients";
import { ClientFormValues } from "../../../validators/validators";
import { useNotification } from "../../../contexts/NotificationContext";
import { QUERY_KEYS } from "../../constants";

type mutationFnTypes = {
  updateClientData: ClientFormValues;
  clientId: string;
};

export function useClientEdit() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: updateClientById,
    error,
  } = useMutation({
    mutationFn: ({ updateClientData, clientId }: mutationFnTypes) =>
      updateClientByIdApi(updateClientData, clientId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clientDetails] });
      showNotification("Aktualizacja danych wykonana poprawnie", "success");
    },
    onError: () => {
      showNotification("Coś poszło nie tak...", "error");
    },
  });

  return { isPending, updateClientById, error };
}
