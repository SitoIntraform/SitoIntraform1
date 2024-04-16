import prismadb from "@/lib/prismadb";
import { SectionType } from "@/types";
import { Page } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const pages: Page[] = await prismadb.page.findMany({});
  const allSection = await prismadb.section.findMany({});
  const navbar = await prismadb.navbar.findFirst({});
  const links = await prismadb.link.findMany({});

  const allPages = pages && [
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

  const allSectionType: SectionType[] = allSection && [
    ...allSection.map((sectionSingle: any) => {
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
        },
      };
    }),
  ];

  const allInfo = {
    pages,
    allSection,
    navbar,
    links,
    allPages,
    allSectionType,
  };

  return NextResponse.json(allInfo);
}
