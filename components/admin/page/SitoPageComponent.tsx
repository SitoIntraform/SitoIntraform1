"use client";

import React, { useEffect, useState } from "react";
import HeaderPage from "../HeaderPage";
import Button from "@/components/Button";
import { Check, Edit, Menu, Plus, Trash, Upload, X } from "lucide-react";
import AddPageModal from "../modals/AddPageModal";
import useAddPageModal from "@/hooks/useAddPage";
import { PageType, SectionType } from "@/types";
import { DataTable } from "@/components/DataTable";
import { PageColumn } from "./Columns/PageColumn";
import HeroView from "@/components/view/HeroView";
import ReturnViewComponent from "@/components/view/ReturnViewComponent";
import { useRouter } from "next/navigation";
import { Link, Navbar } from "@prisma/client";
import { LinkColumn } from "./Columns/LinkColumn";
import NavbarClient from "@/components/NavbarClient";
import SelectImagesConfigurations from "../SelectImagesConfigurations";
import WrapConfigurazioni from "../WrapConfigurazioni";
import Input from "@/components/Input";
import UploadImageModal from "../modals/UploadImageModal";
import SelectMultipleImageModal from "../modals/SelectMultipleImageModal.tsx";
import Image from "next/image";
import Select from "@/components/Select";
import toast from "react-hot-toast";
import axios from "axios";

function SitoPageComponent({
  allPage,
  allSections,
  navbar,
  allLinks,
  totalImage,
}: {
  allPage: PageType[];
  allSections: SectionType[];
  navbar: Navbar;
  allLinks: Link[];
  totalImage: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [openSelectImage, setOpenSelectImage] = useState(false);
  const [openUploadImage, setOpenUploadImage] = useState(false);

  const [links, setLinks] = useState(navbar.links);

  const [possibleLinks, setPossibleLinks] = useState<
    Array<{ name: string; value: string }>
  >([]);

  useEffect(() => {
    let links: Array<{ name: string; value: string }> = [];

    allPage.forEach((page) => {
      links = [
        ...links,
        {
          name: page.name,
          value: "/" + page.PageId,
        },
      ];
    });

    setPossibleLinks(links);
  }, [allPage]);

  const [logo, setLogo] = useState(navbar.logo || "");
  const [logoWidth, setLogoWidth] = useState(navbar.logoWidth || 150);
  const [logoHeight, setLogoHeight] = useState(navbar.logoHeight || 80);

  const [buttonText, setButtonText] = useState(navbar.buttonText || "");
  const [buttonWidth, setButtonWidth] = useState(navbar.buttonWidth || 150);
  const [buttonHeight, setButtonHeight] = useState(navbar.buttonHeight || 60);
  const [buttonLink, setButtonLink] = useState(navbar.buttonLink || "");

  const [dragItemIndex, setDragItemIndex] = useState<number>(-1);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>(-1);

  const handleDrop = () => {
    if (dragOverItemIndex === -1) {
      setDragItemIndex(-1);
      return;
    }

    const _sections = [...links];
    const dragItem = _sections.splice(dragItemIndex, 1)[0];
    _sections.splice(dragOverItemIndex, 0, dragItem);
    setLinks(_sections);
    setDragItemIndex(-1);
  };

  const addPageModal = useAddPageModal();
  const router = useRouter();

  const onCancelEditNavbar = () => {
    setEditMode(false);

    setLinks(navbar.links);

    setLogo(navbar.logo || "");
    setLogoWidth(navbar.logoWidth || 150);
    setLogoHeight(navbar.logoHeight || 80);

    setButtonText(navbar.buttonText || "");
    setButtonWidth(navbar.buttonWidth || 150);
    setButtonHeight(navbar.buttonHeight || 60);
    setButtonLink(navbar.buttonLink || "");
  };

  const onEditNavbar = async () => {
    setLoading(true);

    try {
      const req = await axios.post(`/api/navbar`, {
        links,
        logo,
        logoWidth,
        logoHeight,
        buttonText,
        buttonWidth,
        buttonHeight,
        buttonLink,
      });

      if (req.status === 200) {
        toast.success("Successo");
        setEditMode(false);
        router.refresh();
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!mounted) {
    return;
  }

  return (
    <>
      <UploadImageModal
        isOpen={openUploadImage}
        onClose={() => setOpenUploadImage(false)}
        onCloseCallback={() => {
          setOpenSelectImage(true);
        }}
      />
      <SelectMultipleImageModal
        isOpen={openSelectImage}
        onClose={() => setOpenSelectImage(false)}
        onCloseCallback={() => {}}
        totalImage={totalImage}
        currentSetImages={(images) => {
          setLogo(images[0]);
        }}
        currentImages={[logo]}
        multiple={false}
        openOtherModal={() => setOpenUploadImage(true)}
      />
      <AddPageModal
        isOpen={addPageModal.isOpen}
        onClose={addPageModal.onClose}
      />
      <div className="containerDesign px-10 pt-[80px]">
        <HeaderPage
          title="Pagine"
          description="Gestisci tutte le pagine del sito."
        >
          <Button
            className="md:w-[170px] w-[90%] h-[50px]"
            onClick={addPageModal.onOpen}
            disabled={addPageModal.isOpen}
            secondary
          >
            <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
              <Plus />
              Aggiungi
            </div>
          </Button>
        </HeaderPage>
        <div className="my-[20px]" />
        <DataTable data={allPage} columns={PageColumn} />

        <HeaderPage
          title="Navbar"
          description="Gestisci tutti i link della navbar"
        >
          <div className="flex md:flex-row flex-col gap-2 w-full md:w-auto">
            {!editMode && (
              <>
                <Button
                  className="md:w-[200px] w-[90%] h-[50px]"
                  onClick={() => {
                    setEditMode(true);
                  }}
                  disabled={addPageModal.isOpen || loading}
                >
                  <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                    <Edit />
                    Modifica Navbar
                  </div>
                </Button>
                <Button
                  className="md:w-[170px] w-[90%] h-[50px]"
                  onClick={() => {
                    router.push("/admin/sito/navbar/new");
                  }}
                  disabled={addPageModal.isOpen || loading}
                  secondary
                >
                  <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                    <Plus />
                    Aggiungi
                  </div>
                </Button>
              </>
            )}
            {editMode && (
              <>
                <Button
                  className="md:w-[200px] w-[90%] h-[50px]"
                  onClick={() => {
                    onEditNavbar();
                  }}
                  disabled={addPageModal.isOpen || loading}
                >
                  <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                    <Check />
                    Salva
                  </div>
                </Button>
                <Button
                  className="md:w-[170px] w-[90%] h-[50px]"
                  onClick={() => {
                    onCancelEditNavbar();
                  }}
                  disabled={addPageModal.isOpen || loading}
                  secondary
                >
                  <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                    <X />
                    Chiudi
                  </div>
                </Button>
              </>
            )}
          </div>
        </HeaderPage>
        <div className="my-[20px]" />
        {!editMode && <DataTable data={allLinks} columns={LinkColumn} />}

        {editMode && (
          <>
            <div className="md:p-10 p-5 bg-neutral-200 my-[16px] rounded-xl space-y-[16px]">
              {links.map((singleLink, index) => {
                const link = allLinks.find((l) => l.LinkId === singleLink);

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
                    <div className="w-full text-center h5Desktop">
                      {link?.titolo}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-[16px] my-[16px] scale-90">
              <HeaderPage title={"Logo"} description={"Seleziona logo"}>
                <Button
                  secondary
                  onClick={() => {
                    setOpenSelectImage(true);
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
                {logo && (
                  <div className="relative w-[300px] h-[200px] rounded-md overflow-hidden group">
                    <Button
                      className="hidden group-hover:flex absolute z-10 right-0 w-full h-full items-center justify-center"
                      onClick={() => setLogo("")}
                      rectangle
                      disabled={loading}
                    >
                      <Trash className="h-8 w-8" />
                    </Button>

                    <Image
                      src={logo}
                      alt="Image"
                      fill
                      className="object-scale-down"
                    />
                  </div>
                )}
              </div>
              <WrapConfigurazioni>
                <Input
                  value={logoWidth}
                  onValueChange={(e) => setLogoWidth(Number(e.target.value))}
                  type="number"
                  label="Lunghezza logo"
                />
                <Input
                  value={logoHeight}
                  onValueChange={(e) => setLogoHeight(Number(e.target.value))}
                  type="number"
                  label="Altezza logo"
                />
              </WrapConfigurazioni>
              <HeaderPage
                title="Bottone navbar"
                description="Modifica le impostazioni del bottone della navbar"
              />
              <WrapConfigurazioni>
                <Input
                  value={buttonText}
                  onValueChange={(e) => setButtonText(e.target.value)}
                  label="Testo del bottone"
                />
                <Select
                  value={buttonLink}
                  onValueChange={(e) => setButtonLink(e.target.value)}
                  label="Link Bottone"
                  possbileValues={possibleLinks}
                />
              </WrapConfigurazioni>
              <WrapConfigurazioni>
                <Input
                  value={buttonWidth}
                  onValueChange={(e) => setButtonWidth(Number(e.target.value))}
                  type="number"
                  label="Lunghezza bottone"
                />
                <Input
                  value={buttonHeight}
                  onValueChange={(e) => setButtonHeight(Number(e.target.value))}
                  type="number"
                  label="Lunghezza bottone"
                />
              </WrapConfigurazioni>
            </div>
          </>
        )}

        <HeaderPage
          title="Prview della navbar"
          description="Visualizza la navbar client"
        />
      </div>

      <NavbarClient
        dev
        allLinks={allLinks}
        allPage={allPage}
        logo={editMode ? logo : navbar.logo ? navbar.logo : ""}
        logoHeight={
          editMode ? logoHeight : navbar.logoHeight ? navbar.logoHeight : 150
        }
        logoWidth={
          editMode ? logoWidth : navbar.logoWidth ? navbar.logoWidth : 80
        }
        buttonText={
          editMode ? buttonText : navbar.buttonText ? navbar.buttonText : ""
        }
        buttonHeight={
          editMode
            ? buttonHeight
            : navbar.buttonHeight
            ? navbar.buttonHeight
            : 150
        }
        buttonWidth={
          editMode ? buttonWidth : navbar.buttonWidth ? navbar.buttonWidth : 60
        }
        links={editMode ? links : navbar.links ? navbar.links : []}
      />
      <div className="containerDesign px-10">
        <HeaderPage
          title="Prview del sito"
          description="Visualizza tutte le pagine del sito"
        />
        <div className="my-[16px]" />
      </div>

      {allPage.map((page) => {
        return (
          <div key={page.PageId}>
            <div className="containerDesign px-10 mb-[10px]">
              <HeaderPage title={page.name} description="" />
            </div>

            {page.sections?.map((sectionId) => {
              const section = allSections?.find(
                (section) => section.SectionId === sectionId
              );

              if (!section) {
                return null;
              }

              return (
                <div key={sectionId}>
                  <ReturnViewComponent
                    allSection={allSections}
                    allPages={allPage}
                    dev
                    section={section}
                    pageType={section.pageType}
                  />
                </div>
              );
            })}
            <div className="h-[100px]" />
          </div>
        );
      })}
    </>
  );
}

export default SitoPageComponent;
