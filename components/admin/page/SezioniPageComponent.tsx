"use client";

import CustomScrollbar from "@/components/CustomScrollbar";
import React, { useEffect } from "react";
import HeaderPage from "../HeaderPage";
import { Edit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { SectionColumnType, SectionType } from "@/types";
import { DataTable } from "@/components/DataTable";
import { SectionColumn } from "./Columns/SectionColumns";
import HeroView from "@/components/view/HeroView";
import { useScroll } from "framer-motion";
import ReturnViewComponent from "@/components/view/ReturnViewComponent";

function SezioniPageComponent({
  sectionTable, allSection
}: {
  sectionTable: SectionColumnType[], allSection?: SectionType[]
}) {
  const router = useRouter();

  return (
    <CustomScrollbar
      containerStyle="h-screen"
      childrenContainerStyle="h-full  "
      scrollbarContainerStyle="absolute top-0 right-0 h-full w-2 bg-transparent"
      scrollbarStyle="left-0 absolute w-full bg-primaryDesign rounded-full"
      trackStyle="h-full absolute left-0 top-0 w-full"
    >
      <div className="containerDesign px-10 pt-[80px]">
        <HeaderPage
          title="Sezioni"
          description="Gestisci tutte le sezioni del sito."
        >
          <Button
            className="md:w-[170px] w-[90%] h-[50px]"
            onClick={() => {
              router.push("sezioni/new");
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
        <div className="my-[20px]" />
        <DataTable
          data={sectionTable}
          columns={SectionColumn}
        />
      </div>
      {allSection?.map(section => (
        <div className="pt-[20px]" key={section.SectionId}>
          <div className="containerDesign px-10 pb-2">
            <HeaderPage
              title={section.name}
              description={"Visualizza la preview della sezione " + section.name}
            >
              <Button
                className="md:w-[170px] w-[90%] h-[50px]"
                onClick={() => {
                  router.push("sezioni/"+section.SectionId);
                }}
                disabled={false}
                secondary
              >
                <div className="flex flex-row items-center justify-center gap-2 !text-white">
                  <Edit />
                  Edit
                </div>
              </Button>
            </HeaderPage>
          </div>
          <ReturnViewComponent dev section={section} pageType={section.pageType} />
        </div>
      ))}
    </CustomScrollbar>
  );
}

export default SezioniPageComponent;
