"use client"

import React from "react";
import DeleteModal from "../modals/DeleteModal";
import HeaderPage from "../HeaderPage";
import Button from "@/components/Button";
import { Edit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { Course } from "@prisma/client";
import { CourseColumn } from "./Columns/CourseColumn";
import { getSession } from "next-auth/react";
import ViewSingleCourse from "@/components/view/ViewSingleCourse";

function CorsiPageComponent({
  corsi
} : {
  corsi: Course[]
}) {
  const router = useRouter();

  return (
    <div className="containerDesign px-10 pt-[80px]">
      <HeaderPage
        title="Corsi"
        description="Gestisci tutti i corsi del sito "
      >
        <Button
          className="md:w-[170px] w-[90%] h-[50px]"
          onClick={() => {
            router.push("corsi/new");
          }}
          disabled={false}
          secondary
        >
          <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
            <Plus />
            Aggiungi
          </div>
        </Button>
      </HeaderPage>
      <DataTable columns={CourseColumn} data={corsi} />

      <div className="flex flex-col gap-[16px]">
        {corsi.map((c) => {

          return (
            <div key={c.CorsoId}>
              <HeaderPage
                title={c.name || ""}
                description={`Gestisci il corso ${c.name}`}
              >
                <Button
                  className="md:w-[170px] w-[90%] h-[50px]"
                  onClick={() => {
                    router.push("corsi/"+c.CorsoId);
                  }}
                  disabled={false}
                  secondary
                >
                  <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                    <Edit />
                    Edit
                  </div>
                </Button>
              </HeaderPage>
              <ViewSingleCourse 
                name={c.name || ""}
                link={c.link || ""}
                title={c.title || ""}
                description={c.description || ""}
                price={c.price || 0}
                duration={c.duration || ""}
                code={c.code || ""}
                image={c.image || ""}
                haveFile={c.haveFile || false}
                fileLink={c.fileLink || ""}
                dev={true}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default CorsiPageComponent;