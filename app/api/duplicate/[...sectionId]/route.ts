import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params: { sectionId } }: { params: { sectionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const oldSec = await prismadb.section.findUnique({
      where: {
        SectionId: sectionId[0],
      }
    })

    if(!oldSec){
      return new NextResponse("Nessuna sezione da copiare", { status: 400 });
    }

    const name = oldSec.name + " - copia";

    const existSection = await prismadb.section.findFirst({
      where: {
        name,
      },
    });

    if (existSection) {
      return new NextResponse(
        "Il nome è già stato utilizzato, scegli un'altro nome",
        { status: 400 }
      );
    }

    const {
      animation,
      animationType,

      backgroundImages,
      backgroundImageOpacity,
      backgroundColor,

      images,
      imagesOnLeft,

      textBlue,
      textGreen,
      textBlack,
      description,

      carouselDots,
      carouselButtons,

      service,

      hScreen,
      space,

      primaryButton,
      primaryButtonText,
      primaryLink,
      heightPrimaryButton,
      widthPrimaryButton,

      secondaryButton,
      secondaryButtonText,
      secondaryLink,
      heightSecondaryButton,
      widthSecondaryButton,

      faq,
      courseId,
    } = oldSec.data;

    const section = await prismadb.section.create({
      data: {
        name,
        pageType: oldSec.pageType,
        data: {
          animation,
          animationType,

          backgroundImages,
          backgroundImageOpacity,
          backgroundColor,

          images,
          imagesOnLeft,

          textBlue,
          textGreen,
          textBlack,
          description,

          carouselDots,
          carouselButtons,

          service,

          hScreen,
          space,

          primaryButton,
          primaryButtonText,
          primaryLink,
          heightPrimaryButton,
          widthPrimaryButton,

          secondaryButton,
          secondaryButtonText,
          secondaryLink,
          heightSecondaryButton,
          widthSecondaryButton,

          faq,
          courseId,
        },
      },
    });

    return NextResponse.json(section);
  } catch (err: any) {
    console.log("ERROR_SECTIONS_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}
