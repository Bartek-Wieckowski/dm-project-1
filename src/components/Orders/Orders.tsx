import { useEffect, useState } from 'react';
import Button from '../Button';
import { OrderData } from '../../types/Order.types';
import { getAllOrders } from '../../api/apiOrders';
import Loader from '../Loader';
import TableRow from '../Tables/TableRow';
import TableTh from '../Tables/TableTh';
import TableTd from '../Tables/TableTd';

export default function Orders() {
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const data: OrderData[] = await getAllOrders();
      setOrdersData(data);
    } catch (error) {
      console.error('Błąd ładowania danych');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders().catch((error) => {
      console.error('Error during fetchData:', error);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const fieldsTh = [
    { label: 'Numer telefonu' },
    { label: 'Tytuł' },
    { label: 'Ilość' },
    { label: 'Szczegóły' },
  ];

  return (
    <div className="relative mx-auto max-w-7xl overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
          <TableRow>
            {fieldsTh.map((fieldTh, index) => (
              <TableTh
                key={index}
                scope="col"
                label={fieldTh.label}
                className="w-1/4 px-6 py-4 text-center font-bold uppercase text-gray-600"
              />
            ))}
          </TableRow>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <TableRow className="bg-gray-800  pb-2" key={order.id}>
              <TableTd
                className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                value={order.client.phoneNumber}
              />
              <TableTd
                className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                value={order.orderContent}
              />
              <TableTd
                className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                value={order.quantity}
              />
              <TableTd className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white">
                <Button to={`${order.id}`} btnStyles="btnSimple">
                  Zobacz
                </Button>
              </TableTd>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
