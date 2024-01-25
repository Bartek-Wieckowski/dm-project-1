import * as yup from "yup";
export const yupSchema = yup.object().shape({
  id: yup.string().required(),
  client: yup.object().shape({
    userId: yup.string().required("Pole wymagane"),
    name: yup.string().required("Pole wymagane"),
    surname: yup.string().required("Pole wymagane"),
    phoneNumber: yup.string().required("Pole wymagane"),
  }),
  quantity: yup
    .number()
    .min(1, "Ilość musi być większa lub równa 1")
    .max(15, "Ilość musi być mniejsza lub równa 15")
    .required("Pole wymagane"),
  orderTitle: yup
    .string()
    .min(5, "Tytuł zamówienia musi mieć co najmniej 5 znaków")
    .required("Pole wymagane"),
  orderContent: yup
    .string()
    .min(10, "Treść zamówienia musi mieć co najmniej 10 znaków")
    .required("Pole wymagane"),
});
