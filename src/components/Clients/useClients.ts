import { useQuery } from "@tanstack/react-query";
import { getAllClients } from "../../api/apiClients";
import { ClientProps } from "../../types/ClientProps.type";

export function useClients() {
  const {
    isLoading,
    data: clientsAll,
    error,
  } = useQuery<ClientProps[]>({
    queryKey: ["clientsAll"],
    queryFn: getAllClients,
    initialData: [],
  });

  return { isLoading, clientsAll, error };
}
