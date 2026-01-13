export default function ComparisonTable({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-ba-navy text-white" {...props}>{children}</thead>;
}

export function TableBody({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="bg-white" {...props}>{children}</tbody>;
}

export function TableRow({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-b border-gray-200 hover:bg-gray-50" {...props}>{children}</tr>;
}

export function TableHeader({ children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th className="px-4 py-3 text-left text-sm font-semibold text-white bg-ba-navy border-b border-ba-navy" {...props}>
      {children}
    </th>
  );
}

export function TableCell({ children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) {
  return (
    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200" {...props}>
      {children}
    </td>
  );
}
