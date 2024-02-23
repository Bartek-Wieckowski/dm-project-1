import { step3FormProps } from '../../types/Invoice.types';
import { errorInfoClass } from '../../utils/helpers';
import Input from '../Form/Input';

export default function Step3Form({
  formik,
  selectedClient,
  selectedOrder,
}: step3FormProps) {
  const clientDetails = selectedClient;
  const ordersDetails = selectedOrder;
  return (
    <>
      <div>
        <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
          Podsumowanie:
        </h2>
      </div>
      <div>
        <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
          Klient:
        </h2>
        <div className="mb-6 flex flex-col gap-3">
          <p className=" text-slate-900 dark:text-stone-200">
            ID: {clientDetails.id}
          </p>
          <p className=" text-slate-900 dark:text-stone-200">
            Imię: {clientDetails.name}
          </p>
          <p className=" text-slate-900 dark:text-stone-200">
            Nazwisko: {clientDetails.surname}
          </p>
          <p className=" text-slate-900 dark:text-stone-200">
            Numer tel: {clientDetails.phoneNumber}
          </p>
        </div>
        <div className="">
          <div key={ordersDetails.id} className="mb-3">
            <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
              Płaci za: {ordersDetails.orderTitle}
            </h2>
            <Input
              label="Cena"
              name="invoiceCost"
              type="text"
              value={formik.values.invoiceCost || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.invoiceCost && formik.errors.invoiceCost && (
              <p className={`${errorInfoClass}`}>{formik.errors.invoiceCost}</p>
            )}
            <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
              Daty:
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div>
                <Input
                  label="Data"
                  name="startDate"
                  type="text"
                  value={formik.values.startDate || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <p className={`${errorInfoClass}`}>
                    {formik.errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Data"
                  name="endDate"
                  type="text"
                  value={formik.values.endDate || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <p className={`${errorInfoClass}`}>{formik.errors.endDate}</p>
                )}
              </div>
              <input
                type="hidden"
                value={(formik.values.orderId = ordersDetails.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
