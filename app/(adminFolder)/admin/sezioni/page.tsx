import SezioniPageComponent from "@/components/admin/page/SezioniPageComponent";
import prismadb from "@/lib/prismadb";
import React from "react";
import { PageType, SectionColumnType, SectionType } from "@/types";

async function SezioniPage() {
  const section = await prismadb.section.findMany({});

  const sectionTable: SectionColumnType[] = [
    ...section.map((section) => {
      const createdAt = new Date(section.createdAt);
      const updatedAt = new Date(section.updatedAt);

      return {
        SectionId: section.SectionId,
        name: section.name,
        pageType: section.pageType,
        createdAt: `${createdAt.getUTCDate()}/${
          createdAt.getUTCMonth() + 1
        }/${createdAt.getFullYear()}`,
        updatedAt: `${updatedAt.getUTCDate()}/${
          updatedAt.getUTCMonth() + 1
        }/${updatedAt.getFullYear()}`,
      };
    }),
  ];

  const allSection: SectionType[] = section && [
    ...section.map((sectionSingle) => {
      return {
        SectionId: sectionSingle?.SectionId || "",
        updatedAt: sectionSingle?.updatedAt.toString() || "",
        createdAt: sectionSingle?.createdAt.toString() || "",
        name: sectionSingle?.name || "",
        pageType: sectionSingle?.pageType || "Hero",

        data: {
          animation: sectionSingle?.data.animation || false,
          animationType: sectionSingle?.data.animationType || "up",

          backgroundImages: sectionSingle?.data.backgroundImages || "",
          backgroundImageOpacity: sectionSingle?.data.backgroundImageOpacity || 100,
          backgroundColor: sectionSingle?.data.backgroundColor || "",

          images: sectionSingle?.data.images || [],
          imagesOnLeft: sectionSingle?.data.imagesOnLeft || true,

          textBlue: sectionSingle?.data.textBlue || "",
          textGreen: sectionSingle?.data.textGreen || "",
          textBlack: sectionSingle?.data.textBlack || "",
          description: sectionSingle?.data.description || "",

          carouselDots: sectionSingle?.data.carouselDots || false,
          carouselButtons: sectionSingle?.data.carouselButtons || false,

          service: sectionSingle?.data.service || [],

          hScreen: sectionSingle?.data.hScreen || false,
          space: sectionSingle?.data.space || 40,

          primaryButton: sectionSingle?.data.primaryButton || false,
          primaryButtonText: sectionSingle?.data.primaryButtonText || "",
          primaryLink: sectionSingle?.data.primaryLink || "",
          heightPrimaryButton: sectionSingle?.data.heightPrimaryButton || 0,
          widthPrimaryButton: sectionSingle?.data.widthPrimaryButton || 0,

          secondaryButton: sectionSingle?.data.secondaryButton || false,
          secondaryButtonText: sectionSingle?.data.secondaryButtonText || "",
          secondaryLink: sectionSingle?.data.secondaryLink || "",
          heightSecondaryButton: sectionSingle?.data.heightSecondaryButton || 0,
          widthSecondaryButton: sectionSingle?.data.widthSecondaryButton || 0,

          faq: sectionSingle?.data.faq || [],

          courseId: sectionSingle?.data.courseId || [],
        },
      };
    }),
  ];

  const pages = await prismadb.page.findMany({});

  const allPages: PageType[] = pages && [
    ...pages.map((page) => {
      const createdAt = new Date(page.createdAt);
      const updatedAt = new Date(page.updatedAt);

      return {
        PageId: page.PageId || "",
        createdAt: `${createdAt.getUTCDate()}/${createdAt.getUTCMonth() + 1
          }/${createdAt.getFullYear()}`,
        updatedAt: `${updatedAt.getUTCDate()}/${updatedAt.getUTCMonth() + 1
          }/${updatedAt.getFullYear()}`,

        name: page.name || "",
        link: page.link || "",

        defaltPage: page.defaltPage || false,

        numberSections: page.numberSections || 0,
        sections: page.sections || [],
      };
    }),
  ];

  return (
    <SezioniPageComponent sectionTable={sectionTable} allSection={allSection} allPages={allPages} />
  );
}

export default SezioniPage;
