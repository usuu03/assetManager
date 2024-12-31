import React from "react";
import { useTable } from "react-table";

const data = [
  { name: "Laptop", status: "Active", assignedTo: "John Doe" },
  { name: "Printer", status: "Inactive", assignedTo: "Jane Smith" },
];

const columns = [
  { Header: "Name", accessor: "name" },
  { Header: "Status", accessor: "status" },
  { Header: "Assigned To", accessor: "assignedTo" },
];

export default function AssetTable() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="w-full border-collapse border">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="p-2 border">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="p-2 border">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
