import { useClients } from '../../api/queries/clients/useClients';
import { step1FormProps } from '../../types/Invoice.types';
import { errorInfoClass } from '../../utils/helpers';
import Select from '../Form/Select';

export default function Step1Form({
  formik,
  selectedClient,
  chosenClient,
}: step1FormProps) {
  const { clientsAll: clientOrders } = useClients();

  function handleClientChange(event: React.ChangeEvent<HTMLSelectElement>) {
    formik.values.orderId = null;
    const selectedPhoneNumber = event.target.value;
    const userSelectedClient = clientOrders?.find(
      (client) => client.phoneNumber === selectedPhoneNumber
    );

    formik.setFieldValue('phoneNumber', selectedPhoneNumber).catch((error) => {
      console.error('Błąd podczas wybierania klienta:', error);
    });
    if (userSelectedClient) {
      chosenClient(userSelectedClient);
    }
  }

  const clientData =
    clientOrders && clientOrders.length > 0
      ? clientOrders.map((item) => {
          return {
            id: item.id,
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
          value={formik.values.phoneNumber || ''}
          options={clientData}
          onChange={handleClientChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <p className={`${errorInfoClass}`}>Wybierz klienta</p>
        )}
      </div>
      {selectedClient && (
        <div>
          <h2 className="mb-4 text-xl text-slate-900 dark:text-stone-200">
            Dane klienta:
          </h2>
          <div className="flex flex-col gap-3">
            <p className=" text-slate-900 dark:text-stone-200">
              ID: {selectedClient.id}
            </p>
            <p className=" text-slate-900 dark:text-stone-200">
              Imię: {selectedClient.name}
            </p>
            <p className=" text-slate-900 dark:text-stone-200">
              Nazwisko: {selectedClient.surname}
            </p>
            <p className=" text-slate-900 dark:text-stone-200">
              Numer tel: {selectedClient.phoneNumber}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
