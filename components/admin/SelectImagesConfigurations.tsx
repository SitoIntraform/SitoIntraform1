"use client";

import React, { useEffect } from "react";
import HeaderPage from "./HeaderPage";
import Button from "../Button";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";
import SelectMultipleImageModal from "./modals/SelectMultipleImageModal.tsx";
import useSelectImageModal from "@/hooks/useSelectImage";
import UploadImageModal from "./modals/UploadImageModal";
import useUploadImageModal from "@/hooks/useUploadImage";
import { useRouter } from "next/navigation";
import useSelectOneImage from "@/hooks/useSelectOneImage";

interface SelectImagesConfigurations {
  images: string[];
  setImages: (images: string[]) => void;
  multiple?: boolean;
  totalImage: string[];
  title: string;
  description: string;
  disabled?: boolean;
}

function SelectImagesConfigurations({
  images,
  setImages,
  multiple,
  totalImage,
  title,
  description,
  disabled,
}: SelectImagesConfigurations) {
  const router = useRouter();

  const selectImageModal = useSelectImageModal();
  const uploadImageModal = useUploadImageModal();
  const selectOneImage = useSelectOneImage();

  const onDeleteImage = (url: string) => {
    if(multiple){
      setImages(images.filter((image) => image !== url));
    }
    else {
      setImages([""]);
    }
    router.refresh();
  };

  return (
    <>
      <UploadImageModal
        isOpen={uploadImageModal.isOpen}
        onClose={uploadImageModal.onClose}
        onCloseCallback={() => {
          if(multiple){
            selectImageModal.onOpen();
          }
          else{
            selectOneImage.onOpen();
          }
        }}
      />
      <SelectMultipleImageModal
        isOpen={multiple ? selectImageModal.isOpen : selectOneImage.isOpen}
        onClose={multiple ? selectImageModal.onClose : selectOneImage.onClose}
        onCloseCallback={() => {}}
        totalImage={totalImage}
        currentSetImages={setImages}
        currentImages={images}
        multiple={multiple}
        openOtherModal={uploadImageModal.onOpen}
      />
      <HeaderPage title={title} description={description}>
        <Button
          secondary
          onClick={multiple ? selectImageModal.onOpen : selectOneImage.onOpen}
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
        {images.map((url) => {
          if(url === ""){
            return;
          }

          return (
            <div
              key={url}
              className="relative w-[250px] h-[250px] rounded-md overflow-hidden group"
            >
              <Button
                className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
                onClick={() => onDeleteImage(url)}
                rectangle
                disabled={disabled}
              >
                <Trash className="h-8 w-8" />
              </Button>

              <Image src={url} alt="Image" fill className="object-conatin" />
            </div>
          )
        })}
      </div>
    </>
  );
}

export default SelectImagesConfigurations;
