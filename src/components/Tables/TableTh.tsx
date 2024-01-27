interface TableThProps {
  label?: string;
  className: string;
  scope: string;
}

export default function TableTh({ label, className, scope }: TableThProps) {
  return (
    <th scope={scope} className={className}>
      {label}:
    </th>
  );
}
