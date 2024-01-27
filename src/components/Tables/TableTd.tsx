interface TableTdProps {
  className: string;
  value?: string | React.ReactNode;
  children?: React.ReactNode;
}

export default function TableTd({ value, className, children }: TableTdProps) {
  return <td className={className}>{children || value}</td>;
}
