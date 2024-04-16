import { PageType, SectionType } from "@/types";
import React, { useEffect } from "react";
import HeroView from "./HeroView";
import TextWithImageView from "./TextWithImageView";
import OnlyTextView from "./OnlyTextView";
import { Page } from "@prisma/client";

function ReturnViewComponent({
  pageType,
  section,
  dev,
  allPages,
  allSection
}: {
  pageType: string;
  section: SectionType;
  dev?: boolean;
  allPages: PageType[];
  allSection: SectionType[]
}) {
  if (pageType === "Hero") {
    return <HeroView dev={dev} section={section} allPages={allPages} allSections={allSection}  />;
  } else if (pageType === "TextWithImage") {
    return <TextWithImageView dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  } else if (pageType === "OnlyText") {
    return <OnlyTextView dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  }
}

export default ReturnViewComponent;
