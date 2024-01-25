import { useEffect, useState } from "react";
import { getAllClients } from "../../services/ClientsService";
import { ClientProps } from "../../types/ClientProps.type";
import CardList from "../Cards/CardList";
import Loader from "../Loader";

export default function Clients() {
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data: ClientProps[] = await getAllClients();
        setClients(data);
      } catch (error) {
        console.error("Błąd ładowania danych");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((error) => {
      console.error("Error during fetchData:", error);
    });
  }, []);

  return <>{isLoading ? <Loader /> : <CardList cards={clients} />}</>;
}
