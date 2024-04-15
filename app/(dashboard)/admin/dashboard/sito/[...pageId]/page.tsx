import EditPage from '@/components/admin/page/EditPage';
import prismadb from '@/lib/prismadb'
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

  if(!page){
    redirect("/admin/dashboard/sito");
    return;
  }

  return (
    <EditPage pageData={page} possibleSectionData={sectionsWithoutPage} sectionInPage={sectionInPage} allPage={pagesWithoutSelectedPage} />
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