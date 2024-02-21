import { useQuery } from '@tanstack/react-query';
import { getSingleClient } from '../../apiClients';
import { ClientProps } from '../../../types/ClientProps.type';
import { QUERY_KEYS } from '../../constants';

export function useClientDetails(clientId: number) {
  const {
    isLoading,
    data: clientDetails,
    error,
  } = useQuery<ClientProps>({
    queryKey: [QUERY_KEYS.clientDetails, clientId],
    queryFn: () => getSingleClient(clientId),
  });

  return { isLoading, clientDetails, error };
}
