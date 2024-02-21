import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { registerAccountYupSchema } from '../../validators/validators';
import Button from '../Button';
import Input from '../Form/Input';
import { useRegisterUser } from '../../api/mutations/users/useRegisterUser';
import { RANDOM_IMG_URL } from '../../constants/appConst';
import { Tables } from '../../../types/supabase';
import { useNotification } from '../../contexts/NotificationContext';
import { errorInfoClass } from '../../utils/helpers';

type FormValuesFromSupabase = Omit<Tables<'dm-project-1-users'>, 'id'>;

export default function Register() {
  const { addNewUser } = useRegisterUser();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const formik = useFormik<FormValuesFromSupabase>({
    initialValues: {
      name: '',
      username: '',
      avatar: RANDOM_IMG_URL,
    },
    onSubmit: (values: FormValuesFromSupabase) => {
      try {
        addNewUser(values);
        formik.resetForm();
        navigate('/');
        showNotification('Konto utworzone poprawnie!', 'success'); //FIXME: przenesienie notifikacje z useRegisterUser.ts
      } catch (error) {
        showNotification('Coś poszło nie tak...', 'error'); //FIXME: przenesienie notifikacje z useRegisterUser.ts
      }
    },
    validationSchema: registerAccountYupSchema,
  });

  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">
        Rejestracja
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto grid max-w-lg grid-cols-1 sm:grid-cols-2 sm:gap-10">
          <div className="mb-5">
            <Input
              type="text"
              label="Imię"
              name="name"
              value={formik.values.name ?? ''} //FIXME: lepiej ?? nullish
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
              value={formik.values.username || ''} //FIXME: czy lepiej OR
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
            Rejestruj
          </Button>
        </div>
      </form>
    </>
  );
}
