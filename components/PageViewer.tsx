"use client";

import React from "react";
import NavbarClient from "./NavbarClient";
import ShowPageComponent from "./ShowPageComponent";
import { Link, Navbar } from "@prisma/client";
import { PageType, SectionType } from "@/types";

function PageViewer({
  links,
  allPages,
  navbar,
  allSectionType,
}: {
  links: Link[];
  allPages: PageType[];
  navbar: Navbar | null;
  allSectionType: SectionType[];
}) {
  return (
    <div>
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
        links={links}
        allSections={allSectionType}
        allPages={allPages}
      />
    </div>
  );
}

export default PageViewer;
