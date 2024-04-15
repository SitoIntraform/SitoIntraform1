"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PageType, SectionColumnType, SectionType } from "@/types";
import CellActionSection from "./CellActions/CellActionsSections";
import CellActionPage from "./CellActions/CellActionPage";

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
    header: "Creata il",
    accessorKey: "createdAt",
  },
  {
    header: "Aggiornata il",
    accessorKey: "updatedAt",
  },
  
];
