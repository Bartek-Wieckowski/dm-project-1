export default function Card() {
  return (
    <div className="mx-auto w-full max-w-[400px] rounded bg-slate-400 text-stone-200">
      <div className="flex flex-col items-center gap-3 p-3 sm:flex-row">
        <img
          src="https://placehold.jp/150x150.png"
          alt="test"
          width="150"
          height="150"
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h2>Imie i nazwisko</h2>
          <p>Address</p>
          <p>Ulica i kod</p>
          <p>Miasto</p>
          <p>Wojewodztwo</p>
          <p>Numer tel</p>
        </div>
      </div>
    </div>
  );
}
