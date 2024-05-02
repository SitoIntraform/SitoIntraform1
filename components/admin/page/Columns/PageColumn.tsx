"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PageType, SectionColumnType, SectionType } from "@/types";
import CellActionSection from "./CellActions/CellActionsSections";
import CellActionPage from "./CellActions/CellActionPage";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const PageColumn: ColumnDef<PageType>[] = [
  {
    id: "Actions",
    header: "Azioni",
    cell: ({ row }) => {
      const page = row.original;

      return <CellActionPage PageId={page.PageId} />;
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    header: "Link",
    cell: ({ row }) => {
      return <p>
        {row.original.link == "" ? "/" : "/" + row.original.link}
      </p>
    }
  },
  {
    header: "Pagina principale",
    cell: ({row}) => {
        return <p>
            {row.original.defaltPage ? "Si" : "No"}
        </p>
    }
  },
  {
    header: "Numero di sezioni",
    accessorKey: "numberSections"
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creata il
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "createdAt",
  },
  {
    header: "Aggiornata il",
    accessorKey: "updatedAt",
  },
  
];
