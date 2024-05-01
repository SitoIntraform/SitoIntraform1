"use client";

import Button from "@/components/Button";
import { Course, Page, Section } from "@prisma/client";
import { Check, LogOut, Menu, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import HeaderPage from "../HeaderPage";
import WrapConfigurazioni from "../WrapConfigurazioni";
import Input from "@/components/Input";
import Select from "@/components/Select";
import toast from "react-hot-toast";
import { emptySection, PageType, SectionType } from "@/types";
import CheckBox from "@/components/CheckBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import HeroView from "@/components/view/HeroView";
import ReturnViewComponent from "@/components/view/ReturnViewComponent";
import DeleteModal from "../modals/DeleteModal";

function EditPage({
  pageData,
  possibleSectionData,
  sectionInPage,
  pagesWithoutSelectedPage,
  allSection,
  allPages,
  allCourse,
}: {
  pageData?: Page;
  possibleSectionData?: Section[];
  sectionInPage?: Section[];
  pagesWithoutSelectedPage?: Page[];
  allPages: PageType[];
  allSection: SectionType[];
    allCourse: Course[],
}) {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const [name, setName] = useState(pageData?.name);
  const [link, setLink] = useState(pageData?.link);

  const [defaultPage, setDefaultPage] = useState(pageData?.defaltPage);

  const [sections, setSections] = useState<Section[]>(sectionInPage || []);
  const [possibleSection, setPossibleSection] = useState<Section[]>(
    possibleSectionData || []
  );

  const [possibleLink, setPossibleLink] = useState<
    Array<{ name: string; value: string }>
  >([]);

  const updatePossibleLink = () => {
    const possibleLinkSection: Array<{ name: string; value: string }> =
      sections?.map((section) => {
        return {
          name: section.name + " - Ancora nella pagina",
          value: "#" + section.SectionId,
        };
      });
    const possibleLinkOtherPage: Array<{
      name: string;
      value: string;
    }> =
      pagesWithoutSelectedPage?.map((page) => {
        return {
          name: page.name + " - Link a pagina",
          value: "/" + page.PageId,
        };
      }) || [];

    const possibleLink: Array<{ name: string; value: string }> = [
      ...possibleLinkSection,
      ...possibleLinkOtherPage,
    ];

    setPossibleLink(possibleLink);
  };

  useEffect(() => {
    updatePossibleLink();
  }, [sections, possibleSection]);

  const updateNameAndLink = (value: string) => {
    setName(value);
    if (defaultPage) {
      return;
    }
    setLink(value.replaceAll(" ", "-").toLowerCase());
  };

  const onAddSection = () => {
    if (possibleSection.length <= 0) {
      toast.error(
        "Non puoi aggiungere una sezione, sono tutte aggiunte ad una pagina. Aggiungi prima una nuova sezione!!"
      );
      return;
    }

    const newSection = possibleSection[0];

    setSections((prev) => [...prev, newSection]);
    setPossibleSection((prev) => [
      ...prev.filter((section) => section.SectionId != newSection.SectionId),
    ]);
  };

  const onRemoveSection = (id: String) => {
    const removedSection = sections.find((section) => section.SectionId == id);

    if (!removedSection) {
      return;
    }

    const currentSection: Section[] = [];

    sections.forEach((section) => {
      if (section.SectionId != id) {
        currentSection.push(section);
      }
    });

    console.log(currentSection);

    currentSection.forEach((section) => {
      if (section.data.primaryLink === "#" + removedSection.SectionId) {
        section.data.primaryLink = "";
      }
      if (section.data.secondaryLink === "#" + removedSection.SectionId) {
        section.data.secondaryLink = "";
      }

      section.data.service.forEach((ser) => {
        if (ser.LinkPage == "#" + removedSection.SectionId) {
          ser.LinkPage = "";
        }
      });
    });

    setPossibleSection((prev) => [removedSection, ...prev]);
    setSections(currentSection);
  };

  useEffect(() => {
    console.log("Section changed");
    console.log(sections);
  }, [sections]);

  const onSectionChange = (id: string, index: number) => {
    const newSection = possibleSection.find(
      (section) => section.SectionId == id
    );

    if (!newSection) {
      return;
    }

    const sectionArray = sections;
    const oldSection = sections[index];

    setPossibleSection((section) => [
      ...section.filter((sec) => sec.SectionId != id),
      oldSection,
    ]);
    sectionArray[index] = newSection;

    sectionArray.forEach((section) => {
      if (section.data.primaryLink === "#" + oldSection.SectionId) {
        section.data.primaryLink = "";
      }
      if (section.data.secondaryLink === "#" + oldSection.SectionId) {
        section.data.secondaryLink = "";
      }
    });

    setSections(sectionArray);
  };

  const onChnagePrimaryLink = (index: number, value: string) => {
    const sectionArray = sections;

    sectionArray[index].data.primaryLink = value;

    console.log(sectionArray[index].data.primaryLink);

    setSections((prev) => [...sectionArray]);
  };

  const onChnageSecondaryLink = (index: number, value: string) => {
    const sectionArray = sections;

    sectionArray[index].data.secondaryLink = value;

    console.log(sectionArray[index].data.secondaryLink);

    setSections((prev) => [...sectionArray]);
  };

  const [dragItemIndex, setDragItemIndex] = useState<number>(-1);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>(-1);

  const handleDrop = () => {
    if (dragOverItemIndex === -1) {
      setDragItemIndex(-1);
      return;
    }

    const _sections = [...sections];
    const dragItem = _sections.splice(dragItemIndex, 1)[0];
    _sections.splice(dragOverItemIndex, 0, dragItem);
    setSections(_sections);
    setDragItemIndex(-1);
  };

  const update = async (exit?: boolean) => {
    try {
      setIsLoading(true);

      const res = await axios.post(`/api/pages/${pageData?.PageId}`, {
        name,
        link,
        defaultPage,
        sections,
      });

      if (res.status === 200) {
        toast.success("Pagina salvata con successo");
        if (exit) {
          window.location.assign("/admin");
        } else {
          window.location.assign("/admin/" + pageData?.PageId);
        }
        return;
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const onDelete = async () => {
    setIsLoading(false);

    try {
      const res = await axios.delete(`/api/pages/${pageData?.PageId}`);

      if (res.status === 200) {
        toast.success("Pagina cancellata con successo");
        window.location.assign("/admin");
        return;
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setIsLoading(false);
      setDeleteModal(false);
    }
  };

  const onChangeLinkService = (index1: number, index2: number, link: string) => {
    const s = sections;
    s[index1].data.service[index2].LinkPage = link;
    console.log("Link servizio " + s[index1].data.service[index2].name + ": " +link)
    setSections([...s]);
  }

  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!mounted) {
    return;
  }

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        onCancel={onDelete}
        onClose={() => setDeleteModal(false)}
        disabled={loading}
        text="Sei sicuro di voler eliminare questa pagina?"
      />
      <div className="containerDesign px-10 pt-[80px]">
        <div className="md:sticky top-[80px] bg-white z-[90]">
          <HeaderPage
            title={pageData?.name || ""}
            description={"Modifica o elimina la pagina " + pageData?.name }
          >
            <div className="flex md:flex-row flex-col gap-2 md:w-auto w-full justify-center items-center md:justify-end">
              <div className="w-full items-center md:w-auto flex flex-col gap-2">
                <Button
                  className="md:w-[160px] w-[90%] h-[50px]"
                  onClick={() => update(true)}
                  disabled={loading}
                >
                  <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                    <Check />
                    Salva e esci
                  </div>
                </Button>
                <Button
                  className="md:w-[160px] w-[90%] h-[50px]"
                  onClick={() => update(false)}
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
                    window.location.assign("/admin");
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
          </HeaderPage>
        </div>

        <WrapConfigurazioni>
          <Input
            value={name || ""}
            onValueChange={(e) => updateNameAndLink(e.target.value)}
            disabled={loading}
            label="Nome della pagina"
          />
          <Input
            value={"/" + link}
            onValueChange={(e) => updateNameAndLink(e.target.value)}
            disabled={true}
            label="Link della pagina"
          />
        </WrapConfigurazioni>

        {pageData?.defaltPage === false && (
          <div className="my-[20px]">
            <CheckBox
              onValueChange={(e) => setDefaultPage(e.target.checked)}
              disabled={loading}
              description={`Attiva questa spunta per far si che la pagina sia quella principale. La pagina principale è quelal che si vede all'inizio, quando ci troviamo nel link "/"`}
              label="Pagina principale"
              value={defaultPage || pageData.defaltPage}
            />
          </div>
        )}

        <HeaderPage
          title={"Sezioni"}
          description={
            "Modifica o elimina le sezioni della pagina " + pageData?.name
          }
        >
          <Button
            className="md:w-[180px] w-[90%] h-[50px]"
            onClick={onAddSection}
            disabled={loading}
            secondary
            animation
          >
            <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
              <Plus />
              Aggiungi sezione
            </div>
          </Button>
        </HeaderPage>

        <div className="bg-neutral-200 rounded-lg w-full p-8 px-10 my-[20px] flex flex-col gap-5">
          {sections?.map((section, index) => {
            const possibleSectionOfOther: Array<{
              name: string;
              value: string;
            }> = possibleSection?.map((section) => {
              return {
                name: section.name,
                value: section.SectionId,
              };
            });
            const possibleValue: Array<{ name: string; value: string }> = [
              { name: section.name, value: section.SectionId },
              ...possibleSectionOfOther,
            ];

            const usableLink = possibleLink.filter(
              (link) => link.value != "#" + section.SectionId
            );

            return (
              <div
                draggable
                onDragOver={(e) => e.preventDefault()}
                onDragStart={() => setDragItemIndex(index)}
                onDragEnter={() => setDragOverItemIndex(index)}
                onDragEnd={handleDrop}
                key={section.SectionId}
                className="bg-white p-5 rounded-lg w-full flex flex-col items-center justify-between gap-10 cursor-grab"
              >
                <Menu className="w-8 h-8 cursor-grab" />
                <div className="flex flex-col gap-4 items-center w-full">
                  {possibleSection && (
                    <Select
                      value={section.SectionId}
                      label="Seleziona il tipo di sezione"
                      disabled={loading}
                      onValueChange={(e) =>
                        onSectionChange(e.target.value, index)
                      }
                      possbileValues={possibleValue}
                    />
                  )}
                  {section.data.primaryButton && (
                    <div className="w-full mt-[8px] space-y-3">
                      <p className="md:h5Desktop h6Mobile text-center">
                        Bottone: {section.data.primaryButtonText}
                      </p>
                      <Select
                        value={section.data.primaryLink || ""}
                        label="Seleziona il link del bottone"
                        disabled={loading}
                        onValueChange={(e) =>
                          onChnagePrimaryLink(index, e.target.value)
                        }
                        possbileValues={usableLink}
                      />
                    </div>
                  )}
                  {section.data.secondaryButton && (
                    <div className="w-full mt-[8px] space-y-3">
                      <p className="md:h5Desktop h6Mobile text-center">
                        Bottone: {section.data.secondaryButtonText}
                      </p>
                      <Select
                        value={section.data.secondaryLink || ""}
                        label="Seleziona il link del bottone"
                        disabled={loading}
                        onValueChange={(e) =>
                          onChnageSecondaryLink(index, e.target.value)
                        }
                        possbileValues={usableLink}
                      />
                    </div>
                  )}
                  {section.pageType === "Service" && (
                    <>
                      {section.data.service.map((s, index2) => (
                        <div key={index2} className="w-full mt-[8px] space-y-3">
                          <p className="md:h5Desktop h6Mobile text-center">
                            Servizio: {s.name}
                          </p>
                          <Select
                            value={s.LinkPage || ""}
                            label="Seleziona il link del servizio"
                            disabled={loading}
                            onValueChange={(e) =>
                              onChangeLinkService(index, index2, e.target.value)
                            }
                            possbileValues={usableLink}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <Trash
                  className="w-8 h-8 cursor-pointer hover:opacity-70 transition-all duration-200"
                  onClick={() => onRemoveSection(section.SectionId)}
                />
              </div>
            );
          })}
        </div>

        <div className="my-[50px]">
          <HeaderPage
            title={"Preview"}
            description={"Preview della pagina " + pageData?.name}
          />
        </div>
      </div>

      {sections.map((section) => {
        const correctedSection: SectionType = {
          SectionId: section?.SectionId || "",
          updatedAt: section?.updatedAt.toString() || "",
          createdAt: section?.createdAt.toString() || "",
          name: section?.name || "",
          pageType: section?.pageType || "Hero",

          data: {
            animation: section?.data.animation || false,
            animationType: section?.data.animationType || "up",

            backgroundImages: section?.data.backgroundImages || "",
            backgroundImageOpacity: section?.data.backgroundImageOpacity || 100,
            backgroundColor: section?.data.backgroundColor || "",

            images: section?.data.images || [],
            imagesOnLeft: section?.data.imagesOnLeft || false,

            textBlue: section?.data.textBlue || "",
            textGreen: section?.data.textGreen || "",
            textBlack: section?.data.textBlack || "",
            description: section?.data.description || "",

            carouselDots: section?.data.carouselDots || false,
            carouselButtons: section?.data.carouselButtons || false,

            service: section?.data.service || [],

            hScreen: section?.data.hScreen || false,
            space: section?.data.space || 40,

            primaryButton: section?.data.primaryButton || false,
            primaryButtonText: section?.data.primaryButtonText || "",
            primaryLink: section?.data.primaryLink || "",
            heightPrimaryButton: section?.data.heightPrimaryButton || 0,
            widthPrimaryButton: section?.data.widthPrimaryButton || 0,

            secondaryButton: section?.data.secondaryButton || false,
            secondaryButtonText: section?.data.secondaryButtonText || "",
            secondaryLink: section?.data.secondaryLink || "",
            heightSecondaryButton: section?.data.heightSecondaryButton || 0,
            widthSecondaryButton: section?.data.widthSecondaryButton || 0,

            faq: section?.data.faq || [],
            courseId: section?.data.courseId || [],
          },
        };

        return (
          <>
            <ReturnViewComponent
            allCourse={allCourse}
              allSection={allSection}
              allPages={allPages}
              section={correctedSection}
              dev
              pageType={correctedSection.pageType}
            />
          </>
        );
      })}
    </>
  );
}

export default EditPage;
