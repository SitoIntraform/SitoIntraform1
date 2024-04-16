"use client";

import CustomScrollbar from "@/components/CustomScrollbar";
import { LinkType } from "@/types";
import React, { useState } from "react";
import DeleteModal from "../modals/DeleteModal";
import useDeleteModal from "@/hooks/useDelete";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import HeaderPage from "../HeaderPage";
import Button from "@/components/Button";
import { Check, LogOut, Menu, Plus, Trash } from "lucide-react";
import WrapConfigurazioni from "../WrapConfigurazioni";
import Input from "@/components/Input";
import Select from "@/components/Select";

function CreateEditLinkComponent({
  correctedLink,
  avablePageLinks,
}: {
  correctedLink: LinkType;
  avablePageLinks: Array<{ name: string; value: string }>;
}) {
  const [deleteModal, setDeleteModal] = useState(false);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [type, setType] = useState(correctedLink.type);
  const [titolo, setTitolo] = useState(correctedLink.titolo);
  const [link, setLink] = useState(correctedLink.link);

  const [multipleLink, setMultipleLink] = useState(correctedLink.multipleLink);

  const addMultipleLink = () => {
    setMultipleLink((prev) => [...prev, { link: "", testo: "" }]);
  };

  const deleteLink = (indexLink: number) => {
    const links = multipleLink.filter((link, index) => index != indexLink);

    setMultipleLink(links);
  };

  const onChangeTitle = (title: string, index: number) => {
    const links = multipleLink;
    links[index].testo = title;
    setMultipleLink([...links]);
  };

  const onChangeLink = (link: string, index: number) => {
    const links = multipleLink;
    links[index].link = link;
    setMultipleLink([...links]);
  };

  const onCreate = async () => {
    setLoading(false);

    try {
      const res = await axios.post(`/api/navbar/link`, {
        type,
        titolo,
        link,
        multipleLink,
      });

      if (res.status === 200) {
        toast.success("Link creato con successo");
        window.location.assign("/admin/sito");
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

  const onUpdate = async (exit: boolean) => {
    setLoading(false);

    try {
      const res = await axios.post(`/api/navbar/link/${correctedLink.LinkId}`, {
        type,
        titolo,
        link,
        multipleLink,
      });

      if (res.status === 200) {
        toast.success("Link aggiornato con successo");
        if (exit) {
          window.location.assign("/admin/sito");
        } else {
          window.location.assign(
            "/admin/sito/navbar/" + correctedLink.LinkId
          );
        }
        return;
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
      const res = await axios.delete(
        `/api/navbar/link/${correctedLink.LinkId}`
      );

      if (res.status === 200) {
        toast.success("Link cancellato con successo");
        window.location.assign("/admin/sito");
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

  const [dragItemIndex, setDragItemIndex] = useState<number>(-1);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>(-1);

  const handleDrop = () => {
    if (dragOverItemIndex === -1) {
      setDragItemIndex(-1);
      return;
    }

    const _sections = [...multipleLink];
    const dragItem = _sections.splice(dragItemIndex, 1)[0];
    _sections.splice(dragOverItemIndex, 0, dragItem);
    setMultipleLink(_sections);
    setDragItemIndex(-1);
  };

  return (
    <CustomScrollbar
      containerStyle="h-screen"
      childrenContainerStyle="h-full  "
      scrollbarContainerStyle="absolute top-0 right-0 h-full w-2 bg-transparent"
      scrollbarStyle="left-0 absolute w-full bg-primaryDesign rounded-full"
      trackStyle="h-full absolute left-0 top-0 w-full"
    >
      <DeleteModal
        onCancel={onDelete}
        onClose={() => setDeleteModal(false)}
        isOpen={deleteModal}
        text={`Sei sicuro di voler eliminare questo link?`}
      />
      <div className="containerDesign px-10 pt-[80px]">
        <div className="md:sticky top-[80px] bg-white z-[90]">
          <HeaderPage
            title="Link"
            description={
              correctedLink.LinkId == "new"
                ? "Crea qui un nuovo link per la navbar"
                : "Modifica o elimina un link per una navbar"
            }
          >
            {correctedLink.LinkId == "new" ? (
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
                      window.location.assign("/admin/sito");
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
            label="Titolo del link"
            value={titolo}
            onValueChange={(e) => setTitolo(e.target.value)}
          />
          <Select
            possbileValues={[
              {
                name: "Singolo",
                value: "Single",
              },
              {
                name: "Più link",
                value: "Multiple",
              },
            ]}
            value={type}
            onValueChange={(e) => setType(e.target.value)}
            label="Seleziona il tipo del link"
            disabledFirst
          />
        </WrapConfigurazioni>

        {type === "Single" ? (
          <div className="my-[16px]">
            <Select
              possbileValues={avablePageLinks}
              value={link || ""}
              onValueChange={(e) => setLink(e.target.value)}
              label="Seleziona il link"
            />
          </div>
        ) : (
          <>
            <div className="my-[16px]" />
            <HeaderPage
              title="Multipli link"
              description="Gestisci tutti i link multipli"
            >
              <Button
                className="md:w-[170px] w-[90%] h-[50px]"
                onClick={addMultipleLink}
                disabled={loading}
                secondary
              >
                <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                  <Plus />
                  Aggiungi
                </div>
              </Button>
            </HeaderPage>
            <div className="md:p-10 p-5 bg-neutral-200 my-[16px] rounded-xl space-y-[16px]">
              {multipleLink.map((singleLink, index) => {
                return (
                  <div
                    draggable
                    onDragOver={(e) => e.preventDefault()}
                    onDragStart={() => setDragItemIndex(index)}
                    onDragEnter={() => setDragOverItemIndex(index)}
                    onDragEnd={handleDrop}
                    key={index}
                    className="w-full flex md:flex-row flex-col items-center justify-center bg-white p-5 rounded-xl gap-5 active:cursor-grab"
                  >
                    <Menu className="w-6 h-6 cursor-grab" />
                    <div className="w-full flex md:flex-row flex-col gap-5">
                      <Input
                        label={`Titolo del link`}
                        value={singleLink.testo}
                        onValueChange={(e) =>
                          onChangeTitle(e.target.value, index)
                        }
                      />
                      <Select
                        possbileValues={avablePageLinks}
                        value={singleLink.link}
                        onValueChange={(e) =>
                          onChangeLink(e.target.value, index)
                        }
                        label="Seleziona il link"
                      />
                    </div>
                    <Trash
                      className="w-6 h-6 cursor-pointer hover:opacity-45 transition-all duration-150"
                      onClick={() => deleteLink(index)}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </CustomScrollbar>
  );
}

export default CreateEditLinkComponent;
