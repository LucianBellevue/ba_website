interface ComparisonTableProps {
  children: React.ReactNode;
}

export default function ComparisonTable({ children }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-8">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}

export function TableHead({ children }: ComparisonTableProps) {
  return (
    <thead className="bg-ba-navy">
      {children}
    </thead>
  );
}

export function TableBody({ children }: ComparisonTableProps) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  );
}

export function TableRow({ children }: ComparisonTableProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {children}
    </tr>
  );
}

export function TableHeader({ children }: ComparisonTableProps) {
  return (
    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableCell({ children }: ComparisonTableProps) {
  return (
    <td className="px-6 py-4 text-sm text-gray-700 whitespace-normal">
      {children}
    </td>
  );
}
