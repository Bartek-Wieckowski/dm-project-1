import { useParams } from "react-router-dom";
import { ordersData } from "../../assets/dummy-data/orders-data";
import { OrderType } from "./Orders";
import Button from "../Button";

export default function OrderDetails() {
  const { id } = useParams();
  const selectedOrder = ordersData.find((order: OrderType) => order.id === Number(id));

  if (!selectedOrder) {
    return <div className="text-stone-200 text-center text-5xl">Nie znaleziono zamówienia o ID: {id}</div>;
  }

  const {
    id: orderId,
    client: { userId, name, surname, phoneNumber },
    quantity,
    orderTitle,
    orderContent,
  } = selectedOrder;
  return (
    <div className="flex flex-col items-center">
      <div className="p-3 flex flex-col items-center gap-4">
        <h3 className="text-stone-200 text-center text-md sm:text-5xl">Klient: {`${name} ${surname}`} </h3>
        <Button to={`/clients/${userId}`} btnStyles="btnEdit">
          Zobacz profil
        </Button>
      </div>

      <div className="relative overflow-x-auto max-w-[400px] mx-auto w-full">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tytuł:
              </th>
              <th scope="col" className="px-6 py-3">
                Treść:
              </th>
              <th scope="col" className="px-6 py-3">
                Ilość:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-800">
              <td className="px-6 py-4 font-medium  text-white">{orderTitle}</td>
              <td className="px-6 py-4 font-medium  text-white">{orderContent}</td>
              <td className="px-6 py-4 font-medium  text-white">{quantity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
