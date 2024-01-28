import CardList from '../Cards/CardList';
import Loader from '../Loader';
import { useClients } from './useClients';

export default function Clients() {
  const { isLoading, allClients } = useClients();

  return <>{isLoading ? <Loader /> : <CardList cards={allClients} />}</>;
}
