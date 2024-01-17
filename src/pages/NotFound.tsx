import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-5xl text-rose-500">Nie ma takiej strony, wróć na</h2>
      <Link to="/" className="rounded-md bg-teal-400 p-4 text-black">
        Strone główną
      </Link>
    </div>
  );
}
