import { useNavigate, useParams } from "react-router-dom";
import { useClientDetails } from "./useClientDetails";
import { useClientDelete } from "./useClientDelete";
import Button from "../Button";
import Loader from "../Loader";
import TableRow from "../Tables/TableRow";
import TableTh from "../Tables/TableTh";
import TableTd from "../Tables/TableTd";
import Modal from "../../contexts/ModalContext";

type ParamsType = {
  id?: string;
};

export default function ClientDetails() {
  const { id } = useParams<ParamsType>();
  const navigate = useNavigate();
  const { isLoading, clientDetails: client, error: clientNotFound } = useClientDetails(id || "");
  const { deleteClient } = useClientDelete();

  if (isLoading) {
    return <Loader />;
  }

  if (clientNotFound) {
    return <div className="text-center text-5xl text-stone-200">Nie znaleziono klienta o ID: {id}</div>;
  }

  if (!client) {
    return <></>;
  }

  const { id: clientId, imgSrc, name, surname, street, postCode, town, subRegion, phoneNumber } = client;

  const fieldsTh = [{ label: "Kategoria" }, { label: "Dane" }];

  const fields = [
    { label: "Imie", value: name },
    { label: "Nazwisko", value: surname },
    { label: "Ulica", value: street },
    { label: "Kod pocztowy", value: postCode },
    { label: "Miasto", value: town },
    { label: "Region", value: subRegion },
    {
      label: "Zdjęcie",
      value: <img src={imgSrc} alt={name} className="size-1/2 rounded" />,
    },
    { label: "Numer telefonu", value: phoneNumber },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="p-3">
        <h3 className="text-center text-5xl text-stone-200">Klient: {clientId} </h3>
      </div>
      <div className="flex gap-4 p-3">
        <Modal>
          <Modal.Open opensWindowName="deleteConfirmation">
            <Button type="button" btnStyles="btnDelete">
              Usuń
            </Button>
          </Modal.Open>
          <Modal.Window
            name="deleteConfirmation"
            clickOk={() => {
              deleteClient(clientId);
              navigate("/clients");
            }}
            showButtonOk={true}
          >
            <div className="text-center">Czy na pewno chcesz usunąć tego klienta?</div>
          </Modal.Window>
        </Modal>
        <Button to={`/clients/${clientId}/edit`} btnStyles="btnEdit">
          Edytuj
        </Button>
      </div>

      <div className="relative mx-auto max-w-[400px] overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
            <TableRow>
              {fieldsTh.map((fieldTh, index) => (
                <TableTh key={index} scope="col" label={fieldTh.label} className="px-6 py-3" />
              ))}
            </TableRow>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <TableRow className="bg-gray-800" key={index}>
                <TableTh
                  scope={"row"}
                  label={field.label}
                  className={"whitespace-nowrap px-6 py-4 font-medium text-white"}
                />
                <TableTd value={field.value} className="px-3 py-6" />
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
