"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PageType, SectionColumnType, SectionType } from "@/types";
import CellActionSection from "./CellActions/CellActionsSections";
import CellActionPage from "./CellActions/CellActionPage";
import { Link } from "@prisma/client";
import CellActionLink from "./CellActions/CellActionLink";

export const LinkColumn: ColumnDef<Link>[] = [
  {
    id: "Actions",
    header: "Azioni",
    cell: ({ row }) => {
      const link = row.original;

      return <CellActionLink LinkId={link.LinkId} />;
    },
  },
  {
    accessorKey: "titolo",
    header: "Nome",
  },
  {
    header: "Tipo",
    cell: ({ row }) => {
      const link = row.original;

      return link.type === "Single" ? "Singolo" : "Menu"
    }
  },
  {
    header: "Creata il",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);

      return `${createdAt.getUTCDate()}/${createdAt.getUTCMonth() + 1
        }/${createdAt.getFullYear()}`
    }
  },
  {
    header: "Aggiornata il",
    cell: ({ row }) => {
      const updatedAt = new Date(row.original.updatedAt);

      return `${updatedAt.getUTCDate()}/${updatedAt.getUTCMonth() + 1
        }/${updatedAt.getFullYear()}`
    }
  },
  
];
