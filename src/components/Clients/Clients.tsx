import { useEffect, useState } from 'react';
import { getAllClients } from '../../services/ClientsService';
import { CardProps } from '../../types/CardProps.type';
import CardList from '../Cards/CardList';
import Loader from '../Loader';

export default function Clients() {
  const [clients, setClients] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data: CardProps[] = await getAllClients();
        setClients(data);
      } catch (error) {
        console.error('Błąd ładowania danych');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((error) => {
      console.error('Error during fetchData:', error);
    });
  }, []);

  return <>{isLoading ? <Loader /> : <CardList cards={clients} />}</>;
}
