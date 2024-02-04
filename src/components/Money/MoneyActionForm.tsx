import MoneyForm from './MoneyForm';

export default function MoneyActionForm() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <MoneyForm depositForm={true} />
      </div>
      <div>
        <MoneyForm depositForm={false} />
      </div>
    </div>
  );
}
