import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/hooks';
import TableRow from '../components/Tables/TableRow';
import TableTd from '../components/Tables/TableTd';
import TableTh from '../components/Tables/TableTh';

export default function OrdersCartpage() {
  const ordersState = useAppSelector((state) => state.order.orders);
  const fieldsTh = [{ label: 'ID' }, { label: 'Tytuł' }];

  return (
    <div className="relative mx-auto max-w-7xl overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
          <TableRow>
            {fieldsTh.map((fieldTh, index) => (
              <TableTh
                key={index}
                scope="col"
                label={fieldTh.label}
                className="w-1/2 px-6 py-4 text-center font-bold uppercase text-gray-600"
              />
            ))}
          </TableRow>
        </thead>
        <tbody>
          {ordersState.map((order) => (
            <TableRow className="bg-gray-800  pb-2" key={order.id}>
              <TableTd
                className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                value={order.id}
              />
              <TableTd className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white">
                <Link to={`/orders/${order.id}`}>{order.title}</Link>
              </TableTd>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
