"use client";

import React, { useEffect, useState } from "react";
import HeaderPage from "../HeaderPage";
import WrapConfigurazioni from "../WrapConfigurazioni";
import Input from "@/components/Input";
import { Course } from "@prisma/client";
import Button from "@/components/Button";
import { Check, LogOut, Plus, Trash, Upload } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import SelectOneImageForConfigurator from "../configurator/SelectOneImageForConfigurator";
import Image from "next/image";
import UploadImageModal from "../modals/UploadImageModal";
import SelectMultipleImageModal from "../modals/SelectMultipleImageModal.tsx";
import ViewMultipleCourse from "@/components/view/ViewMultipleCourse";
import toast from "react-hot-toast";
import axios from "axios";
import ViewSingleCourse from "@/components/view/ViewSingleCourse";
import { useRouter } from "next/navigation";

function CreateEditCorsoPageComponent({
  course,
  totalImage,
}: {
  course: Course;
  totalImage: string[];
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [name, setName] = useState(course.name || "");
  const [link, setLink] = useState(course.link || "");
  const [title, setTitle] = useState(course.title || "");
  const [description, setDescription] = useState(course.description || "");
  const [price, setPrice] = useState(course.price || "");
  const [duration, setDuration] = useState(course.duration || "");
  const [code, setCode] = useState(course.code || "");
  const [destination, setDestination] = useState(course.destination || "");
  const [image, setImage] = useState(course.image || "");

  const onChangeName = (value: string) => {
    setName(value);
    setLink(value.toLowerCase().replaceAll(" ", "-"));
  };

  const onCreate = async () => {
    if (!name || !link) {
      toast.error("Assicurati di aver compilato tutti i campi necessari");
      return;
    }

    setLoading(true);

    try {
      const req = await axios.post("/api/course", {
        name,
        title,
        link,
        description,
        price,
        duration,
        code,
        destination,
        image,
      });

      if (req.status === 200) {
        toast.success("Corso inserito con successo");
        window.location.assign("/admin/corsi");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (exit?: boolean) => {
    if (!name || !link) {
      toast.error("Assicurati di aver compilato tutti i campi necessari");
      return;
    }

    setLoading(true);

    try {
      const req = await axios.post("/api/course/" + course.CorsoId, {
        name,
        title,
        link,
        description,
        price,
        duration,
        code,
        destination,
        image,
      });

      if (req.status === 200) {
        toast.success("Corso aggiornato con successo");
        if (exit) {
          window.location.assign("/admin/corsi");
        } else {
          router.refresh();
        }
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(false);

    try {
      const res = await axios.delete(`/api/course/${course.CorsoId}`);

      if (res.status === 200) {
        toast.success("Corso cancellato con successo");
        window.location.assign("/admin/corsi");
        return;
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setLoading(false);
      setDeleteModal(false);
    }
  };

  const [selectImageModalOpen, setSelectImageModalOpen] = useState(false);
  const [uploadImageModalOpen, setUploadImageModalOpen] = useState(false);

  const onDelteImage = () => {
    setImage("");
  };

  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <>
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
        currentSetImages={(images) => {
          setImage(images[0]);
        }}
        currentImages={[image]}
        multiple={false}
        openOtherModal={() => {
          setUploadImageModalOpen(true);
        }}
      />
      <DeleteModal
        onCancel={onDelete}
        onClose={() => setDeleteModal(false)}
        isOpen={deleteModal}
        text={`Sei sicuro di voler eliminare questo corso?`}
      />
      <div className="containerDesign px-10 pt-[80px]">
        <div className="md:sticky top-[80px] bg-white z-[90]">
          <HeaderPage
            title="Corso"
            description={
              course.CorsoId == "new"
                ? "Crea qui un nuovo corso, per mandare a capo ricordati che puoi usare '<br />'"
                : "Modifica o elimina un corso, per mandare a capo ricordati che puoi usare '<br />'"
            }
          >
            {course.CorsoId == "new" ? (
              <Button
                className="md:w-[130px] w-[90%] h-[50px]"
                onClick={onCreate}
                disabled={loading}
                secondary
                animation
              >
                <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                  <Plus />
                  Crea
                </div>
              </Button>
            ) : (
              <div className="flex md:flex-row flex-col gap-2 md:w-auto w-full justify-center items-center md:justify-end">
                <div className="w-full items-center md:w-auto flex flex-col gap-2">
                  <Button
                    className="md:w-[160px] w-[90%] h-[50px]"
                    onClick={() => onUpdate(true)}
                    disabled={loading}
                  >
                    <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                      <Check />
                      Salva e esci
                    </div>
                  </Button>
                  <Button
                    className="md:w-[160px] w-[90%] h-[50px]"
                    onClick={() => onUpdate(false)}
                    disabled={loading}
                  >
                    <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                      <Check />
                      Salva
                    </div>
                  </Button>
                </div>
                <div className="w-full items-center md:w-auto flex flex-col gap-2">
                  <Button
                    className="md:w-[150px] w-[90%] h-[50px]"
                    onClick={() => {
                      window.location.assign("/admin/corsi");
                    }}
                    disabled={loading}
                    secondary
                  >
                    <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                      <LogOut />
                      Esci
                    </div>
                  </Button>
                  <Button
                    className="md:w-[150px] w-[90%] h-[50px]"
                    onClick={() => setDeleteModal(true)}
                    disabled={loading}
                    secondary
                  >
                    <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                      <Trash />
                      Elimina
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </HeaderPage>
        </div>

        <WrapConfigurazioni>
          <Input
            label="Nome"
            value={name}
            onValueChange={(e) => onChangeName(e.target.value)}
            disabled={loading}
          />
          <Input
            label="Link"
            value={"/" + link}
            onValueChange={(e) => setLink(e.target.value)}
            disabled={true}
          />
        </WrapConfigurazioni>

        <div className="my-[16px]">
          <Input
            label="Titolo"
            value={title}
            onValueChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="my-[16px]">
          <Input
            label="Descrizione"
            value={description}
            onValueChange={(e) => setDescription(e.target.value)}
            textArea
            rows={8}
            disabled={loading}
          />
        </div>

        <WrapConfigurazioni>
          <Input
            label="Prezzo"
            value={price}
            onValueChange={(e) => setPrice(e.target.value)}
            disabled={loading}
            textArea
            rows={5}
          />
          <Input
            label="Durata"
            value={duration}
            onValueChange={(e) => setDuration(e.target.value)}
            disabled={loading}
            textArea
            rows={5}
          />
        </WrapConfigurazioni>

        <div className="my-[16px]">
          <Input
            label="Destinatari"
            value={destination}
            onValueChange={(e) => setDestination(e.target.value)}
            disabled={loading}
            textArea
            rows={5}
          />
        </div>

        <div className="my-[16px]">
          <Input
            label="Codice"
            value={code}
            onValueChange={(e) => setCode(e.target.value)}
            disabled={loading}
          />
        </div>

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
            disabled={loading}
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
          {image != "" && (
            <div className="relative w-[250px] h-[250px] rounded-md overflow-hidden group">
              <Button
                className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
                onClick={onDelteImage}
                rectangle
                disabled={loading}
              >
                <Trash className="h-8 w-8" />
              </Button>

              <Image
                
                src={image}
                alt="Image"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="containerDesign">
        <HeaderPage
          title={"Preview singolo"}
          description={"Visualizza il corso in pagina con forma integrale"}
        />

        <div className="my-[16px]">
          <ViewSingleCourse
            name={name}
            link={link}
            title={title}
            description={description}
            price={price}
            destination={destination}
            duration={duration}
            code={code}
            image={image}
            dev={true}
          />
        </div>

        <HeaderPage
          title={"Preview elenco"}
          description={"Visualizza il corso in come se fosse in elenco"}
        />

        <div className="my-[16px]">
          <ViewMultipleCourse
            name={name}
            link={link}
            title={title}
            description={description}
            price={price}
            duration={duration}
            code={code}
            image={image}
            destination={destination}
            dev={true}
          />
        </div>
      </div>
    </>
  );
}

export default CreateEditCorsoPageComponent;
