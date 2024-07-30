import React from "react";

interface TableRowProps {
  row:  {[key: string]: string | number | React.ReactNode };
  columns: string[];
}

const TempTableRow: React.FC<TableRowProps> = ({ row,columns }) => {
  return (
    <tr className="w-full border-b">
      {columns.map((column, cellIndex) => (
        <td key={cellIndex} className="p-4 text-center">
          {row[column]}
        </td>
      ))}
    </tr>
  );
};

export default TempTableRow;
