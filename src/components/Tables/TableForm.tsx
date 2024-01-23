import { useRef, useState } from "react";
import { ChildsType } from "../../types/Childs.type";
import Button from "../Button";

interface TableFormProps {
  onAddChild: (newChild: ChildsType) => void;
}

export default function TableForm({ onAddChild }: TableFormProps) {
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    const newName = nameRef.current?.value;
    const newAge = ageRef.current?.value;

    if (!newName || !newAge) {
      setError("Oba pola muszą być wypełnione");
      return;
    }

    const newChild: ChildsType = { name: newName, age: newAge };
    onAddChild(newChild);

    setError(null);
    nameRef.current.value = "";
    ageRef.current.value = "";
  };

  return (
    <form onSubmit={handleAddChild} className="mt-10 pl-10">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block">
          <span className="mb-2 block text-sm font-medium text-stone-200">Imię</span>
          <input type="text" name="name" id="name" ref={nameRef} />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block">
          <span className="mb-2 block text-sm font-medium text-stone-200">Wiek</span>
          <input type="text" name="age" id="age" ref={ageRef} />
        </label>
      </div>
      <Button type="submit" btnStyles="btnSimple">
        Wyślij
      </Button>
    </form>
  );
}
