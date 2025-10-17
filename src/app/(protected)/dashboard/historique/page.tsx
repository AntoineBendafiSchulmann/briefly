'use client';

import { useState, useEffect } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { SpinnerEmpty } from '@/components/ui/spinner';

interface HistoryItem {
  id: string;
  text: string;
  context: string;
  model: string;
  cost: number;
  date: string;
}

const columns: ColumnDef<HistoryItem>[] = [
  {
    accessorKey: 'text',
    header: 'Texte',
    size: 300,
    cell: ({ row }) => (
      <Tooltip>
            <span title={row.original.text} className="truncate block max-w-[280px]">
            {row.original.text}
            </span>
        </Tooltip>
        ),
  },
  { accessorKey: 'context', header: 'Contexte', size: 150 },
  { accessorKey: 'model', header: 'Modèle', size: 150 },
  { accessorKey: 'cost', header: 'Coût (€)', size: 100, cell: ({ row }) => row.original.cost.toFixed(2) },
  { accessorKey: 'date', header: 'Date', size: 150, cell: ({ row }) => new Date(row.original.date).toLocaleDateString() },
];

export default function HistoriquePage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const response = await fetch('/api/history');
        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData.error || 'Erreur inconnue');
          return;
        }
        const data: HistoryItem[] = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique :', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const table = useReactTable({
    data: history,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: itemsPerPage,
      },
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Historique</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <SpinnerEmpty />
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-md">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="bg-gray-100 dark:bg-gray-800">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="truncate max-w-[280px]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {table.getPaginationRowModel().rows.length > itemsPerPage && (
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === table.getPageCount()}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}