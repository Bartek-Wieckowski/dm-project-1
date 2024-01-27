import { OrderFormValues, orderYupSchema } from "../../validators/validators";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, getAllClientOrders } from "../../api/apiOrders";
import { ClientProps } from "../../types/ClientProps.type";
import Button from "../Button";

export default function OrderForm() {
  const navigate = useNavigate();
  const formik = useFormik<OrderFormValues>({
    initialValues: {
      id: Math.floor(new Date().getTime() + Math.random()).toString(),
      client: {
        userId: "",
        name: "",
        surname: "",
        phoneNumber: "",
      },
      quantity: 1,
      orderTitle: "",
      orderContent: "",
    },
    onSubmit: async (values: OrderFormValues) => {
      await createOrder(values);
      alert("Zamówienie złożone poprawnie!");
      navigate("/orders");
    },
    validationSchema: orderYupSchema,
  });
  const [clientOrders, setClientOrders] = useState<ClientProps[]>([]);

  useEffect(() => {
    fetchAllClient().catch((error) => {
      console.error("Błąd podczas fetchAllClient:", error);
    });
  }, []);

  const fetchAllClient = async () => {
    try {
      const data: ClientProps[] = await getAllClientOrders();
      setClientOrders(data);
    } catch (error) {
      console.error("Błąd ładowania danych");
    }
  };

  function handleClientChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedClient = clientData.find((client) => client.phoneNumber === event.target.value);
    formik.setFieldValue("client", selectedClient);
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
    <form className="mx-auto grid max-w-sm grid-cols-1 " onSubmit={formik.handleSubmit}>
      <div className="mb-5">
        <label htmlFor="client" className={`${labelClass}`}>
          Imie i naziwsko
        </label>
        <select
          id="client"
          name="client"
          onChange={handleClientChange}
          onBlur={formik.handleBlur}
          value={formik.values.client?.phoneNumber || ""}
        >
          <option value="" label="Wybierz klienta" />
          {clientData.map((client) => (
            <option key={client.phoneNumber} value={client.phoneNumber}>
              {client.name} {client.surname}
            </option>
          ))}
        </select>
        {/* TODO: poprawić walidacje selecta */}
        {formik.touched.client && formik.errors.client && (
          <p className={`${errorInfoClass}`}>Wybierz klienta</p>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="quantity" className={`${labelClass}`}>
          Ilość
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className={`${inputClass}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.quantity}
        />
        {formik.touched.quantity && formik.errors.quantity && (
          <p className={`${errorInfoClass}`}>{formik.errors.quantity}</p>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="orderTitle" className={`${labelClass}`}>
          Tytuł zamówienia
        </label>
        <input
          type="text"
          id="orderTitle"
          name="orderTitle"
          className={`${inputClass}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.orderTitle}
        />
        {formik.touched.orderTitle && formik.errors.orderTitle && (
          <p className={`${errorInfoClass}`}>{formik.errors.orderTitle}</p>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="orderContent" className={`${labelClass}`}>
          Treść zamówienia
        </label>
        <textarea
          id="orderContent"
          name="orderContent"
          className={`${inputClass}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.orderContent}
        ></textarea>
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

const inputClass =
  "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";
const labelClass = "mb-2 block text-sm font-medium text-gray-900 dark:text-white";
const errorInfoClass = "text-rose-400 text-sm";
