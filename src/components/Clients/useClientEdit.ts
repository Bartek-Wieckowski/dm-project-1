import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClientById as updateClientByIdApi } from "../../api/apiClients";
import { ClientFormValues } from "../../validators/validators";

type mutationFnTypes = {
  updateClientData: ClientFormValues;
  clientId: string;
};

export function useClientEdit() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: updateClientById,
    error,
  } = useMutation({
    mutationFn: ({ updateClientData, clientId }: mutationFnTypes) =>
      updateClientByIdApi(updateClientData, clientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientDetails"] });
    },
    onError: () => {
      console.log("Coś poszło nie tak");
    },
  });

  return { isPending, updateClientById, error };
}
