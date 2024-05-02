"use client";

import { PageType, SectionType } from "@/types";
import { Course, Link, Page } from "@prisma/client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReturnViewComponent from "./view/ReturnViewComponent";
import PageNotFound from "./PageNotFound";
import usePrivacyModal from "@/hooks/usePrivacyModal";
import ViewSingleCourse from "./view/ViewSingleCourse";

function ShowPageComponent({
  links,
  allSections,
  allPages,
  allCourse,
}: {
  links: Link[];
  allSections: SectionType[];
  allPages: PageType[];
  allCourse: Course[];
}) {
  const path = usePathname();

  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState<PageType | null | undefined>(undefined);
  const [course, setCourse] = useState<Course | null | undefined>(undefined);

  useEffect(() => {
    const p = allPages.find((pa) => pa.link === path.split("/")[1]);

    if (p) {
      setPage(p);
      setCourse(null);
    } else {
      setPage(null);
      const c = allCourse.find((co) => co.link === path.split("/")[1]);
      if (c) {
        setCourse(c);
      } else {
        setCourse(null);
      }
    }
  }, [path]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [path]);

  useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted){
    return null;
  }

  return (
    <>
      {page === null ? (
        <>
          {course === null ? (
            <>
              <header>
                <title>{"Pagina non trovata | Intraform, Pinerolo TO"}</title>
              </header>
              <PageNotFound />
            </>
          ) : (
            <>
              <header>
                <title>{course?.name + " | Intraform, Pinerolo TO"}</title>
              </header>
              <ViewSingleCourse
                name={course?.name || ""}
                link={course?.link || ""}
                title={course?.title || ""}
                description={course?.description || ""}
                price={course?.price || 0}
                duration={course?.duration || ""}
                code={course?.code || ""}
                image={course?.image || ""}
                haveFile={course?.haveFile || false}
                fileLink={course?.fileLink || ""}
                dev={false}
              />
            </>
          )}
        </>
      ) : (
        <>
          <header>
            <title>{page?.name + " | Intraform, Pinerolo TO"}</title>
          </header>
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
                    allCourse={allCourse}
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
        </>
      )}
    </>
  );
}

export default ShowPageComponent;

function Footer() {
  const privacy = usePrivacyModal();

  return (
    <div className="bg-primaryDesign md:px-20 px-5 pt-16 !max-w-[100%] !overflow-x-hidden">
      <div className="containerDesign  !text-white flex md:flex-row flex-col justify-between gap-10 flex-wrap relative">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="large-bold mb-[10px] !text-white">SEDE</p>
          <p className="regular-medium !text-white">Via E. Bignone 85/12</p>
          <p className="regular-medium !text-white">10064 Pinerolo (TO)</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 lg:absolute lg:left-[50%] lg:-translate-x-[50%] lg:top-3">
          <p className="large-bold mb-[10px] !text-white">
            ORARI DI SEGRETERIA
          </p>
          <p className="regular-medium !text-white flex flex-row justify-between w-[220px]">
            <p className="regular-medium !text-white">Lun - Ven</p>
            <p className="regular-medium !text-white">09:00 - 13:00</p>
          </p>
          <p className="regular-medium !text-white flex flex-row justify-between w-[220px]">
            <p className="regular-medium !text-white">Sab - Dom</p>
            <p className="regular-medium !text-white">Chiuso</p>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="large-bold mb-[10px] !text-white">RECAPITI</p>
          <p className="regular-medium !text-white">Tel: +39 0121 305343</p>
          <p className="regular-medium !text-white">Fax: +39 0121 303653</p>
          <p className="regular-medium !text-white underline underline-offset-2">
            info@intraform.it
          </p>
        </div>
      </div>
      <div className="pb-16 cursor-pointer pt-4 mt-8 border-t-2 border-white regular-medium !text-white w-full text-center underline underline-offset-1 flex sm:flex-row flex-col gap-4 items-center justify-center">
        <div>P.I. 10284960019</div>
        <div onClick={privacy.onOpen}>Privacy Policy</div>
      </div>
    </div>
  );
}
