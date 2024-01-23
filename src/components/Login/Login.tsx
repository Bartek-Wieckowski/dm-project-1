import * as yup from "yup";
import { useFormik } from "formik";
import { yupSchema } from "./loginFormYupSchema";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

type FormValues = yup.InferType<typeof yupSchema>;

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
    },
    onSubmit: (values: FormValues) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
      navigate("/");
    },
    validationSchema: yupSchema,
  });

  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">Logowanie</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto grid max-w-sm grid-cols-1">
          <div className="mb-5">
            <label htmlFor="username" className={`${labelClass}`}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`${inputClass}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <p className={`${errorInfoClass}`}>{formik.errors.username}</p>
            )}
          </div>
        </div>
        <div className="mx-auto mt-3 flex justify-center gap-4 p-3">
          <Button type="submit" btnStyles="btnAdd">
            Zaloguj
          </Button>
        </div>
      </form>
    </>
  );
}

const inputClass =
  "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";
const labelClass = "mb-2 block text-sm font-medium text-gray-900 dark:text-white";
const errorInfoClass = "text-rose-400 text-sm";
