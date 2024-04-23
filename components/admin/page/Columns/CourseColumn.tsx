"use client";

import { ColumnDef } from "@tanstack/react-table";
// import CellAction from "./CellActionSezione";
import { SectionColumnType, SectionType } from "@/types";
import CellActionSection from "./CellActions/CellActionsSections";
import { pageTypes } from "@/types";
import { Course } from "@prisma/client";
import CellActionCorsi from "./CellActions/CellActionCourse";

export const CourseColumn: ColumnDef<Course>[] = [
  {
    id: "Actions",
    header: "Azioni",
    cell: ({ row }) => {
      const section = row.original;

      return <CellActionCorsi courseId={section.CorsoId} />;
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    header: "Creata il",
    cell: ({ row }) => {
      const section = row.original;
      const createdAt = new Date(section.createdAt);

      return (
        <p>
          {createdAt.getUTCDate()}/{createdAt.getUTCMonth() + 1}/
          {createdAt.getFullYear()}
        </p>
      );
    },
  },
  {
    header: "Aggiornata il",
    cell: ({ row }) => {
      const section = row.original;
      const updatedAt = new Date(section.updatedAt);

      return (
        <p>
          {updatedAt.getUTCDate()}/{updatedAt.getUTCMonth() + 1}/
          {updatedAt.getFullYear()}
        </p>
      );
    },
  },
];
