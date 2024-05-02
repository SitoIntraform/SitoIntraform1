"use client";

import { ColumnDef } from "@tanstack/react-table";
// import CellAction from "./CellActionSezione";
import { SectionColumnType, SectionType } from "@/types";
import CellActionSection from "./CellActions/CellActionsSections";
import { pageTypes } from "@/types"

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
    header: "Animazione",
    cell: ({ row }) => {
      const animation = row.original.animation;

      return animation ? "Si" : "No";
    },
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
