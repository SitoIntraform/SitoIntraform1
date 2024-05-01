import CreateEditSectionPage from "@/components/admin/page/CreateEditSectionPage";
import prismadb from "@/lib/prismadb";
import { PageType, SectionType } from "@/types";

async function SectionIdPage({
  params: { sectionId },
}: {
  params: {
    sectionId: string;
  };
}) {

  const queryImages = await prismadb.image.findMany({});

  const totalImage = [...queryImages.map((image) => image.link)];

  const sectionDb = sectionId[0] != "new" ? await prismadb.section.findFirst({
    where: {
      SectionId: sectionId[0]
    }
  }) : null;

  const section: SectionType = {
    SectionId: sectionDb?.SectionId || "",
    updatedAt: sectionDb?.updatedAt.toString() || "",
    createdAt: sectionDb?.createdAt.toString() || "",
    name: sectionDb?.name || "",
    pageType: sectionDb?.pageType || "",

    data: {
      animation: sectionDb?.data.animation || false,
      animationType: sectionDb?.data.animationType || "up",

      backgroundImages: sectionDb?.data.backgroundImages || "",
      backgroundImageOpacity: sectionDb?.data.backgroundImageOpacity || 100,
      backgroundColor: sectionDb?.data.backgroundColor || "",

      images: sectionDb?.data.images ||[],
      imagesOnLeft: sectionDb?.data.imagesOnLeft || true,

      textBlue: sectionDb?.data.textBlue || "",
      textGreen: sectionDb?.data.textGreen || "",
      textBlack: sectionDb?.data.textBlack || "",
      description: sectionDb?.data.description || "",

      carouselDots: sectionDb?.data.carouselDots || false,
      carouselButtons: sectionDb?.data.carouselButtons || false,

      service: sectionDb?.data.service|| [],

      hScreen: sectionDb?.data.hScreen || false,
      space: sectionDb?.data.space || 40,

      primaryButton: sectionDb?.data.primaryButton || false,
      primaryButtonText: sectionDb?.data.primaryButtonText || "",
      primaryLink: sectionDb?.data.primaryLink || "",
      heightPrimaryButton: sectionDb?.data.heightPrimaryButton || 0,
      widthPrimaryButton: sectionDb?.data.widthPrimaryButton || 0,

      secondaryButton: sectionDb?.data.secondaryButton || false,
      secondaryButtonText: sectionDb?.data.secondaryButtonText || "",
      secondaryLink: sectionDb?.data.secondaryLink || "",
      heightSecondaryButton: sectionDb?.data.heightSecondaryButton || 0,
      widthSecondaryButton: sectionDb?.data.widthSecondaryButton || 0,

      faq: sectionDb?.data.faq || [],

      courseId: sectionDb?.data.courseId || [],
    },
  };

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

  const sections = await prismadb.section.findMany({});

  const allSections: SectionType[] = section && [
    ...sections.map((sectionSingle) => {
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

          courseId: sectionSingle?.data.courseId || []
        },
      };
    }),
  ];

  const allCourse = await prismadb.course.findMany({});

  return <CreateEditSectionPage allCourse={allCourse} allPages={allPages} allSection={allSections} id={sectionId} sectionRecived={section} totalImage={totalImage} />;
}

export default SectionIdPage;


