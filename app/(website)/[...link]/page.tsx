import NavbarClient from '@/components/NavbarClient';
import prismadb from '@/lib/prismadb'
import { headers } from 'next/headers';
import React from 'react'

async function WebsitePage() {
  const pages = await prismadb.page.findMany({});
  const allSection = await prismadb.section.findMany({});
  const navbar = await prismadb.navbar.findFirst({});
  const links = await prismadb.link.findMany({});

  const heads = headers()

 const pathname = heads.get('next-url')

 console.log(pathname);


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

  return (
    <>
      {/* <NavbarClient 
        allLinks={links}
        dev={false}
        allPage={allPages}
        links={navbar?.links || []}
        logo={navbar?.logo || ""}
        logoHeight={navbar?.logoHeight || 0}
        logoWidth={navbar?.logoWidth || 0}
        buttonHeight={navbar?.buttonHeight || 0}
        buttonWidth={navbar?.buttonWidth || 0}
        buttonLink={navbar?.buttonLink || ""}
        buttonText={navbar?.buttonText || ""}
      /> */}
    </>
  )
}

export default WebsitePage