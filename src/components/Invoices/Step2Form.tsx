// Importy
import { FormikProps } from 'formik';
import { InvoicesFormValues } from '../../validators/validators';
import { useOrdersAllByClient } from '../../api/queries/orders/useOrdersAllByClient';
import Button from '../Button';
import { OrderData } from '../../types/Order.types';

type Step2FormProps = {
  formik: FormikProps<InvoicesFormValues>;
};

export default function Step2Form({ formik }: Step2FormProps) {
  const clientId = formik.values.selectedClient?.userId;
  const clientFullName = `${formik.values.selectedClient?.name} ${formik.values.selectedClient?.surname}`;

  const { ordersByClient } = useOrdersAllByClient(clientId);

  function handleOrderToggle(orderId: string) {
    const selectedOrder = ordersByClient?.find((order) => order.id === orderId);

    if (selectedOrder) {
      const isAlreadySelected = formik.values.selectedOrders?.some(
        (selected: OrderData) => selected.id === orderId
      );

      if (isAlreadySelected) {
        const updatedSelectedOrders = (
          formik.values.selectedOrders || []
        ).filter((selected: OrderData) => selected.id !== orderId);

        formik
          .setFieldValue('selectedOrders', updatedSelectedOrders)
          .catch((error) => {
            console.error('Błąd podczas wybierania klienta:', error);
          });
      } else {
        const updatedSelectedOrders = (
          formik.values.selectedOrders || []
        ).concat(selectedOrder);

        formik
          .setFieldValue('selectedOrders', updatedSelectedOrders)
          .catch((error) => {
            console.error('Błąd podczas wybierania klienta:', error);
          });
      }
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
                {formik.values.selectedOrders?.some(
                  (selected: OrderData) => selected.id === order.id
                )
                  ? 'Wybrano'
                  : 'Wybierz'}
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {formik.touched.selectedOrders && formik.errors.selectedOrders && (
        <p className={`${errorInfoClass}`}>Wybierz klienta</p>
      )}
    </>
  );
}

const errorInfoClass = 'text-rose-400 text-sm';