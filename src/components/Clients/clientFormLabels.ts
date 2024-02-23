export interface LabelMapType {
  [key: string]: string;
}

export const labelMap: LabelMapType = {
  name: "Imię",
  surname: "Nazwisko",
  street: "Ulica",
  code: "Kod pocztowy",
  city: "Miasto",
  region: "Region",
  imageUrl: "Zdjęcie (podaj url)",
  phoneNumber: "Numer telefonu",
};
