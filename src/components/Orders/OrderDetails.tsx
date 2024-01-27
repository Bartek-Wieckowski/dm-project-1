import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrderData } from "../../types/Order.types";
import { getSingleOrder } from "../../api/apiOrders";
import Button from "../Button";
import Loader from "../Loader";

export default function OrderDetails() {
  const { id } = useParams();
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderNotFound, setOrderNotFound] = useState(false);

  const fetchSingleOrderData = async () => {
    try {
      setIsLoading(true);
      if (id) {
        const data: OrderData = await getSingleOrder(id);
        setSelectedOrder(data);
        setOrderNotFound(false);
      }
    } catch (error) {
      console.error("Błąd ładowania danych");
      setOrderNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleOrderData().catch((error) => {
      console.error("Błąd podczas fetchSingleClientData:", error);
    });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (orderNotFound) {
    return <div className="text-stone-200 text-center text-5xl">Nie znaleziono zamówienia o ID: {id}</div>;
  }

  if (!selectedOrder) {
    return <></>;
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

      <div className="relative overflow-x-auto max-w-5xl mx-auto w-full">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto mx-auto">
          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="w-1/3 py-4 px-6 text-center text-gray-600 font-bold uppercase">
                Tytuł:
              </th>
              <th scope="col" className="w-1/3 py-4 px-6 text-center text-gray-600 font-bold uppercase">
                Treść:
              </th>
              <th scope="col" className="w-1/3 py-4 px-6 text-center text-gray-600 font-bold uppercase">
                Ilość:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-800">
              <td className="px-3 py-6 font-medium border-b border-slate-500  text-white  text-center">
                {orderTitle}
              </td>
              <td className="px-3 py-6 font-medium border-b border-slate-500  text-white  text-center">
                {orderContent}
              </td>
              <td className="px-3 py-6 font-medium border-b border-slate-500  text-white  text-center">
                {quantity}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
