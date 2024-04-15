"use client";

import CustomScrollbar from "@/components/CustomScrollbar";
import React, { useState } from "react";
import UploadImageModal from "../modals/UploadImageModal";
import Button from "@/components/Button";
import { Plus, Trash } from "lucide-react";
import HeaderPage from "../HeaderPage";
import useUploadImageModal from "@/hooks/useUploadImage";
import { ImageType } from "@/types";
import Image from "next/image";
import useDeleteModal from "@/hooks/useDelete";
import DeleteModal from "../modals/DeleteModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ImagePageProps {
  images: ImageType[];
}

function ImagePageComponent({ images }: ImagePageProps) {
  const router = useRouter();

  const uploadImageModal = useUploadImageModal();
  const deleteModal = useDeleteModal();

  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const onCancel = async () => {
    setLoading(true);

    try{

      const res = await axios.delete(`/api/images/${deleteId}`);

      if(res.status === 200){
        toast.success("Immagine eliminata con successo");
        router.refresh();
        return;
      }

    } catch(err: any){
      console.log(err);
      toast.error(err.response.data);
    }
    finally{
      setLoading(false);
      deleteModal.onClose();
    }
  }

  return (
    <CustomScrollbar
      containerStyle="h-screen"
      childrenContainerStyle="h-full  container px-10 pt-[80px]"
      scrollbarContainerStyle="absolute top-0 right-0 h-full w-2 bg-transparent"
      scrollbarStyle="left-0 absolute w-full bg-primaryDesign rounded-full"
      trackStyle="h-full absolute left-0 top-0 w-full"
    >
      <DeleteModal 
        text="Sei scuro di voler eliminare questa immagine?"
        disabled={loading}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onCancel={onCancel}
      />
      <UploadImageModal
        isOpen={uploadImageModal.isOpen}
        onClose={() => {
          uploadImageModal.onClose();
        }}
      />
      <HeaderPage
        title="Immagini"
        description="Gestisci tutte le immagini del sito."
      >
        <Button
          className="md:w-[220px] w-[90%] h-[50px]"
          onClick={uploadImageModal.onOpen}
          disabled={uploadImageModal.isOpen}
          secondary
        >
          <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
            <Plus />
            Carica Immagini
          </div>
        </Button>
      </HeaderPage>

      <div className="my-5 flex items-center gap-4 flex-wrap justify-center">
        {images.map((url) => (
          <div
            key={url.ImageId}
            className="relative w-[250px] h-[250px] rounded-md overflow-hidden group"
          >
            <Button
              className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
              onClick={() => {
                setDeleteId(url.ImageId);
                deleteModal.onOpen();
              }}
              rectangle
            >
              <Trash className="h-10 w-10" />
            </Button>

            <Image src={url.link} alt="Image" fill className="object-cover" />
          </div>
        ))}
      </div>
    </CustomScrollbar>
  );
}

export default ImagePageComponent;
