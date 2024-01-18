import { useState } from 'react';
import Table from './Table';
import TableForm from './TableForm';
import { ChildsType } from '../types/Childs.type';

const childsExample: ChildsType[] = [
  {
    name: 'Barbara',
    age: '10',
  },
];

export default function TableLayout() {
  const [childs, setChilds] = useState(childsExample);

  const addNewChild = (newChild: ChildsType) => {
    setChilds([...childs, newChild]);
  };

  return (
    <>
      <Table data={childs} />
      <TableForm onAddChild={addNewChild} />
    </>
  );
}
