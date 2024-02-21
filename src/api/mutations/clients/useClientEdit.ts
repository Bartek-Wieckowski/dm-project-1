import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClientById as updateClientByIdApi } from '../../apiClients';
import { useNotification } from '../../../contexts/NotificationContext';
import { QUERY_KEYS } from '../../constants';
// import { ClientProps } from '../../../types/ClientProps.type';
import { ClientFormValuesFromSupabase } from '../../../components/Clients/ClientForm';

type mutationFnTypes = {
  updateClientData: ClientFormValuesFromSupabase;
  clientId: number;
};

export function useClientEdit() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: updateClientById,
    error,
  } = useMutation({
    mutationFn: ({ updateClientData, clientId }: mutationFnTypes) =>
      updateClientByIdApi(updateClientData, clientId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.clientDetails],
      });
      showNotification('Aktualizacja danych wykonana poprawnie', 'success');
    },
    onError: () => {
      showNotification('Coś poszło nie tak...', 'error');
    },
  });

  return { isPending, updateClientById, error };
}
