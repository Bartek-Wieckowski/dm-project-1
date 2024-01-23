import { ordersData } from "../../assets/dummy-data/orders-data";
import Button from "../Button";

export interface ClientType {
  userId: number;
  name: string;
  surname: string;
  phoneNumber: string;
}

export interface OrderType {
  id: number;
  client: ClientType;
  quantity: number;
  orderContent: string;
  orderTitle: string;
}

export default function Orders() {
  return (
    <div className="relative overflow-x-auto max-w-7xl mx-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Numer telefonu:
            </th>
            <th scope="col" className="px-6 py-3">
              Tytuł:
            </th>
            <th scope="col" className="px-6 py-3">
              Ilość:
            </th>
            <th scope="col" className="px-6 py-3">
              Szczegóły:
            </th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order: OrderType) => (
            <tr className="bg-gray-800" key={order.id}>
              <td className="px-6 py-4 font-medium  text-white">{order.client.phoneNumber}</td>
              <td className="px-6 py-4 font-medium  text-white">{order.orderContent}</td>
              <td className="px-6 py-4 font-medium  text-white">{order.quantity}</td>
              <td className="px-6 py-4 font-medium  text-white">
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
