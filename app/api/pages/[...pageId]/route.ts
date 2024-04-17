import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params: { pageId } }: { params: { pageId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { name, link, defaultPage, sections } = body;

    console.log("DefaultPage: " + defaultPage);
    console.log(pageId[0]);

    const thereIsWhitSameName = await prismadb.page.findFirst({
      where: {
        name,
      },
    });

    if (thereIsWhitSameName && thereIsWhitSameName.PageId != pageId) {
      return new NextResponse("C'è già una pagina con quel nome", {
        status: 400,
      });
    }

    const thereIsWithSameLink = await prismadb.page.findFirst({
      where: {
        link,
      },
    });

    if (thereIsWithSameLink && thereIsWithSameLink.PageId != pageId) {
      return new NextResponse("C'è già una pagina con quel link", {
        status: 400,
      });
    }

    const thereIsSectionWithSameName = await prismadb.section.findFirst({
      where: {
        name,
      },
    });

    if (thereIsSectionWithSameName) {
      return new NextResponse(
        "C'è già una sezione con quel nome, non dare lo stesso ad una pagina e ad una sezione",
        { status: 400 }
      );
    }

    if (defaultPage == true) {
      const haveDefaultPage = await prismadb.page.findMany({
        where: {
          defaltPage: true,
        },
      });

      haveDefaultPage.map(async (page) => {
        if (page.PageId === pageId[0]) {
          return;
        }

        await prismadb.page.update({
          where: {
            PageId: page.PageId,
          },
          data: {
            name: page.name,
            link: page.name.replaceAll(" ", "-").toLowerCase(),
            defaltPage: false,
            sections: page.sections,
            numberSections: page.numberSections,
          },
        });
      });
    }

    const page = await prismadb.page.update({
      data: {
        name,
        link: defaultPage ? "" : link,
        defaltPage: defaultPage,
        sections: sections.map((section: any) => section.SectionId),
        numberSections: sections.length,
      },
      where: {
        PageId: pageId[0],
      },
    });

    const sectionToReset = await prismadb.section.findMany({
      where: {
        PageId: pageId[0],
      },
    });

    sectionToReset.forEach(async (sect) => {
      console.log("page to reset: " + sect.name);

      const isSectionIn = sections.find(
        (sec: any) => sec.SectionId === sect.SectionId
      );

      console.log(sections);

      if (isSectionIn) {
        return;
      }

      await prismadb.section.update({
        where: {
          SectionId: sect.SectionId,
        },
        data: {
          PageId: "",
          data: {
            animation: sect.data.animation,
            animationType: sect.data.animationType,

            backgroundImages: sect.data.backgroundImages,
            backgroundImageOpacity: sect.data.backgroundImageOpacity,
            backgroundColor: sect.data.backgroundColor,

            images: sect.data.images,
            imagesOnLeft: sect.data.imagesOnLeft,

            textBlue: sect.data.textBlue,
            textGreen: sect.data.textGreen,
            textBlack: sect.data.textBlack,
            description: sect.data.description,

            carouselDots: sect.data.carouselDots,
            carouselButtons: sect.data.carouselButtons,

            service: sect.data.service,

            hScreen: sect.data.hScreen,
            space: sect.data.space,

            primaryButton: sect.data.primaryButton,
            primaryButtonText: sect.data.primaryButtonText,
            primaryLink: "",
            widthPrimaryButton: sect.data.widthPrimaryButton,
            heightPrimaryButton: sect.data.heightPrimaryButton,

            secondaryButton: sect.data.secondaryButton,
            secondaryButtonText: sect.data.secondaryButtonText,
            secondaryLink: "",
            widthSecondaryButton: sect.data.widthSecondaryButton,
            heightSecondaryButton: sect.data.heightSecondaryButton,

            faq: sect.data.faq,
          },
        },
      });
    });

    sections.forEach(async (section: any) => {
      await prismadb.section.update({
        where: {
          SectionId: section.SectionId,
        },
        data: {
          PageId: pageId[0],
          data: {
            animation: section.data.animation,
            animationType: section.data.animationType,

            backgroundImages: section.data.backgroundImages,
            backgroundImageOpacity: section.data.backgroundImageOpacity,
            backgroundColor: section.data.backgroundColor,

            images: section.data.images,
            imagesOnLeft: section.data.imagesOnLeft,

            textBlue: section.data.textBlue,
            textGreen: section.data.textGreen,
            textBlack: section.data.textBlack,
            description: section.data.description,

            carouselDots: section.data.carouselDots,
            carouselButtons: section.data.carouselButtons,

            service: section.data.service,

            hScreen: section.data.hScreen,
            space: section.data.space,

            primaryButton: section.data.primaryButton,
            primaryButtonText: section.data.primaryButtonText,
            primaryLink: section.data.primaryLink,
            widthPrimaryButton: section.data.widthPrimaryButton,
            heightPrimaryButton: section.data.heightPrimaryButton,

            secondaryButton: section.data.secondaryButton,
            secondaryButtonText: section.data.secondaryButtonText,
            secondaryLink: section.data.secondaryLink,
            widthSecondaryButton: section.data.widthSecondaryButton,
            heightSecondaryButton: section.data.heightSecondaryButton,

            faq: section.data.faq,
          },
        },
      });
    });

    return NextResponse.json(page);
  } catch (err: any) {
    console.log("ERROR_PAGES_ID_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params: { pageId } }: { params: { pageId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const pageToDelete = await prismadb.page.findFirst({
      where: {
        PageId: pageId[0],
      },
    });

    const sectionWithPage = await prismadb.section.findMany({
      where: {
        PageId: pageId[0]
      }
    })

    if(sectionWithPage.length > 0){
      return new NextResponse(
        "Non puoi cancellare la pagina poichè al suo interno ha delle sezioni, pulisci prima tutto prima di poter cancellare",
        { status: 400 }
      );
    }

    const linksNav = await prismadb.link.findMany({ });

    let usedInLinks = false;

    linksNav.forEach((link) => {
      if(link.link === "/"+pageToDelete?.PageId && link.type === "Single"){
        usedInLinks=true;
      }

      if(link.type === "Multiple"){
        link.multipleLink.forEach((single) => {
          if (
            single.link === "/" + pageToDelete?.PageId
          ) {
            usedInLinks = true;
          }
        })
      }
    })

    if (usedInLinks) {
      return new NextResponse(
        "Non puoi cancellare la pagina poichè è collegata ad un link nella navbar, cancella prima di tutto il link",
        { status: 400 }
      );
    }

    const sections = await prismadb.section.findMany({});

    let used = false;
    console.log(pageId);

    sections.forEach((sect) => {
      if (sect.data.primaryLink === "/" + pageToDelete?.PageId) {
        used = true;
        return;
      }

      if (sect.data.secondaryLink === "/" + pageToDelete?.PageId) {
        used = true;
        return;
      }

      sect.data.service.forEach((serv) => {
        if (serv.LinkPage === "/" + pageToDelete?.PageId) {
          used = true;
          return;
        }
      });
    });

    if(used){
      return new NextResponse(
        "Non puoi cancellare la pagina poichè è usata come link in un'altra pagina, rimuovi prima il link",
        { status: 400 }
      );
    }

    if (pageToDelete?.defaltPage == true) {
      return new NextResponse(
        "Non puoi cancellare la pagina principale, imposta prima un'altra pagina come principale",
        { status: 400 }
      );
    }

    const links = await prismadb.link.findMany({});

    used = false;

    links.forEach((link) => {

      if(link.link === "/"+pageToDelete?.PageId){
        used = true;
      }

      link.multipleLink.forEach((mult) => {

        if(mult.link === "/"+pageToDelete?.PageId){
          used = true;
        }
      })
    })

    if(used){
      return new NextResponse(
        "Non puoi cancellare la pagina poichè è collegata ad un link nella navbar, cancella prima il link",
        { status: 400 }
      );
    }

    const page = await prismadb.page.delete({
      where: {
        PageId: pageId[0],
      },
    });

    return NextResponse.json(page);
  } catch (err: any) {
    console.log("ERROR_SECTIONS_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}
