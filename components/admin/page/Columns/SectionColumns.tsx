"use client";

import { ColumnDef } from "@tanstack/react-table";
// import CellAction from "./CellActionSezione";
import { SectionColumnType, SectionType } from "@/types";
import CellActionSection from "./CellActions/CellActionsSections";
import { pageTypes } from "@/types"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";

export const SectionColumn: ColumnDef<SectionColumnType>[] = [
  {
    id: "Actions",
    header: "Azioni",
    cell: ({ row }) => {
      const section = row.original;

      return <CellActionSection SectionId={section.SectionId} />;
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    header: "Tipo Sezione",
    cell: ({ row }) => {
      const pageType = pageTypes.find((page) => page.value === row.original.pageType)?.name;

      return pageType;
    },
  },
  {
    header: "Collegata",
    cell: ({ row }) => {
      const page = row.original.PageId;
      return page == undefined || page == null || page == "" ? "No" : "Si";
    },
  },
  {
    header: "Animazione",
    cell: ({ row }) => {
      const animation = row.original.animation;

      return animation ? "Si" : "No";
    },
  },
  {
    accessorKey: "createdAt",
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
  },
  {
    header: "Aggiornata il",
    accessorKey: "updatedAt",
  },
  
];
