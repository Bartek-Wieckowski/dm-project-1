import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClient as addClientApi } from "../../api/apiClients";

export function useClientAdd() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: addClient,
    error,
  } = useMutation({
    mutationFn: addClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientsAll"] });
    },
    onError: () => {
      console.log("Coś poszło nie tak");
    },
  });

  return { isPending, addClient, error };
}
