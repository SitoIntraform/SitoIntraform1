import SitoPageComponent from "@/components/admin/page/SitoPageComponent";
import prismadb from "@/lib/prismadb";
import { PageType, SectionType } from "@/types";
import { Link } from "@prisma/client";
import React from "react";

async function SitoPage() {
  const pages = await prismadb.page.findMany({});

  const allPages: PageType[] = pages && [
    ...pages.map((page) => {
      const createdAt = new Date(page.createdAt);
      const updatedAt = new Date(page.updatedAt);

      return {
        PageId: page.PageId || "",
        createdAt: `${createdAt.getUTCDate()}/${
          createdAt.getUTCMonth() + 1
        }/${createdAt.getFullYear()}`,
        updatedAt: `${updatedAt.getUTCDate()}/${
          updatedAt.getUTCMonth() + 1
        }/${updatedAt.getFullYear()}`,

        name: page.name || "",
        link: page.link || "",

        defaltPage: page.defaltPage || false,

        numberSections: page.numberSections || 0,
        sections: page.sections || [],
      };
    }),
  ];

  const section = await prismadb.section.findMany({});

  const allSections: SectionType[] = section && [
    ...section.map((sectionSingle) => {
      const createdAt = new Date(sectionSingle.createdAt).toUTCString();
      const updatedAt = new Date(sectionSingle.updatedAt).toUTCString();

      return {
        SectionId: sectionSingle?.SectionId || "",
        updatedAt: updatedAt || "",
        createdAt: createdAt || "",
        name: sectionSingle?.name || "",
        pageType: sectionSingle?.pageType || "Hero",

        data: {
          animation: sectionSingle?.data.animation || false,
          animationType: sectionSingle?.data.animationType || "up",

          backgroundImages: sectionSingle?.data.backgroundImages || "",
          backgroundImageOpacity:
            sectionSingle?.data.backgroundImageOpacity || 100,
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

  let navbar = await prismadb.navbar.findFirst({});

  if (!navbar) {
    navbar = await prismadb.navbar.create({ data: {} });
  }

  const links = await prismadb.link.findMany({});

  let allLinks: Link[] = [];

  navbar.links.forEach((link) => {
    const selectedLink = links.find((l) => l.LinkId === link);

    if (selectedLink) {
      allLinks = [...allLinks, selectedLink];
    }
  });

  const queryImages = await prismadb.image.findMany({});

  const totalImage = [...queryImages.map((image) => image.link)];

  const allCourse = await prismadb.course.findMany({});

  return (
    <SitoPageComponent
      allCourse={allCourse}
      totalImage={totalImage}
      allLinks={allLinks}
      allPage={allPages}
      allSections={allSections}
      navbar={navbar}
    />
  );
}

export default SitoPage;
