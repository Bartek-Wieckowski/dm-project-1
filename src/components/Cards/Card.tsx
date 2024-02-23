import { Link } from 'react-router-dom';
import { ClientProps } from '../../types/ClientProps.type';
import { RANDOM_IMG_URL } from '../../constants/appConst';

export default function Card({
  id,
  imageUrl,
  name,
  surname,
  street,
  code,
  city,
  region,
  phoneNumber,
}: ClientProps) {
  return (
    <div className="mx-auto w-full max-w-[400px] rounded bg-slate-400 text-stone-200">
      <Link to={`/clients/${id}`}>
        <div className="flex flex-col items-center justify-center gap-3 p-3 sm:flex-row">
          <img
            src={imageUrl ? imageUrl : RANDOM_IMG_URL}
            alt={`${name || ''} ${surname || ''}`}
            width="150"
            height="150"
            className="h-[150px] rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="mb-2 text-lg">{`${name || ''} ${surname || ''}`}</h2>
            <h2 className="text-lg">Adres:</h2>
            <p>{`${street || ''} ${code || ''}`}</p>
            <p>{city}</p>
            <p>{region}</p>
            <p>{phoneNumber}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
