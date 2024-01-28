import { OrderFormValues, orderYupSchema } from '../../validators/validators';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, getAllClientOrders } from '../../api/apiOrders';
import { ClientProps } from '../../types/ClientProps.type';
import Button from '../Button';
import Select from '../Form/Select';
import Input from '../Form/Input';
import Textarea from '../Form/Textarea';

export default function OrderForm() {
  const navigate = useNavigate();
  const formik = useFormik<OrderFormValues>({
    initialValues: {
      id: Math.floor(new Date().getTime() + Math.random()).toString(),
      client: {
        userId: '',
        name: '',
        surname: '',
        phoneNumber: '',
      },
      quantity: 1,
      orderTitle: '',
      orderContent: '',
    },
    onSubmit: async (values: OrderFormValues) => {
      await createOrder(values);
      alert('Zamówienie złożone poprawnie!');
      navigate('/orders');
    },
    validationSchema: orderYupSchema,
  });
  const [clientOrders, setClientOrders] = useState<ClientProps[]>([]);

  useEffect(() => {
    fetchAllClient().catch((error) => {
      console.error('Błąd podczas fetchAllClient:', error);
    });
  }, []);

  const fetchAllClient = async () => {
    try {
      const data: ClientProps[] = await getAllClientOrders();
      setClientOrders(data);
    } catch (error) {
      console.error('Błąd ładowania danych');
    }
  };

  function handleClientChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedClient = clientData.find(
      (client) => client.phoneNumber === event.target.value
    );
    formik.setFieldValue('client', selectedClient);
  }

  const clientData =
    clientOrders.length > 0
      ? clientOrders.map((item) => {
          return {
            userId: item.id,
            name: item.name,
            surname: item.surname,
            phoneNumber: item.phoneNumber,
          };
        })
      : [];

  // console.log("formik errors", formik.errors); // TODO: to do kolejnego todo odnośnie walidacji selecta

  return (
    <form
      className="mx-auto grid max-w-sm grid-cols-1 "
      onSubmit={formik.handleSubmit}
    >
      <div className="mb-5">
        <Select
          label="Imie i naziwsko"
          name="client"
          value={formik.values.client?.phoneNumber || ''}
          options={clientData}
          onChange={handleClientChange}
          onBlur={formik.handleBlur}
        />
        {/* TODO: poprawić walidacje selecta */}
        {formik.touched.client && formik.errors.client && (
          <p className={`${errorInfoClass}`}>Wybierz klienta</p>
        )}
      </div>
      <div className="mb-5">
        <Input
          type="number"
          label="Ilość"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.quantity && formik.errors.quantity && (
          <p className={`${errorInfoClass}`}>{formik.errors.quantity}</p>
        )}
      </div>
      <div className="mb-5">
        <Input
          type="text"
          label="Tytuł zamówienia"
          name="orderTitle"
          value={formik.values.orderTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.orderTitle && formik.errors.orderTitle && (
          <p className={`${errorInfoClass}`}>{formik.errors.orderTitle}</p>
        )}
      </div>
      <div className="mb-5">
        <Textarea
          label="Treść zamówienia"
          name="orderContent"
          value={formik.values.orderContent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.orderContent && formik.errors.orderContent && (
          <p className={`${errorInfoClass}`}>{formik.errors.orderContent}</p>
        )}
      </div>
      <div className="mx-auto mt-3 flex justify-center gap-4 p-3">
        <Button type="submit" btnStyles="btnAdd">
          Dodaj
        </Button>
      </div>
    </form>
  );
}

const errorInfoClass = 'text-rose-400 text-sm';
