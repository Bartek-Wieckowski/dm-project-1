import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient as deleteClientApi } from "../../api/apiClients";

export function useClientDelete() {
  const queryClient = useQueryClient();

  const { mutate: deleteClient } = useMutation({
    mutationFn: deleteClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clientsAll"],
      });
    },
    onError: () => {
      console.log("Coś poszło nie tak");
    },
  });

  return { deleteClient };
}
