import CreateEditSectionPage from "@/components/admin/page/CreateEditSectionPage";
import prismadb from "@/lib/prismadb";
import { SectionType } from "@/types";

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
    },
  };

  return <CreateEditSectionPage id={sectionId} sectionRecived={section} totalImage={totalImage} />;
}

export default SectionIdPage;


