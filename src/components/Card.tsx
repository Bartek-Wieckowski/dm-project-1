interface CardProps {
  data: {
    imgSrc: string;
    name: string;
    surname: string;
    street: string;
    postCode: string;
    town: string;
    subRegion: string;
    phoneNumber: string;
  };
}

export default function Card({ data }: CardProps) {
  const {
    imgSrc,
    name,
    surname,
    street,
    postCode,
    town,
    subRegion,
    phoneNumber,
  } = data;
  return (
    <div className="mx-auto w-full max-w-[400px] rounded bg-slate-400 text-stone-200">
      <div className="flex flex-col items-center justify-center gap-3 p-3 sm:flex-row">
        <img
          src={imgSrc}
          alt={`${name} ${surname}`}
          width="150"
          height="150"
          className="h-[150px] rounded-full"
        />
        <div className="flex flex-col">
          <h2>{`${name} ${surname}`}</h2>
          <h2>Adres:</h2>
          <p>{`${street} ${postCode}`}</p>
          <p>{town}</p>
          <p>{subRegion}</p>
          <p>{phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}
