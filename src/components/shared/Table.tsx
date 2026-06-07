import type { ReactNode } from 'react'

interface Column<T> {
  header: string
  accessor: (row: T) => ReactNode
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string | number
}

export default function Table<T>({ columns, data, keyExtractor }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ydl-dark-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-ydl-dark-border bg-white/[0.02]">
            {columns.map((col, i) => (
              <th key={i} className={`px-3 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider text-left ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ydl-dark-border/50">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="hover:bg-white/[0.02] transition-colors">
              {columns.map((col, i) => (
                <td key={i} className={`px-3 py-2.5 text-[11px] text-gray-300 ${col.className || ''}`}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-sm text-gray-500">No records found</div>
      )}
    </div>
  )
}
