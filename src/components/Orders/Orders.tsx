import { useEffect, useState } from "react";
import Button from "../Button";
import { OrderData } from "../../types/Order.types";
import { getAllOrders } from "../../api/apiOrders";
import Loader from "../Loader";

export default function Orders() {
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const data: OrderData[] = await getAllOrders();
      setOrdersData(data);
    } catch (error) {
      console.error("Błąd ładowania danych");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders().catch((error) => {
      console.error("Error during fetchData:", error);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative overflow-x-auto max-w-7xl mx-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">
              Numer telefonu:
            </th>
            <th scope="col" className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">
              Tytuł:
            </th>
            <th scope="col" className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">
              Ilość:
            </th>
            <th scope="col" className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">
              Szczegóły:
            </th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr className="bg-gray-800  pb-2" key={order.id}>
              <td className="px-3 py-6 font-medium border-b border-slate-500  text-white  text-center">
                {order.client.phoneNumber}
              </td>
              <td className="px-3 py-6 font-medium border-b border-slate-500  text-white  text-center">
                {order.orderContent}
              </td>
              <td className="px-3 py-6 font-medium border-b border-slate-500  text-white text-center">
                {order.quantity}
              </td>
              <td className="px-3 py-6 font-medium border-b border-slate-500  text-white  text-center">
                <Button to={`${order.id}`} btnStyles="btnSimple">
                  Zobacz
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
