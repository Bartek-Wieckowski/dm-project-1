import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { UserAccount, registerAccountYupSchema } from "../../validators/validators";
import Button from "../Button";
import Input from "../Form/Input";
import { useRegisterUser } from "../../api/mutations/users/useRegisterUser";
import { RANDOM_IMG_URL } from "../../constants/appConst";

export default function Register() {
  const { addNewUser } = useRegisterUser();
  const navigate = useNavigate();
  const formik = useFormik<UserAccount>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: RANDOM_IMG_URL,
    },
    onSubmit: (values: UserAccount) => {
      addNewUser(values);
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
            <Input
              type="text"
              label="Imię"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className={`${errorInfoClass}`}>{formik.errors.name}</p>
            )}
          </div>
          <div className="mb-5">
            <Input
              type="text"
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className={`${errorInfoClass}`}>{formik.errors.username}</p>
            )}
          </div>
          <div className="mb-5">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className={`${errorInfoClass}`}>{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-5">
            <Input
              label="Hasło"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={`${errorInfoClass}`}>{formik.errors.password}</p>
            )}
          </div>
          <div className="mb-5">
            <Input
              label="Powtórz hasło"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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

const errorInfoClass = "text-rose-400 text-sm";
