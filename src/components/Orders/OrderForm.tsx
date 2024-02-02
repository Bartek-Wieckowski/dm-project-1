import { OrderFormValues, orderYupSchema } from "../../validators/validators";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useOrderCreate } from "../../api/mutations/orders/useOrderCreate";
import { useClients } from "../../api/queries/clients/useClients";
import Button from "../Button";
import Select from "../Form/Select";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";

export default function OrderForm() {
  const navigate = useNavigate();
  const { clientsAll: clientOrders } = useClients();
  const { createOrder } = useOrderCreate();
  const formik = useFormik<OrderFormValues>({
    initialValues: {
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
    onSubmit: (values: OrderFormValues) => {
      createOrder(values);
      navigate("/orders");
    },
    validationSchema: orderYupSchema,
  });

  function handleClientChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedClient = clientData.find((client) => client.phoneNumber === event.target.value);
    formik.setFieldValue("client", selectedClient).catch((error) => {
      console.error("Błąd podczas wybierania klienta:", error);
    });
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

  return (
    <form className="mx-auto grid max-w-sm grid-cols-1 " onSubmit={formik.handleSubmit}>
      <div className="mb-5">
        <Select
          label="Imie i naziwsko"
          name="client"
          value={formik.values.client?.phoneNumber || ""}
          options={clientData}
          onChange={handleClientChange}
          onBlur={formik.handleBlur}
        />
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

const errorInfoClass = "text-rose-400 text-sm";
