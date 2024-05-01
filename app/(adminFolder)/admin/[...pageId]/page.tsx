import EditPage from '@/components/admin/page/EditPage';
import prismadb from '@/lib/prismadb'
import { PageType, SectionType } from '@/types';
import { Section } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'

async function PageIdPage({
    params: { pageId }
} : {
    params: { pageId: string }
}) {

  const allPage = await prismadb.page.findMany({})

  const allSection: Section[] = await prismadb.section.findMany({});

  const page = allPage.find((page) => page.PageId == pageId);

  const pagesWithoutSelectedPage = allPage.filter((page) => page.PageId != pageId);

  const sectionsWithoutPage: Section[] = allSection.filter((section) => section.PageId == null);

  let sectionInPage: Section[] = []; 
  
  page?.sections.forEach((sec) => {
    const sect =  allSection.find((section) => sec === section.SectionId);

    if(sect){
      sectionInPage = [...sectionInPage, sect];
    }
  })

  console.log(sectionInPage);

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
          backgroundImageOpacity: sectionSingle?.data.backgroundImageOpacity || 100,
          backgroundColor: sectionSingle?.data.backgroundColor || "",

          images: sectionSingle?.data.images || [],
          imagesOnLeft: sectionSingle?.data.imagesOnLeft || false,

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

  const allCourse = await prismadb.course.findMany({});

  return (
    <EditPage pageData={page} allCourse={allCourse} possibleSectionData={sectionsWithoutPage} sectionInPage={sectionInPage} pagesWithoutSelectedPage={pagesWithoutSelectedPage} allPages={allPages} allSection={allSections} />
  )
}

export default PageIdPage

// await prismadb.section.findMany({
//   where: {
//     SectionId: {
//       in: page?.sections
//     }
//   },
// });