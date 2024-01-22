import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const inputClass =
  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500';
const labelClass =
  'mb-2 block text-sm font-medium text-gray-900 dark:text-white';

export default function ClientForm({ editForm }: { editForm: boolean }) {
  const navigate = useNavigate();
  const yupSchema = yup.object({
    name: yup
      .string()
      .required('Pole "Imię" jest wymagane')
      .min(3, 'Pole "Imię" musi mieć co najmniej 3 litery'),
    surname: yup
      .string()
      .required('Pole "Nazwisko" jest wymagane')
      .min(3, 'Pole "Nazwisko" musi mieć co najmniej 3 litery'),
    street: yup
      .string()
      .required('Pole "Ulica" jest wymagane')
      .min(5, 'Pole "Ulica" musi mieć co najmniej 5 liter'),
    zipCode: yup
      .string()
      .required('Pole "Kod pocztowy" jest wymagane')
      .matches(/^\d{2}-\d{3}$/, 'Pole "Kod pocztowy" musi mieć format 00-000'),
    city: yup
      .string()
      .required('Pole "Miasto" jest wymagane')
      .min(3, 'Pole "Miasto" musi mieć co najmniej 3 litery'),
    province: yup
      .string()
      .min(3, 'Pole "Region" musi mieć co najmniej 3 litery'),
    photo: yup.string(),
    phoneNumber: yup
      .string()
      .required('Pole "Numer telefonu" jest wymagane')
      .matches(
        /^\+\d{11}$/,
        'Pole "Numer telefonu" musi zaczynać się od "+" i mieć 11 cyfr'
      ),
  });

  type FormValues = yup.InferType<typeof yupSchema>;
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      surname: '',
      street: '',
      zipCode: '',
      city: '',
      province: '',
      photo: '',
      phoneNumber: '',
    },
    onSubmit: (values: FormValues) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: yupSchema,
  });

  const handleClickBack = (): void => {
    navigate(-1);
  };

  return (
    <>
      {editForm ? (
        <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">
          Edytuj dane
        </h1>
      ) : (
        <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">
          Dodaj Klienta
        </h1>
      )}
      <form
        className="mx-auto grid max-w-md grid-cols-1 sm:grid-cols-2 sm:gap-10"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="name" className={`${labelClass}`}>
            Imie
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`${inputClass}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-rose-400">{formik.errors.name}</p>
          ) : null}
        </div>
        <div className="mb-5">
          <label htmlFor="surname" className={`${labelClass}`}>
            Nazwisko
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            className={`${inputClass}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <p className="text-rose-400">{formik.errors.surname}</p>
          ) : null}
        </div>
        <div className="mb-5">
          <label htmlFor="street" className={`${labelClass}`}>
            Ulica
          </label>
          <input
            type="text"
            id="street"
            name="street"
            className={`${inputClass}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.street}
          />
          {formik.touched.street && formik.errors.street ? (
            <p className="text-rose-400">{formik.errors.street}</p>
          ) : null}
        </div>
        <div className="mb-5">
          <label htmlFor="zipCode" className={`${labelClass}`}>
            Kod pocztowy
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            className={`${inputClass}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zipCode}
          />
          {formik.touched.zipCode && formik.errors.zipCode ? (
            <p className="text-rose-400">{formik.errors.zipCode}</p>
          ) : null}
        </div>
        <div className="mb-5">
          <label htmlFor="city" className={`${labelClass}`}>
            Miasto
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className={`${inputClass}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city ? (
            <p className="text-rose-400">{formik.errors.city}</p>
          ) : null}
        </div>
        <div className="mb-5">
          <label htmlFor="province" className={`${labelClass}`}>
            Region
          </label>
          <input
            type="text"
            id="province"
            name="province"
            className={`${inputClass}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.province}
          />
          {formik.touched.province && formik.errors.province ? (
            <p className="text-rose-400">{formik.errors.province}</p>
          ) : null}
        </div>
        <div className="mb-5">
          <label htmlFor="photo" className={`${labelClass}`}>
            Zdjęcie (podaj url)
          </label>
          <input
            type="text"
            id="photo"
            name="photo"
            className={`${inputClass}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.photo}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="phoneNumber" className={`${labelClass}`}>
            Numer telefonu
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className={`${inputClass}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <p className="text-rose-400">{formik.errors.phoneNumber}</p>
          ) : null}
        </div>
        <div className="col-span-2 mx-auto mt-3 flex justify-center gap-4 p-3">
          {editForm && (
            <>
              <button
                onClick={handleClickBack}
                type="button"
                className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Aktualizuj
              </button>
            </>
          )}
          {!editForm && (
            <button
              type="submit"
              className="mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Dodaj
            </button>
          )}
        </div>
      </form>
    </>
  );
}
