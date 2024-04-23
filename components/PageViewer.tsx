"use client";

import React, { useEffect, useState } from "react";
import NavbarClient from "./NavbarClient";
import ShowPageComponent from "./ShowPageComponent";
import { Course, Link, Navbar } from "@prisma/client";
import { PageType, SectionType } from "@/types";
import PrivacyModal from "./admin/modals/PrivacyModal";
import usePrivacyModal from "@/hooks/usePrivacyModal";
import { usePathname } from "next/navigation";
import Loading from "./Loading";

function PageViewer({
  links,
  allPages,
  navbar,
  allSectionType,
  allCourse,
}: {
  links: Link[];
  allPages: PageType[];
  navbar: Navbar | null;
  allSectionType: SectionType[];
  allCourse: Course[];
}) {
  const privacyModal = usePrivacyModal();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted){
    return <Loading />;
  }

  return (
    <div className="!w-screen !max-w-[100vw] !overflow-x-hidden">
      <NavbarClient
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
      />
      <ShowPageComponent
        allCourse={allCourse}
        links={links}
        allSections={allSectionType}
        allPages={allPages}
      />
      <PrivacyModal
        isOpen={privacyModal.isOpen}
        onClose={privacyModal.onClose}
      />
    </div>
  );
}

export default PageViewer;
