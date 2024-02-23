import React from 'react';
import { ClientDataInOrder } from '../../types/Order.types';

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: ClientDataInOrder[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  name,
  value,
  options,
  onChange,
  onBlur,
}: SelectProps) {
  return (
    <>
      <label htmlFor={name} className={labelClass}>
        {label}:
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="" label={`Wybierz ${label.toLowerCase()}`} />
        {options.map((client) => (
          <option key={client.id} value={client.phoneNumber}>
            {client.name} {client.surname}
          </option>
        ))}
      </select>
    </>
  );
}

const labelClass =
  'mb-2 block text-sm font-medium text-gray-900 dark:text-white';
