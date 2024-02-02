import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getSingleClient } from '../../api/apiClients';
import { ClientProps } from '../../types/ClientProps.type';
import ClientForm from './ClientForm';
import Loader from '../Loader';

export default function ClientEdit() {
  const { id } = useParams();
  const [editedClient, setEditedClient] = useState<ClientProps>({
    id: '',
    name: '',
    surname: '',
    street: '',
    postCode: '',
    town: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchSingleClient = useCallback(async () => {
    try {
      setIsLoading(true);
      if (id) {
        const clientData: ClientProps = await getSingleClient(id);
        setEditedClient(clientData);
      }
    } catch (error) {
      console.error('Błąd pobierania danych klienta:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSingleClient().catch((error) => {
      console.error('Błąd podczas fetchSingleClientData:', error);
    });
  }, [fetchSingleClient]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ClientForm editForm={true} editValues={editedClient} />
      )}
    </>
  );
}
