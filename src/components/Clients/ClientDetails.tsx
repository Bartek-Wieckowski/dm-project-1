import { useNavigate, useParams } from "react-router-dom";
import { ClientProps } from "../../types/ClientProps.type";
import Button from "../Button";
import { useEffect, useState } from "react";
import { deleteClient, getSingleClient } from "../../api/apiClients";
import Loader from "../Loader";

export default function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState<ClientProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientNotFound, setClientNotFound] = useState(false);
  const navigate = useNavigate();

  const fetchSingleClientData = async () => {
    try {
      setIsLoading(true);
      if (id) {
        const data: ClientProps = await getSingleClient(id);
        setClient(data);
        setClientNotFound(false);
      }
    } catch (error) {
      console.error("Błąd ładowania danych");
      setClientNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleClientData().catch((error) => {
      console.error("Błąd podczas fetchSingleClientData:", error);
    });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (clientNotFound) {
    return <div className="text-center text-5xl text-stone-200">Nie znaleziono klienta o ID: {id}</div>;
  }

  if (!client) {
    return <></>;
  }

  const { id: clientId, imgSrc, name, surname, street, postCode, town, subRegion, phoneNumber } = client;

  const handleClickDelete = () => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tego klienta?");

    if (confirmDelete) {
      deleteClient(clientId).catch((error) => {
        console.error("Błąd podczas usuwania klienta:", error);
      });
      navigate("/clients");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="p-3">
        <h3 className="text-center text-5xl text-stone-200">Klient: {clientId} </h3>
      </div>
      <div className="flex gap-4 p-3">
        <Button type="button" btnStyles="btnDelete" onClick={handleClickDelete}>
          Usuń
        </Button>
        <Button to={`/clients/${clientId}/edit`} btnStyles="btnEdit">
          Edytuj
        </Button>
      </div>

      <div className="relative mx-auto max-w-[400px] overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Kategoria:
              </th>
              <th scope="col" className="px-6 py-3">
                Dane:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Imie:
              </th>
              <td className="px-6 py-4">{name}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Nazwisko:
              </th>
              <td className="px-6 py-4">{surname}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Ulica:
              </th>
              <td className="px-6 py-4">{street}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Kod pocztowy:
              </th>
              <td className="px-6 py-4">{postCode}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Miasto:
              </th>
              <td className="px-6 py-4">{town}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Region:
              </th>
              <td className="px-6 py-4">{subRegion}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Zdjęcie:
              </th>
              <td className="px-6 py-4">
                <img src={imgSrc} alt={name} className="size-1/2 rounded" />
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Numer telefonu:
              </th>
              <td className="px-6 py-4">{phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
