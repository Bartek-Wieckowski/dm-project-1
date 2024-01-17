interface CardSearchFormProps {
  onSearchName: (value: string) => void;
}

export default function CardSearchForm({ onSearchName }: CardSearchFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onSearchName(value);
  }

  return (
    <form className="mb-4 pl-2" onSubmit={handleSubmit}>
      <input
        placeholder="Wpisz imię..."
        className="w-28 rounded-lg bg-slate-400 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-900 focus:outline-none focus:ring focus:ring-slate-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        onChange={handleInputChange}
      />
    </form>
  );
}
