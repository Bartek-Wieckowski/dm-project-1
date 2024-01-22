import { Link, useParams } from "react-router-dom";
import { CardProps } from "../../types/CardProps.type";
import cards from "../../assets/dummy-data/cards-data";

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
      <div className="flex p-3">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Usuń
        </button>
        <Link
          to={`/clients/${id}/edit`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Edytuj
        </Link>
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
