import CardList from "../Cards/CardList";
import Loader from "../Loader";
import { useClients } from "../../api/queries/clients/useClients";

export default function Clients() {
  const { isLoading, clientsAll } = useClients();

  return <>{isLoading ? <Loader /> : <CardList cards={clientsAll} />}</>;
}
