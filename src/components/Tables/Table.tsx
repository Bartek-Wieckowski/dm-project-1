import { ChildsType } from "../../types/Childs.type";

interface TableProps {
  data: ChildsType[];
}

export default function Table({ data }: TableProps) {
  return (
    <div className="pl-10">
      <table className="table-auto text-stone-200">
        <thead>
          <tr>
            <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
              Imie
            </th>
            <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
              Wiek
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {data.map((child, index) => (
            <tr key={index}>
              <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {child.name}
              </td>
              <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {child.age}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
