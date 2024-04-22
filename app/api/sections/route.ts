import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
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
      courseId
    } = body;

    const existSection: Boolean = Boolean(
      await prismadb.section.findFirst({
        where: {
          name,
        },
      })
    );

    if(existSection){
      return new NextResponse("Il nome è già stato utilizzato, scegli un'altro nome", { status: 400 })
    }

    const existPageName: Boolean = Boolean(
      await prismadb.page.findFirst({
        where: {
          name,
        }
      })
    );

    if(existPageName){
      return new NextResponse(
        "Non puoi dare lo stesso di una pagina ad una sezione",
        { status: 400 }
      );
    }

    const existPageLink: Boolean = Boolean(
      await prismadb.page.findFirst({
        where: {
          link: name,
        },
      })
    );

    if (existPageLink) {
      return new NextResponse(
        "Una pagina possiede questo nome come link, modifica il nome",
        { status: 400 }
      );
    }

    const section = await prismadb.section.create({
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
