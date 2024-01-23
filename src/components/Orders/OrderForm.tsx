import * as yup from "yup";
import { useFormik } from "formik";
import { yupSchema } from "./orderFormYupSchema";
import cards from "../../assets/dummy-data/cards-data";
import Button from "../Button";

type FormValues = yup.InferType<typeof yupSchema>;

export default function OrderForm() {
  const formik = useFormik<FormValues>({
    initialValues: {
      client: "",
      quantity: 1,
      orderTitle: "",
      orderContent: "",
    },
    onSubmit: (values: FormValues) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: yupSchema,
  });

  return (
    <form className="mx-auto grid max-w-sm grid-cols-1 " onSubmit={formik.handleSubmit}>
      <div className="mb-5">
        <label htmlFor="client" className={`${labelClass}`}>
          Imie i naziwsko
        </label>
        <select
          id="client"
          name="client"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.client}
        >
          <option value="" label="Wybierz klienta" />
          {cards.map((client) => (
            <option key={client.phoneNumber} value={client.phoneNumber}>
              {client.name} {client.surname}
            </option>
          ))}
        </select>
        {formik.touched.client && formik.errors.client && (
          <p className={`${errorInfoClass}`}>{formik.errors.client}</p>
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
