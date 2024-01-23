import { useParams } from "react-router-dom";
import { CardProps } from "../../types/CardProps.type";
import cards from "../../assets/dummy-data/cards-data";
import Button from "../Button";

export default function ClientDetails() {
  const { id } = useParams();
  const selectedClient = cards.find((card) => card.id === Number(id));

  if (!selectedClient) {
    return <div className="text-stone-200 text-center text-5xl">Nie znaleziono klienta o ID: {id}</div>;
  }

  const {
    id: clientId,
    imgSrc,
    name,
    surname,
    street,
    postCode,
    town,
    subRegion,
    phoneNumber,
  } = selectedClient as CardProps;

  return (
    <div className="flex flex-col items-center">
      <div className="p-3">
        <h3 className="text-stone-200 text-center text-5xl">Klient: {clientId} </h3>
      </div>
      <div className="flex p-3 gap-4">
        <Button type="button" btnStyles="btnDelete">
          Usuń
        </Button>
        <Button to={`/clients/${id}/edit`} btnStyles="btnEdit">
          Edytuj
        </Button>
      </div>

      <div className="relative overflow-x-auto max-w-[400px] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
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
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Imie:
              </th>
              <td className="px-6 py-4">{name}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Nazwisko:
              </th>
              <td className="px-6 py-4">{surname}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Ulica:
              </th>
              <td className="px-6 py-4">{street}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Kod pocztowy:
              </th>
              <td className="px-6 py-4">{postCode}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Miasto:
              </th>
              <td className="px-6 py-4">{town}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Region:
              </th>
              <td className="px-6 py-4">{subRegion}</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Zdjęcie:
              </th>
              <td className="px-6 py-4">
                <img src={imgSrc} alt={name} className="w-1/2 h-1/2 rounded" />
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
