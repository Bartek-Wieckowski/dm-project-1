import { useNavigate } from 'react-router-dom';
import { useInvoiceDelete } from '../api/mutations/invoices/useInvoiceDelete';
import { useInvoices } from '../api/queries/invoices/useInvoices';
import Button from '../components/Button';
import TableRow from '../components/Tables/TableRow';
import TableTd from '../components/Tables/TableTd';
import TableTh from '../components/Tables/TableTh';
import Modal from '../contexts/ModalContext';

export default function Invoicespage() {
  const { invoicesAll: invoicesData } = useInvoices();
  const { deleteClient } = useInvoiceDelete();
  const navigate = useNavigate();

  const fieldsTh = [
    { label: 'ID' },
    { label: 'Cena' },
    { label: 'Data wystawienia' },
    { label: 'Szczegóły' },
  ];
  return (
    <div className="text-slate-900 dark:text-stone-200">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-5xl"> Invoices pages</h2>
        <Button btnStyles="btnAdd" to="/invoices/add">
          Dodaj fakture
        </Button>
      </div>
      <div className="relative mx-auto max-w-7xl overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
            <TableRow>
              {fieldsTh.map((fieldTh, index) => (
                <TableTh
                  key={index}
                  scope="col"
                  label={fieldTh.label}
                  className="w-1/4 px-6 py-4 text-center font-bold uppercase text-gray-600"
                />
              ))}
            </TableRow>
          </thead>
          <tbody>
            {invoicesData.map((invoice) => (
              <TableRow className="bg-gray-800  pb-2" key={invoice.id}>
                <TableTd
                  className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                  value={invoice.id}
                />
                <TableTd
                  className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                  value={invoice.invoiceCost}
                />
                <TableTd
                  className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white"
                  value={invoice.startDate}
                />
                <TableTd className="border-b border-slate-500 px-3 py-6 text-center  font-medium  text-white">
                  <Button to={`${invoice.id}`} btnStyles="btnUpdate">
                    Zobacz
                  </Button>
                  <Modal>
                    <Modal.Open opensWindowName="deleteConfirmation">
                      <Button type="button" btnStyles="btnDelete">
                        Usuń
                      </Button>
                    </Modal.Open>
                    <Modal.Window
                      name="deleteConfirmation"
                      clickOk={() => {
                        deleteClient(invoice.id);
                        navigate('/invoices');
                      }}
                      showButtonOk={true}
                    >
                      <div className="text-center">
                        Czy na pewno chcesz usunąć tą fakture?
                      </div>
                    </Modal.Window>
                  </Modal>
                </TableTd>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
