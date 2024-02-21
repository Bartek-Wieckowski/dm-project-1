import * as yup from 'yup';

//commonValidators.ts
export const postValidator = yup
  .string()
  .required('Pole "Kod pocztowy" jest wymagane')
  .matches(/^\d{2}-\d{3}$/, 'Pole "Kod pocztowy" musi mieć format 00-000');

export const clientOrderValidator = yup.object().shape({
  userId: yup.string().required('Pole wymagane'),
  name: yup.string().required('Pole wymagane'),
  surname: yup.string().required('Pole wymagane'),
  phoneNumber: yup.string().required('Pole wymagane'),
});

// clientFormValidator
export const clientYupSchema = yup.object({
  id: yup.string(),
  name: yup
    .string()
    .required('Pole "Imię" jest wymagane')
    .min(3, 'Pole "Imię" musi mieć co najmniej 3 litery'),
  surname: yup
    .string()
    .required('Pole "Nazwisko" jest wymagane')
    .min(3, 'Pole "Nazwisko" musi mieć co najmniej 3 litery'),
  street: yup
    .string()
    .required('Pole "Ulica" jest wymagane')
    .min(5, 'Pole "Ulica" musi mieć co najmniej 5 liter'),
  postCode: postValidator,
  town: yup
    .string()
    .required('Pole "Miasto" jest wymagane')
    .min(3, 'Pole "Miasto" musi mieć co najmniej 3 litery'),
  subRegion: yup
    .string()
    .min(3, 'Pole "Region" musi mieć co najmniej 3 litery'),
  imgSrc: yup.string(),
  phoneNumber: yup
    .string()
    .required('Pole "Numer telefonu" jest wymagane')
    .matches(
      /^\+\d{1,3}(\s?\d{3}){2,}$/,
      'Pole "Numer telefonu" musi zaczynać się od "+" i mieć co najmniej 10 cyfr z opcjonalnymi spacjami'
    ),
});

export type ClientFormValues = yup.InferType<typeof clientYupSchema>;

// orderFormValidator
export const orderYupSchema = yup.object().shape({
  id: yup.string(),
  client: clientOrderValidator,
  quantity: yup
    .number()
    .min(1, 'Ilość musi być większa lub równa 1')
    .max(15, 'Ilość musi być mniejsza lub równa 15')
    .required('Pole wymagane'),
  orderTitle: yup
    .string()
    .min(5, 'Tytuł zamówienia musi mieć co najmniej 5 znaków')
    .required('Pole wymagane'),
  orderContent: yup
    .string()
    .min(10, 'Treść zamówienia musi mieć co najmniej 10 znaków')
    .required('Pole wymagane'),
  paid: yup.boolean(),
});

export type OrderFormValues = yup.InferType<typeof orderYupSchema>;

// register account
export const registerAccountYupSchema = yup.object({
  name: yup.string().required('Pole wymagane'),
  username: yup.string().required('Pole wymagane'),
});

export type RegisterFormValues = yup.InferType<typeof registerAccountYupSchema>;
export type UserAccount = RegisterFormValues & { avatar?: string };

// login account
export const loginAccountyupSchema = yup.object({
  username: yup.string().required('Pole wymagane'),
});

export type LoginFormValues = yup.InferType<typeof loginAccountyupSchema>;

// update user data
export const updateUserDataYupSchema = yup.object({
  name: yup.string().required('Pole wymagane'),
  username: yup.string().required('Pole wymagane'),
});

export type UpdateUserDataForm = yup.InferType<
  typeof updateUserDataYupSchema
> & { avatar?: File | null };

// invoices
export const invociesYupSchema = yup.object({
  selectedClient: clientOrderValidator,
  selectedOrders: yup.array().min(1, 'Wybierz co najmniej jedno zamówienie'),
  price: yup
    .string()
    .required('Wymagane')
    .matches(/^[0-9]+$/, 'Wprowadź poprawną cenę, używając tylko cyfr'),
  dateOfIssue: yup
    .string()
    .required('Wymagane')
    .matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
      'Niepoprawny format daty (MM/DD/YYYY)'
    ),
  accountingMonth: yup
    .string()
    .required('Wymagane')
    .matches(/^(0[1-9]|1[0-2])$/, 'Wprowadź dwie cyfry od 01 do 12'),
});

export type InvoicesFormValues = yup.InferType<typeof invociesYupSchema>;

// money
export const moneyYupSchema = yup.object({
  value: yup
    .number()
    .required('Wartość wymagana')
    .min(0, 'Wartość musi być wieksza niż 0'),
});

export type MoneyFormValues = yup.InferType<typeof moneyYupSchema>;
