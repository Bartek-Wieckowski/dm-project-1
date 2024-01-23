import * as yup from "yup";
export const yupSchema = yup.object({
  id: yup.number(),
  name: yup.string().required("Pole wymagane"),
  username: yup.string().required("Pole wymagane"),
  email: yup.string().email("Email musi posiadać @").required("Pole wymagane"),
  password: yup.string().required("Pole hasło jest wymagane").min(6, "Hasło musi mieć co najmniej 6 znaków"),
  confirmPassword: yup
    .string()
    .required("Pole powtórz hasło jest wymagane")
    .min(6, "Powtórzone hasło musi mieć co najmniej 6 znaków")
    .oneOf([yup.ref("password")], "Hasła muszą być identyczne"),
});
