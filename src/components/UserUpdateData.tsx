import { useFormik } from 'formik';
import { updateUserData, uploadAndGenerateFileLink } from '../api/apiUsers';
import { useUser } from '../contexts/useUser';
import {
  UpdateUserDataForm,
  updateUserDataYupSchema,
} from '../validators/validators';
import { errorInfoClass } from '../utils/helpers';
import Button from './Button';
import Input from './Form/Input';
import { useNotification } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function UserUpdateData() {
  const {
    userData: { user },
    updatedUser,
  } = useUser();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const formik = useFormik<UpdateUserDataForm>({
    initialValues: {
      name: user?.name || '',
      username: user?.username || '',
      avatar: null,
    },
    onSubmit: async (values: UpdateUserDataForm) => {
      let fileName = '';
      let avatarUrl = user?.avatar ?? '';
      const userID: number | null = user?.id ?? null;

      if (userID !== null) {
        fileName = `avatar-userID-${userID}-${Math.random()}`;
      } else {
        console.error('Nazwa użytkownika jest niezdefiniowana.');
      }

      if (values.avatar) {
        const response = await uploadAndGenerateFileLink(
          fileName,
          values.avatar
        );
        if (response) {
          avatarUrl = response;
        }
      }

      try {
        if (userID !== null) {
          await updateUserData(userID, {
            name: values.name,
            username: values.username,
            avatar: avatarUrl,
          });
          updatedUser({
            id: userID,
            name: values.name,
            username: values.username,
            avatar: avatarUrl,
          });
        }
        showNotification('Dane zmienione poprawnie', 'success');
        navigate('/');
      } catch (error) {
        showNotification('Coś poszło nie tak...', 'error');
      }
    },
    validationSchema: updateUserDataYupSchema,
  });
  const handleOnChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      formik
        .setFieldValue('avatar', e.currentTarget.files[0])
        .catch((error) => {
          console.error(
            'Wystąpił błąd podczas ustawiania wartości avatara:',
            error
          );
        });
    }
  };

  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">
        Zmiana danych użytkownika
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto grid max-w-sm grid-cols-1">
          <div className="mb-5">
            <Input
              type="text"
              label="Imię"
              name="name"
              value={formik.values.name ?? ''}
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
              <div>{formik.errors.username}</div>
            )}
          </div>
          <div className="mb-5">
            <div className="mb-5 flex flex-col">
              <small className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                Obecny avatar:
                <img
                  src={user?.avatar}
                  alt="Obrazek"
                  className="ml-5 inline-block size-[30px] rounded"
                />
              </small>
            </div>
            <label htmlFor="avatar" className="mb-2 mr-5 block text-sm font-medium text-gray-900 dark:text-white">
              Zdjęcie:
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleOnChangeAvatar}
            />
          </div>
          <Button type="submit" btnStyles="btnEdit">
            Zapisz zmiany
          </Button>
        </div>
      </form>
    </>
  );
}
