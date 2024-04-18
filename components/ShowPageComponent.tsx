"use client";

import { PageType, SectionType } from "@/types";
import { Link, Page } from "@prisma/client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReturnViewComponent from "./view/ReturnViewComponent";
import CustomScrollbar from "./CustomScrollbar";
import PageNotFound from "./PageNotFound";
import usePrivacyModal from "@/hooks/usePrivacyModal";

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
          <Footer />
        </div>
      )}
    </CustomScrollbar>
  );
}

export default ShowPageComponent;

function Footer() {
  const privacy = usePrivacyModal();

  return (
    <div className="bg-primaryDesign md:px-20 px-5 pt-10">
      <div className="containerDesign  !text-white flex flex-row justify-center gap-40 flex-wrap">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="large-bold mb-[10px] !text-white">SEDE</p>
          <p className="regular-medium !text-white">Via E. Bignone 85/12</p>
          <p className="regular-medium !text-white">10064 Pinerolo (TO)</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="large-bold mb-[10px] !text-white">RECAPITI</p>
          <p className="regular-medium !text-white">Tel: +39 0121 305343</p>
          <p className="regular-medium !text-white">Fax: +39 0121 303653</p>
          <p className="regular-medium !text-white underline underline-offset-2">
            info@intraform.it
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="large-bold mb-[10px] !text-white">
            ORARI DI SEGRETERIA
          </p>
          <p className="regular-medium !text-white flex flex-row justify-between w-full">
            <p className="regular-medium !text-white">Lun - Ven</p>
            <p className="regular-medium !text-white">09:00 - 13:00</p>
          </p>
          <p className="regular-medium !text-white flex flex-row justify-between w-full">
            <p className="regular-medium !text-white">Sab - Dom</p>
            <p className="regular-medium !text-white">Chiuso</p>
          </p>
        </div>
      </div>
      <div onClick={privacy.onOpen} className="pb-[20px] cursor-pointer pt-[5px] mt-[20px] border-t-2 border-white regular-medium !text-white w-full text-center underline underline-offset-1">
        Privacy Policy
      </div>
    </div>
  );
}
