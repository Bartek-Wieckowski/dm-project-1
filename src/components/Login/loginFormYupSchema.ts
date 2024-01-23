import * as yup from "yup";
export const yupSchema = yup.object({
  username: yup.string().required("Pole wymagane"),
});
