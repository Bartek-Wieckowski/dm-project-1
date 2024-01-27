import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { RegisterFormValues, registerAccountYupSchema } from "../../validators/validators";
import Button from "../Button";

export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values: RegisterFormValues) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
      navigate("/");
    },
    validationSchema: registerAccountYupSchema,
  });
  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">Rejestracja</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto grid max-w-lg grid-cols-1 sm:grid-cols-2 sm:gap-10">
          <div className="mb-5">
            <label htmlFor="name" className={`${labelClass}`}>
              Imię:
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
            {formik.touched.name && formik.errors.name && (
              <p className={`${errorInfoClass}`}>{formik.errors.name}</p>
            )}
          </div>
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
          <div className="mb-5">
            <label htmlFor="email" className={`${labelClass}`}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${inputClass}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className={`${errorInfoClass}`}>{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className={`${labelClass}`}>
              Hasło:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${inputClass}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={`${errorInfoClass}`}>{formik.errors.password}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="confirmPassword" className={`${labelClass}`}>
              Powtórz hasło:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`${inputClass}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className={`${errorInfoClass}`}>{formik.errors.confirmPassword}</p>
            )}
          </div>
        </div>
        <div className="mx-auto mt-3 flex justify-center gap-4 p-3">
          <Button type="submit" btnStyles="btnAdd">
            Rejestruj
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
