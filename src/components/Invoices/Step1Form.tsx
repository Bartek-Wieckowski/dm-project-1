// Step1Form.tsx
import { useClients } from '../../api/queries/clients/useClients';
import { InvoiceFormikProps } from '../../types/Invoice.types';
import Select from '../Form/Select';

export default function Step1Form({ formik }: InvoiceFormikProps) {
  const { clientsAll: clientOrders } = useClients();

  function handleClientChange(event: React.ChangeEvent<HTMLSelectElement>) {
    formik.values.selectedOrders = [];
    const selectedClient = clientData.find(
      (client) => client.phoneNumber === event.target.value
    );
    if(selectedClient){
      formik.setFieldValue('selectedClient', selectedClient).catch((error) => {
        console.error('Błąd podczas wybierania klienta:', error);
      });
    }
  }

  const clientData =
    clientOrders.length > 0
      ? clientOrders.map((item) => {
          return {
            userId: item.id,
            name: item.name,
            surname: item.surname,
            phoneNumber: item.phoneNumber,
          };
        })
      : [];

  return (
    <>
      <div className="mb-5">
        <Select
          label="Klient"
          name="selectedClient"
          value={formik.values.selectedClient?.phoneNumber || ''}
          options={clientData}
          onChange={handleClientChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.selectedClient && formik.errors.selectedClient && (
          <p className={`${errorInfoClass}`}>Wybierz klienta</p>
        )}
      </div>
      {formik.values.selectedClient?.phoneNumber && (
        <div>
          <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
            Dane klienta:
          </h2>
          <div className="flex flex-col gap-3">
            <p className=" text-slate-900 dark:text-stone-200">
              ID: {formik.values.selectedClient.userId}
            </p>
            <p className=" text-slate-900 dark:text-stone-200">
              Imię: {formik.values.selectedClient.name}
            </p>
            <p className=" text-slate-900 dark:text-stone-200">
              Nazwisko: {formik.values.selectedClient.surname}
            </p>
            <p className=" text-slate-900 dark:text-stone-200">
              Numer tel: {formik.values.selectedClient.phoneNumber}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

const errorInfoClass = 'text-rose-400 text-sm';
