export interface LabelMapType {
  [key: string]: string;
}

export const labelMap: LabelMapType = {
  name: "Imię",
  surname: "Nazwisko",
  street: "Ulica",
  postCode: "Kod pocztowy",
  town: "Miasto",
  subRegion: "Region",
  imgSrc: "Zdjęcie (podaj url)",
  phoneNumber: "Numer telefonu",
};
