import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser as registerUserApi } from "../../api/apiUsers";

export function useRegisterUser() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: addNewUser,
    error,
  } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["usersAll"] });
    },
    onError: () => {
      console.log("Coś poszło nie tak");
    },
  });

  return { isPending, addNewUser, error };
}
