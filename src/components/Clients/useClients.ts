import { useQuery } from '@tanstack/react-query';
import { getAllClients } from '../../api/apiClients';
import { ClientProps } from '../../types/ClientProps.type';

export function useClients() {
  const {
    isLoading,
    data: allClients,
    error,
  } = useQuery<ClientProps[]>({
    queryKey: ['allClients'],
    queryFn: getAllClients,
    initialData: [],
  });

  return { isLoading, allClients, error };
}
