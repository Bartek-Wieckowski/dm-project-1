import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { LoginFormValues, loginAccountyupSchema } from "../../validators/validators";
import { useUser } from "../../contexts/useUser";
import Button from "../Button";
import Input from "../Form/Input";

export default function Login() {
  const navigate = useNavigate();
  const {
    logIn,
    userData: { isLoginError },
  } = useUser();
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
    },
    onSubmit: async (values: LoginFormValues) => {
      await logIn(values.username);
      formik.resetForm();
      navigate("/");
    },
    validationSchema: loginAccountyupSchema,
  });

  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">Logowanie</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto grid max-w-sm grid-cols-1">
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
            {isLoginError ? <p className={`${errorInfoClass}`}>Taki username nie istnieje...</p> : ""}
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

const errorInfoClass = "text-rose-400 text-sm";
