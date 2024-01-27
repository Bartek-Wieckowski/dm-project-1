import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OrderData } from '../../types/Order.types';
import { getSingleOrder } from '../../api/apiOrders';
import Button from '../Button';
import Loader from '../Loader';
import TableRow from '../Tables/TableRow';
import TableTd from '../Tables/TableTd';
import TableTh from '../Tables/TableTh';

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
      console.error('Błąd ładowania danych');
      setOrderNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleOrderData().catch((error) => {
      console.error('Błąd podczas fetchSingleClientData:', error);
    });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (orderNotFound) {
    return (
      <div className="text-center text-5xl text-stone-200">
        Nie znaleziono zamówienia o ID: {id}
      </div>
    );
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

  const fieldsTh = [{ label: 'Tytuł' }, { label: 'Treść' }, { label: 'Ilość' }];

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-4 p-3">
        <h3 className="text-center text-stone-200 sm:text-5xl">
          Klient: {`${name} ${surname}`}{' '}
        </h3>
        <Button to={`/clients/${userId}`} btnStyles="btnEdit">
          Zobacz profil
        </Button>
      </div>

      <div className="relative mx-auto w-full max-w-5xl overflow-x-auto">
        <table className="mx-auto table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
            <TableRow>
              {fieldsTh.map((fieldTh, index) => (
                <TableTh
                  key={index}
                  scope="col"
                  label={fieldTh.label}
                  className="w-1/3 px-6 py-4 text-center font-bold uppercase text-gray-600"
                />
              ))}
            </TableRow>
          </thead>
          <tbody>
            <TableRow className="bg-gray-800">
              <TableTd
                className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                value={orderTitle}
              />
              <TableTd
                className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                value={orderContent}
              />
              <TableTd
                className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                value={quantity}
              />
            </TableRow>
          </tbody>
        </table>
      </div>
    </div>
  );
}
