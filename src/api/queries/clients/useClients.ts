import { useQuery } from '@tanstack/react-query';
import { getAllClients } from '../../apiClients';
import { ClientProps } from '../../../types/ClientProps.type';
import { QUERY_KEYS } from '../../constants';

export function useClients() {
  const {
    isLoading,
    data: clientsAll,
    error,
  } = useQuery<ClientProps[]>({
    queryKey: [QUERY_KEYS.clientsAll],
    queryFn: getAllClients,
    // initialData: [],
  });

  return { isLoading, clientsAll, error };
}
