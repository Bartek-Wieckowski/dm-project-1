import { Link } from "react-router-dom";
import { ClientProps } from "../../types/ClientProps.type";

export default function Card({
  id,
  imgSrc,
  name,
  surname,
  street,
  postCode,
  town,
  subRegion,
  phoneNumber,
}: ClientProps) {
  return (
    <div className="mx-auto w-full max-w-[400px] rounded bg-slate-400 text-stone-200">
      <Link to={`/clients/${id}`}>
        <div className="flex flex-col items-center justify-center gap-3 p-3 sm:flex-row">
          <img
            src={imgSrc}
            alt={`${name} ${surname}`}
            width="150"
            height="150"
            className="h-[150px] rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="mb-2 text-lg">{`${name} ${surname}`}</h2>
            <h2 className="text-lg">Adres:</h2>
            <p>{`${street} ${postCode}`}</p>
            <p>{town}</p>
            <p>{subRegion}</p>
            <p>{phoneNumber}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
