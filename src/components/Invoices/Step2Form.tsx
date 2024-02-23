import { useOrdersAllByClient } from '../../api/queries/orders/useOrdersAllByClient';
import { step2FormProps } from '../../types/Invoice.types';
import Button from '../Button';

export default function Step2Form({
  formik,
  selectedClient,
  chosenOrder,
  selectedOrder,
}: step2FormProps) {
  const clientPhoneNumber = formik.values.phoneNumber;
  const clientFullName = `${selectedClient.name!} ${selectedClient.surname!}`;

  const { ordersByClient } = useOrdersAllByClient(clientPhoneNumber!);

  function handleOrderToggle(orderId: number) {
    const userSelectedOrder = ordersByClient?.find(
      (order) => order.id === orderId
    );

    if (userSelectedOrder) {
      chosenOrder(userSelectedOrder);
    }
  }

  return (
    <>
      <div className="text-slate-900 dark:text-stone-200">
        Klient: {clientFullName}
      </div>
      {ordersByClient && ordersByClient.length > 0 && (
        <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
          Zamówienia klienta:
        </h2>
      )}
      <ul>
        {ordersByClient?.map((order) => (
          <li key={order.id} className="border p-3">
            <div className="grid grid-cols-3 items-center">
              <p className="text-slate-900 dark:text-stone-200">
                Tytuł: {order.orderTitle}
              </p>
              <p className="text-slate-900 dark:text-stone-200">
                Status: {order.paid ? 'Opłacone' : 'Brak zapłaty'}
              </p>

              <Button
                type="button"
                btnStyles="btnQty"
                disabled={!order.paid}
                onClick={() => handleOrderToggle(order.id)}
              >
                {selectedOrder && selectedOrder.id === order.id
                  ? 'Wybrano'
                  : 'Wybierz'}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
