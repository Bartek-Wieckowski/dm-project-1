import { useOrders } from '../../api/queries/orders/useOrders';
import { useNavigate } from 'react-router-dom';
import { useOrderDelete } from '../../api/mutations/orders/useOrderDelete';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { addOrder, removeOrder } from '../../redux/order/orderSlice';
import Button from '../Button';
import Loader from '../Loader';
import TableRow from '../Tables/TableRow';
import TableTh from '../Tables/TableTh';
import TableTd from '../Tables/TableTd';
import Modal from '../../contexts/ModalContext';

export default function Orders() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, ordersAll: ordersData } = useOrders();
  const { deleteOrder } = useOrderDelete();

  const handleCheckboxChange = (
    isChecked: boolean,
    id: string,
    title: string
  ) => {
    if (isChecked) {
      dispatch(addOrder({ id, title }));
    } else {
      dispatch(removeOrder(id));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const fieldsTh = [
    { label: 'Numer telefonu' },
    { label: 'Treść' },
    { label: 'Ilość' },
    { label: 'Status' },
    { label: 'Opcje' },
    { label: 'Dodaj do koszyka' },
  ];

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
                className="w-1/6 px-6 py-4 text-center font-bold uppercase text-gray-600"
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
              <TableTd
                className={`border-b border-slate-500 px-3 py-6 text-center  font-medium ${
                  order.paid ? 'text-green-400' : 'text-rose-600'
                } `}
                value={order.paid ? 'Opłacone' : 'Do zapłaty'}
              />
              <TableTd className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white">
                <Button to={`${order.id}`} btnStyles="btnUpdate">
                  Zobacz
                </Button>
                <Modal>
                  <Modal.Open opensWindowName="deleteConfirmation">
                    <Button type="button" btnStyles="btnDelete">
                      Usuń
                    </Button>
                  </Modal.Open>
                  <Modal.Window
                    name="deleteConfirmation"
                    clickOk={() => {
                      deleteOrder(order.id);
                      navigate('/orders');
                    }}
                    showButtonOk={true}
                  >
                    <div className="text-center">
                      Czy na pewno chcesz usunąć to zamówienie?
                    </div>
                  </Modal.Window>
                </Modal>
              </TableTd>
              <TableTd className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white">
                <input
                  type="checkbox"
                  name={order.id}
                  id={order.id}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e.target.checked,
                      order.id,
                      order.orderTitle
                    )
                  }
                />
              </TableTd>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
