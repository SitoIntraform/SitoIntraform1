"use client"

import React from "react";
import DeleteModal from "../modals/DeleteModal";
import HeaderPage from "../HeaderPage";
import Button from "@/components/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

function CorsiPageComponent() {
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
    </div>
  );
}

export default CorsiPageComponent;
