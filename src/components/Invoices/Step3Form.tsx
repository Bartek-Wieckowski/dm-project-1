import { OrderData } from '../../types/Order.types';
import { InvoiceFormikProps } from '../../types/Invoice.types';
import Input from '../Form/Input';

export default function Step3Form({ formik }: InvoiceFormikProps) {
  const clientDetails = formik.values.selectedClient;
  const ordersDetails = formik.values.selectedOrders as OrderData[];
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
            ID: {clientDetails.userId}
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
          {ordersDetails?.map((order) => (
            <div key={order.id} className="mb-3">
              <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
                Płaci za: {order.orderTitle}
              </h2>
              <Input
                label="Cena"
                name="price"
                type="text"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && (
                <p className={`${errorInfoClass}`}>{formik.errors.price}</p>
              )}
              <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
                Daty:
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <Input
                    label="Data"
                    name="dateOfIssue"
                    type="text"
                    value={formik.values.dateOfIssue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.dateOfIssue && formik.errors.dateOfIssue && (
                    <p className={`${errorInfoClass}`}>
                      {formik.errors.dateOfIssue}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    label="Data"
                    name="accountingMonth"
                    type="text"
                    value={formik.values.accountingMonth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.accountingMonth &&
                    formik.errors.accountingMonth && (
                      <p className={`${errorInfoClass}`}>
                        {formik.errors.accountingMonth}
                      </p>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const errorInfoClass = 'text-rose-400 text-sm';
