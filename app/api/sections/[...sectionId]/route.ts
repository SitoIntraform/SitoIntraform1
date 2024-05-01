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

    const body = await req.json();

    const {
      name,
      pageType,

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
    } = body;

    const existSection = await prismadb.section.findFirst({
      where: {
        name,
      },
    });

    if (existSection && existSection.SectionId != sectionId[0]) {
      return new NextResponse(
        "Il nome è già stato utilizzato, scegli un'altro nome",
        { status: 400 }
      );
    }

    console.log("IMAGES ON LEFT: " + imagesOnLeft);

    const section = await prismadb.section.update({
      where: {
        SectionId: sectionId[0],
      },
      data: {
        name,
        pageType,
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




export async function DELETE(
  req: Request,
  { params: { sectionId } }: { params: { sectionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const section = await prismadb.section.findUnique({
      where: {
        SectionId: sectionId[0]
      }
    })

    if(section?.PageId != null) {
      return new NextResponse(
        "Non puoi cancellare la sezione poichè è usata in una pagina",
        { status: 400 }
      );
    }

    const sectionInPage = await prismadb.page.findMany({
      where: {
        sections: {
          has: sectionId[0]
        }
      }
    });

    if(sectionInPage.length > 0){
      return new NextResponse("Non puoi cancellare la sezione poichè è usata in una pagina", { status: 400 });
    }

    const sectionDelete = await prismadb.section.delete({
      where: {
        SectionId: sectionId[0]
      }
    })

    return NextResponse.json(sectionDelete);
  } catch (err: any) {
    console.log("ERROR_SECTIONS_DELETE", err);
    return new NextResponse(err, { status: 400 });
  }
}
