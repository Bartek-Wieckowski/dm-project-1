import { MoneyFormValues, moneyYupSchema } from '../../validators/validators';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LabelMapType } from './moneyFormLabels';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { deposit, withdraw } from '../../redux/money/moneySlice';
import { useNotification } from '../../contexts/NotificationContext';
import Input from '../Form/Input';
import Button from '../Button';

type MoneyFormProps = {
  depositForm: boolean;
};

export default function MoneyForm({ depositForm }: MoneyFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const moneyState = useAppSelector((state) => state.money.initialValue);
  const { showNotification } = useNotification();

  const formik = useFormik<MoneyFormValues>({
    initialValues: {
      value: 0,
    },
    onSubmit: (values: MoneyFormValues) => {
      const { value } = values;
      if (!depositForm) {
        if (value <= moneyState) {
          dispatch(withdraw(value));
          showNotification('Operacja poprawna', 'info');
        } else {
          showNotification('Nie masz tyle środków na koncie...', 'error');
        }
      } else {
        dispatch(deposit(value));
        showNotification('Operacja poprawna', 'info');
      }
      formik.resetForm();
      navigate('/money');
    },
    validationSchema: moneyYupSchema,
  });

  const fieldOrder = ['value'];

  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">
        {depositForm ? 'Wpłać' : 'Wypłać'}
      </h1>

      <form
        className="mx-auto grid max-w-lg grid-cols-1"
        onSubmit={formik.handleSubmit}
      >
        {fieldOrder.map((fieldName) => (
          <div className="mb-5" key={fieldName}>
            <Input
              type="number"
              label="Wpisz kwotę"
              name={fieldName}
              value={(formik.values as LabelMapType)[fieldName]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={0}
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
          <Button type="submit" btnStyles="btnQty">
            {depositForm ? 'Wpłać' : 'Wypłać'}
          </Button>
        </div>
      </form>
    </>
  );
}

const errorInfoClass = 'text-rose-400 text-sm';
