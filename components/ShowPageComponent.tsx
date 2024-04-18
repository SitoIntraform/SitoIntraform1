"use client";

import { PageType, SectionType } from "@/types";
import { Link, Page } from "@prisma/client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReturnViewComponent from "./view/ReturnViewComponent";
import CustomScrollbar from "./CustomScrollbar";
import PageNotFound from "./PageNotFound";

function ShowPageComponent({
  links,
  allSections,
  allPages,
}: {
  links: Link[];
  allSections: SectionType[];
  allPages: PageType[];
}) {
  const [mounted, setMounted] = useState(false);

  const path = usePathname();

  console.log(allPages);

  const [page, setPage] = useState<PageType | null | undefined>(undefined);

  useEffect(() => {
    const p = allPages.find((pa) => pa.link === path.split("/")[1]);

    if (p) {
      setPage(p);
    } else {
      setPage(null);
    }
  }, [path]);

  useEffect(() => {
    window.scroll(0, 0);
    console.log("SCROLL TO TOP");
  }, [path]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CustomScrollbar
      containerStyle="h-screen"
      childrenContainerStyle="h-full  "
      scrollbarContainerStyle="absolute top-0 right-0 h-full w-2 bg-transparent"
      scrollbarStyle="left-0 absolute w-full bg-primaryDesign rounded-full"
      trackStyle="h-full absolute left-0 top-0 w-full"
    >
      {page === null ? (
        <PageNotFound />
      ) : (
        <div className="pt-[80px]">
          {page?.sections?.map((sectionID, index2) => {
            const section = allSections.find(
              (sec) => sec.SectionId === sectionID
            );

            if (!section) {
              return;
            }

            return (
              <div key={index2}>
                <ReturnViewComponent
                  allPages={allPages}
                  allSection={allSections}
                  section={section}
                  pageType={section.pageType}
                />
              </div>
            );
          })}
        </div>
      )}
    </CustomScrollbar>
  );
}

export default ShowPageComponent;
