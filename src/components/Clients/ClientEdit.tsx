import { useParams } from "react-router-dom";
import ClientForm from "./ClientForm";
import cards from "../../assets/dummy-data/cards-data";

export default function ClientEdit() {
  const { id } = useParams();
  const editedClient = cards.find((card) => card.id === Number(id));

  return (
    <>
      <ClientForm editForm={true} editValues={editedClient} />
    </>
  );
}
