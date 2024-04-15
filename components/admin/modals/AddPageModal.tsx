"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import axios from "axios";
import { Check, DoorClosed, LogOut } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddPageModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const addPage = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/api/pages", {
        name,
        link,
      });

      if (res.status === 200) {
        toast.success("Pagina creata con successo");
        window.location.assign("/admin/dashboard/sito");
        return;
      }
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateNameAndLink = (value: string) => {
    setName(value);
    setLink(value.replaceAll(" ", "-").toLowerCase());
  };

  return (
    <Modal
      open={isOpen}
      title="Crea una nuova pagina"
      containerClass=""
      body={
        <>
          <p className="m-5 text-center regular-normal">
            Il link della pagina è composto dal nome tutto minuscolo con al
            posto degli spazi un trattino (-), se la pagina è quella principale
            il link non sarà visualizzabile
          </p>
          <div className="flex lg:flex-row flex-col gap-2 pb-2">
            <Input
              label="Name"
              value={name}
              onValueChange={(e) => updateNameAndLink(e.target.value)}
              disabled={loading}
            />
            <Input
              label="Link Provvisorio"
              value={link}
              onValueChange={() => {}}
              disabled={true}
            />
          </div>
        </>
      }
      bodyContainerClass=""
      footer={
        <div className="w-full flex md:flex-row flex-col items-center gap-3">
          <Button
            className="w-full h-[50px]"
            wfull
            onClick={addPage}
            disabled={loading}
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <Check />
              Aggiungi
            </div>
          </Button>
          <Button
            className="w-full h-[50px]"
            wfull
            onClick={onClose}
            disabled={loading}
            secondary
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <LogOut />
              Chiudi
            </div>
          </Button>
        </div>
      }
      footerContainerClass=""
      onClose={onClose}
    />
  );
}

export default AddPageModal;
