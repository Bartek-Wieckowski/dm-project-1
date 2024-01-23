import * as yup from "yup";
export const yupSchema = yup.object({
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
  postCode: yup
    .string()
    .required('Pole "Kod pocztowy" jest wymagane')
    .matches(/^\d{2}-\d{3}$/, 'Pole "Kod pocztowy" musi mieć format 00-000'),
  town: yup
    .string()
    .required('Pole "Miasto" jest wymagane')
    .min(3, 'Pole "Miasto" musi mieć co najmniej 3 litery'),
  subRegion: yup.string().min(3, 'Pole "Region" musi mieć co najmniej 3 litery'),
  imgSrc: yup.string(),
  phoneNumber: yup
    .string()
    .required('Pole "Numer telefonu" jest wymagane')
    .matches(
      /^\+\d{1,3}(\s?\d{3}){2,}$/,
      'Pole "Numer telefonu" musi zaczynać się od "+" i mieć co najmniej 10 cyfr z opcjonalnymi spacjami'
    ),
});
