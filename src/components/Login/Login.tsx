import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  LoginFormValues,
  loginAccountyupSchema,
} from '../../validators/validators';
import Button from '../Button';
import Input from '../Form/Input';

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
    },
    onSubmit: (values: LoginFormValues) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
      navigate('/');
    },
    validationSchema: loginAccountyupSchema,
  });

  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">
        Logowanie
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto grid max-w-sm grid-cols-1">
          <div className="mb-5">
            <Input
              type="text"
              label="Imię"
              name="name"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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

const errorInfoClass = 'text-rose-400 text-sm';
