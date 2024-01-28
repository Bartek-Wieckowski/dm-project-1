interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  label,
  name,
  value,
  onChange,
  onBlur,
}: TextareaProps) {
  return (
    <>
      <label htmlFor={name} className={`${labelClass}`}>
        {label}:
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${inputClass}`}
      ></textarea>
    </>
  );
}

const inputClass =
  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500';
const labelClass =
  'mb-2 block text-sm font-medium text-gray-900 dark:text-white';
