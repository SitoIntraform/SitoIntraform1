"use client";

import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { Check, ImagePlus, Trash, Upload } from "lucide-react";
import UploadImageModal from "./UploadImageModal";
import { useRouter } from "next/navigation";

function SelectMultipleImageModal({
  onCloseCallback,
  isOpen,
  onClose,
  currentSetImages,
  totalImage,
  multiple,
  openOtherModal,
  currentImages,
}: {
  isOpen: boolean;
  onCloseCallback?: () => void;
  onClose: () => void;
  currentSetImages: (images: string[]) => void;
  totalImage: string[];
  multiple?: boolean;
  openOtherModal: () => void;
  currentImages: string[];
}) {
  const router = useRouter();
  const [images, setImages] = useState<Array<string>>(currentImages || []);

  const onSelect = (url: string) => {
    const isImageSelected = Boolean(images.find((image) => image == url));
    if(multiple){
      if (isImageSelected) {
        setImages((prev) => [...prev.filter((current) => current != url)]);
      }
      else {
        setImages((prev) => [...prev, url]);
      }
    }
    else{
      if (isImageSelected) {
        setImages((prev) => [...prev.filter((current) => current != url)]);
      }
      else {
        setImages((prev) => [url]);
      }
    }
  };

  useEffect(() => {
    if(isOpen){
      setImages(currentImages);
    }
  }, [isOpen])

  const onConfirm = () => {
    currentSetImages(images);
    closeModal();
  }

  const closeModal = () => {
    if (onCloseCallback) {
      onCloseCallback();
    }

    onClose();
  };

  return (
    <>
      <Modal
        open={isOpen}
        title="Seleziona Immagini"
        containerClass=""
        body={
          <>
            {totalImage.map((url) => {

              const isImageSelected = Boolean(images.find((image) => image == url));

              return (
                (
                  <div
                    key={url}
                    className="relative w-[150px] h-[150px] rounded-md overflow-hidden group"
                  >
                    <Button
                      className={`${isImageSelected ? "opacity-60" : "hidden group-hover:flex"}  absolute z-10 right-0 w-full h-full items-center justify-center`}
                      onClick={() => onSelect(url)}
                      rectangle
                    >
                      <Check className="h-8 w-8" />
                    </Button>

                    <Image src={url} alt="Image" fill className="object-cover" />
                  </div>
                )
              )
            })}
          </>
        }
        bodyContainerClass="w-full flex flex-row justify-center items-center flex-wrap gap-2 max-h-[300px] overflow-auto pb-[20px]"
        footer={
          <div className="w-full flex md:flex-row flex-col items-center gap-3">
            <Button
              onClick={onConfirm}
              className="w-full h-[50px]"
              disabled={images.length <= 0}
            >
              <div className="flex flex-row justify-center items-center gap-x-3 regular-medium !text-white">
                <ImagePlus />
                Seleziona Immagini
              </div>
            </Button>
            <Button
              onClick={() => {
                onClose();
                openOtherModal();
              }}
              className="w-full h-[50px]"
              secondary
            >
              <div className="flex flex-row justify-center items-center gap-x-3 regular-medium !text-white">
                <Upload />
                Carica altre Immagini
              </div>
            </Button>
          </div>
        }
        footerContainerClass=""
        onClose={closeModal}
      />
    </>
  );
}

export default SelectMultipleImageModal;
