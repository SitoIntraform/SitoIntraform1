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
  }, []);

  if (!mounted) {
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
                price={course?.price || ""}
                duration={course?.duration || ""}
                code={course?.code || ""}
                image={course?.image || ""}
                destination={course?.destination || ""}
                imageBottomDescription={course?.imageBottomDescription || ""}
                dev={false}
              />
              <div className="mt-[20px]"></div>
              <Footer />
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
    <footer className="bg-primaryDesign !max-w-[100%] !overflow-x-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-16 pb-10 !text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="large-bold mb-[6px] !text-white">SEDE</p>
            <p className="regular-medium !text-white">Via E. Bignone 85/12</p>
            <p className="regular-medium !text-white">10064 Pinerolo (TO)</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="large-bold mb-[6px] !text-white">ORARI DI SEGRETERIA</p>
            <div className="regular-medium !text-white flex flex-row justify-between w-[220px]">
              <span>Lun - Ven</span>
              <span>09:00 - 13:00</span>
            </div>
            <div className="regular-medium !text-white flex flex-row justify-between w-[220px]">
              <span>Sab - Dom</span>
              <span>Chiuso</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="large-bold mb-[6px] !text-white">RECAPITI</p>
            <p className="regular-medium !text-white">Tel: +39 0121 305343</p>
            <p className="regular-medium !text-white">Fax: +39 0121 303653</p>
            <a
              href="mailto:info@intraform.it"
              className="regular-medium !text-white underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              info@intraform.it
            </a>
          </div>
        </div>
        <div className="pt-5 mt-10 border-t border-white/40 regular-medium !text-white w-full text-center flex sm:flex-row flex-col gap-4 items-center justify-center">
          <div>P.I. 10284960019</div>
          <div
            onClick={privacy.onOpen}
            className="cursor-pointer underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Privacy Policy
          </div>
        </div>
      </div>
    </footer>
  );
}
