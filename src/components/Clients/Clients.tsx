import CardList from "../Cards/CardList";
import Loader from "../Loader";
import { useClients } from "./useClients";

export default function Clients() {
  const { isLoading, clientsAll } = useClients();

  return <>{isLoading ? <Loader /> : <CardList cards={clientsAll} />}</>;
}
