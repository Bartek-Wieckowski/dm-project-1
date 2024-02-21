import { clientYupSchema } from '../../validators/validators';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { LabelMapType, labelMap } from './clientFormLabels';
import { useClientEdit } from '../../api/mutations/clients/useClientEdit';
import { useClientAdd } from '../../api/mutations/clients/useClientAdd';
import { errorInfoClass } from '../../utils/helpers';
import Input from '../Form/Input';
import Button from '../Button';
import { ClientProps } from '../../types/ClientProps.type';

export type ClientFormValuesFromSupabase = Omit<ClientProps, 'id'>;
type ClientFormProps = {
  editForm: boolean;
  editValues?: ClientFormValuesFromSupabase;
};

export default function ClientForm({ editForm, editValues }: ClientFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addClient } = useClientAdd();
  const { updateClientById } = useClientEdit();

  const formik = useFormik<ClientFormValuesFromSupabase>({
    initialValues: editValues || {
      name: '',
      surname: '',
      street: '',
      code: '',
      city: '',
      region: '',
      imageUrl: '',
      phoneNumber: '',
    },
    onSubmit: (values: ClientFormValuesFromSupabase & { id?: number }) => {
      if (!editForm) {
        addClient(values);
        navigate('/clients');
      } else if (values.id) {
        updateClientById({
          updateClientData: values,
          clientId: values.id,
        });
        navigate(`/clients/${values.id}`);
      }
    },
    validationSchema: clientYupSchema,
  });

  const fieldOrder = [
    'name',
    'surname',
    'street',
    'code',
    'city',
    'region',
    'imageUrl',
    'phoneNumber',
  ];

  const handleClickBack = (): void => {
    if (id) {
      navigate(`/clients/${id}`);
    }
  };

  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">
        {editForm ? 'Edytuj dane' : 'Dodaj Klienta'}
      </h1>

      <form
        className="mx-auto grid max-w-lg grid-cols-1 sm:grid-cols-2 sm:gap-10"
        onSubmit={formik.handleSubmit}
      >
        {fieldOrder.map((fieldName) => (
          <div className="mb-5" key={fieldName}>
            <Input
              type="text"
              label={labelMap[fieldName]}
              name={fieldName}
              value={(formik.values as LabelMapType)[fieldName]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {(formik.touched as Record<string, boolean>)[fieldName] &&
              (formik.errors as Record<string, string>)[fieldName] && (
                <p className={`${errorInfoClass}`}>
                  {(formik.errors as Record<string, string>)[fieldName]}
                </p>
              )}
          </div>
        ))}

        <div className="col-span-2 mx-auto mt-3 flex justify-center gap-4 p-3">
          {editForm && (
            <>
              <Button
                type="button"
                btnStyles="btnCancel"
                onClick={handleClickBack}
              >
                Anuluj
              </Button>
              <Button type="submit" btnStyles="btnUpdate">
                Aktualizuj
              </Button>
            </>
          )}
          {!editForm && (
            <Button type="submit" btnStyles="btnAdd">
              Dodaj
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
