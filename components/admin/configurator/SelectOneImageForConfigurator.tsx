"use client";

import React, { useState } from "react";
import HeaderPage from "../HeaderPage";
import Button from "@/components/Button";
import { ImagePlus, Plus, Trash, Upload } from "lucide-react";
import UploadImageModal from "../modals/UploadImageModal";
import SelectMultipleImageModal from "../modals/SelectMultipleImageModal.tsx";
import Image from "next/image";

interface props {
  images: string[];
  setImages: (images: string[]) => void;
  totalImage: string[];
  title: string;
  disabled?: boolean;
}

function SelectOneImageForConfigurator({
  images,
  setImages,
  totalImage,
  title,
  disabled,
}: props) {
  const [selectImageModalOpen, setSelectImageModalOpen] = useState(false);
  const [uploadImageModalOpen, setUploadImageModalOpen] = useState(false);

  const onDelteImage = () => {
    setImages([""]);
  };

  return (
    <>
      <div className="scale-[0.9]">
        <HeaderPage
          title={"Immagine"}
          description={"Modifica l'immagine del serizio"}
        >
          <Button
            secondary
            onClick={() => {
              setSelectImageModalOpen(true);
            }}
            animation
            disabled={disabled}
            width={220}
            height={50}
          >
            <div className="flex gap-2 flex-row normal-medium !text-white">
              <Upload />
              Seleziona Immagine
            </div>
          </Button>
        </HeaderPage>
        <div className="my-5 flex items-center gap-4 flex-wrap justify-center">
          {images[0] != "" && (
            <div className="relative w-[250px] h-[250px] rounded-md overflow-hidden group">
              <Button
                className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
                onClick={onDelteImage}
                rectangle
                disabled={disabled}
              >
                <Trash className="h-8 w-8" />
              </Button>

              <Image
                src={images[0]}
                alt="Image"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <UploadImageModal
        isOpen={uploadImageModalOpen}
        onClose={() => {
          setUploadImageModalOpen(false);
        }}
        onCloseCallback={() => {
          setSelectImageModalOpen(true);
        }}
      />
      <SelectMultipleImageModal
        isOpen={selectImageModalOpen}
        onClose={() => {
          setSelectImageModalOpen(false);
        }}
        onCloseCallback={() => {}}
        totalImage={totalImage}
        currentSetImages={setImages}
        currentImages={images}
        multiple={false}
        openOtherModal={() => {
          setUploadImageModalOpen(true);
        }}
      />
    </>
  );
}

export default SelectOneImageForConfigurator;
