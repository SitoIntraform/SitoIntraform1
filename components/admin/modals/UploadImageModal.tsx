"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "@/components/Button";
import { ImagePlus, Trash, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

function UploadImageModal({
  onSuccessCallback,
  onCloseCallback,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onSuccessCallback?: () => void;
  onCloseCallback?: () => void;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<string>>([]);
  const router = useRouter();

  const onAddImage = (result: any) => {
    setImages((prev) => [...prev, result.info.secure_url]);
  };

  const onRemove = (url: string) => {
    setImages((prev) => [...prev.filter((u) => u !== url)]);
  };

  const onUpload = async () => {
    if (images.length <= 0) {
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post("/api/images", {
        images,
      });

      if (res.status === 200) {
        toast.success("Immagini caricate con successo");
        closeModal();
        return;
      }
    } catch (err) {
      toast.error("Errore nel caricamento delle immagini");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    if (onCloseCallback) {
      onCloseCallback();
    }

    onClose();
    setImages([]);
    router.refresh();
  };

  return (
    <Modal
      open={isOpen}
      title="Carica Immagini"
      containerClass=""
      body={
        <>
          {images.map((url) => (
            <div
              key={url}
              className="relative w-[150px] h-[150px] rounded-md overflow-hidden group"
            >
              <Button
                className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
                onClick={() => onRemove(url)}
                rectangle
              >
                <Trash
                  className="h-4 w-4"
                />
              </Button>

              <Image src={url} alt="Image" fill className="object-cover" />
            </div>
          ))}
        </>
      }
      bodyContainerClass="w-full flex flex-row justify-center items-center flex-wrap gap-2 max-h-[300px] overflow-auto pb-[20px]"
      footer={
        <div className="w-full flex md:flex-row flex-col items-center gap-3">
          <CldUploadWidget onUpload={onAddImage} uploadPreset="tnbbvu7w">
            {({ open }) => {
              const onClick = () => {
                open();
              };

              return (
                <Button
                  disabled={isLoading}
                  onClick={onClick}
                  className="w-full h-[50px]"
                >
                  <div className="flex flex-row justify-center items-center gap-x-3 regular-medium !text-white">
                    <ImagePlus />
                    Seleziona Immagini
                  </div>
                </Button>
              );
            }}
          </CldUploadWidget>
          <Button
            onClick={onUpload}
            className="w-full h-[50px]"
            disabled={isLoading || images.length <= 0}
            secondary
          >
            <div className="flex flex-row justify-center items-center gap-x-3 regular-medium !text-white">
              <Upload />
              Carica Immagini
            </div>
          </Button>
        </div>
      }
      footerContainerClass=""
      onClose={closeModal}
    />
  );
}

export default UploadImageModal;
