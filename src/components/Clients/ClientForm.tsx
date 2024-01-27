import { ClientFormValues, clientYupSchema } from "../../validators/validators";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { LabelMapType, labelMap } from "./clientFormLabels";
import { addClient, updateClientById } from "../../api/apiClients";
import Button from "../Button";

interface ClientFormProps {
  editForm: boolean;
  editValues?: ClientFormValues & { id: string };
}

export default function ClientForm({ editForm, editValues }: ClientFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik<ClientFormValues>({
    initialValues: editValues || {
      name: "",
      surname: "",
      street: "",
      postCode: "",
      town: "",
      subRegion: "",
      imgSrc: "",
      phoneNumber: "",
    },
    onSubmit: async (values: ClientFormValues) => {
      if (!editForm) {
        await addClient(values);
        alert("Klient dodany poprawnie!");
        navigate("/clients");
      } else if (values.id) {
        await updateClientById(values, values.id);
        alert("Aktualizacja danych wykonana poprawnie");
        navigate(`/clients/${values.id}`);
      }
    },
    validationSchema: clientYupSchema,
  });

  const fieldOrder = ["name", "surname", "street", "postCode", "town", "subRegion", "imgSrc", "phoneNumber"];

  const handleClickBack = (): void => {
    navigate(`/clients/${id}`);
  };

  return (
    <>
      <h1 className="mb-5 pt-2 text-center text-5xl text-stone-200">
        {editForm ? "Edytuj dane" : "Dodaj Klienta"}
      </h1>

      <form
        className="mx-auto grid max-w-lg grid-cols-1 sm:grid-cols-2 sm:gap-10"
        onSubmit={formik.handleSubmit}
      >
        {fieldOrder.map((fieldName) => (
          <div className="mb-5" key={fieldName}>
            <label htmlFor={fieldName} className={`${labelClass}`}>
              {labelMap[fieldName]}
            </label>
            <input
              type="text"
              id={fieldName}
              name={fieldName}
              className={`${inputClass}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={(formik.values as LabelMapType)[fieldName]}
            />
            {(formik.touched as Record<string, boolean>)[fieldName] &&
              (formik.errors as Record<string, string>)[fieldName] && (
                <p className={`${errorInfoClass}`}>{(formik.errors as Record<string, string>)[fieldName]}</p>
              )}
          </div>
        ))}

        <div className="col-span-2 mx-auto mt-3 flex justify-center gap-4 p-3">
          {editForm && (
            <>
              <Button type="button" btnStyles="btnCancel" onClick={handleClickBack}>
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

const inputClass =
  "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";
const labelClass = "mb-2 block text-sm font-medium text-gray-900 dark:text-white";
const errorInfoClass = "text-rose-400 text-sm";
