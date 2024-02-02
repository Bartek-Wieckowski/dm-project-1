import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser as registerUserApi } from "../../apiUsers";
import { useNotification } from "../../../contexts/NotificationContext";
import { QUERY_KEYS } from "../../constants";

export function useRegisterUser() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: addNewUser,
    error,
  } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.usersAll] });
      showNotification("Konto utworzone poprawnie!", "success");
    },
    onError: () => {
      showNotification("Coś poszło nie tak...", "error");
    },
  });

  return { isPending, addNewUser, error };
}
