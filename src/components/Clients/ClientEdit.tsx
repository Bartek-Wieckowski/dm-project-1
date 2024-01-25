import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleClient } from "../../services/ClientsService";
import { ClientProps } from "../../types/ClientProps.type";
import ClientForm from "./ClientForm";
import Loader from "../Loader";

export default function ClientEdit() {
  const { id } = useParams();
  const [editedClient, setEditedClient] = useState<ClientProps>({
    id: "",
    name: "",
    surname: "",
    street: "",
    postCode: "",
    town: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSingleClient = async () => {
      try {
        setIsLoading(true);
        const clientData: ClientProps = await getSingleClient(String(id));
        setEditedClient(clientData);
      } catch (error) {
        console.error("Błąd pobierania danych klienta:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleClient().catch((error) => {
      console.error("Błąd podczas fetchSingleClientData:", error);
    });
  }, [id]);

  return <>{isLoading ? <Loader /> : <ClientForm editForm={true} editValues={editedClient} />}</>;
}
