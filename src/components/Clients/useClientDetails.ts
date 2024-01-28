import { useQuery } from '@tanstack/react-query';
import { getSingleClient } from '../../api/apiClients';
import { ClientProps } from '../../types/ClientProps.type';

export function useClientDetails(clientId: string) {
  const {
    isLoading,
    data: clientDetails,
    error,
  } = useQuery<ClientProps>({
    queryKey: ['clientDetails', clientId],
    queryFn: () => getSingleClient(clientId),
  });

  return { isLoading, clientDetails, error };
}
