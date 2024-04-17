import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Section } from "@prisma/client";

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

    const allSections = await prismadb.section.findMany({});

    allSections.forEach(async (sec) => {
      const isInSections: Section = sections.find(
        (s: Section) => s.SectionId === sec.SectionId
      );

      if (isInSections) {
        console.log("is in sections: " + sec.name);

        await prismadb.section.update({
          where: {
            SectionId: sec.SectionId,
          },
          data: {
            PageId: pageId[0],
            data: {
              animation: sec.data.animation,
              animationType: sec.data.animationType,

              backgroundImages: sec.data.backgroundImages,
              backgroundImageOpacity: sec.data.backgroundImageOpacity,
              backgroundColor: sec.data.backgroundColor,

              images: sec.data.images,
              imagesOnLeft: sec.data.imagesOnLeft,

              textBlue: sec.data.textBlue,
              textGreen: sec.data.textGreen,
              textBlack: sec.data.textBlack,
              description: sec.data.description,

              carouselDots: sec.data.carouselDots,
              carouselButtons: sec.data.carouselButtons,

              service: sec.data.service,

              hScreen: sec.data.hScreen,
              space: sec.data.space,

              primaryButton: sec.data.primaryButton,
              primaryButtonText: sec.data.primaryButtonText,
              primaryLink: sec.data.primaryLink,
              widthPrimaryButton: sec.data.widthPrimaryButton,
              heightPrimaryButton: sec.data.heightPrimaryButton,

              secondaryButton: sec.data.secondaryButton,
              secondaryButtonText: sec.data.secondaryButtonText,
              secondaryLink: sec.data.secondaryLink,
              widthSecondaryButton: sec.data.widthSecondaryButton,
              heightSecondaryButton: sec.data.heightSecondaryButton,

              faq: sec.data.faq,
            },
          },
        });
      } else {
        if (sec.PageId === pageId[0]) {
          console.log("to delete: " + sec.name);
          await prismadb.section.update({
            where: {
              SectionId: sec.SectionId,
            },
            data: {
              PageId: null,
              data: {
                animation: sec.data.animation,
                animationType: sec.data.animationType,

                backgroundImages: sec.data.backgroundImages,
                backgroundImageOpacity: sec.data.backgroundImageOpacity,
                backgroundColor: sec.data.backgroundColor,

                images: sec.data.images,
                imagesOnLeft: sec.data.imagesOnLeft,

                textBlue: sec.data.textBlue,
                textGreen: sec.data.textGreen,
                textBlack: sec.data.textBlack,
                description: sec.data.description,

                carouselDots: sec.data.carouselDots,
                carouselButtons: sec.data.carouselButtons,

                service: sec.data.service,

                hScreen: sec.data.hScreen,
                space: sec.data.space,

                primaryButton: sec.data.primaryButton,
                primaryButtonText: sec.data.primaryButtonText,
                primaryLink: "",
                widthPrimaryButton: sec.data.widthPrimaryButton,
                heightPrimaryButton: sec.data.heightPrimaryButton,

                secondaryButton: sec.data.secondaryButton,
                secondaryButtonText: sec.data.secondaryButtonText,
                secondaryLink: "",
                widthSecondaryButton: sec.data.widthSecondaryButton,
                heightSecondaryButton: sec.data.heightSecondaryButton,

                faq: sec.data.faq,
              },
            },
          });
        }
      }
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
        PageId: pageId[0],
      },
    });

    if (sectionWithPage.length > 0) {
      return new NextResponse(
        "Non puoi cancellare la pagina poichè al suo interno ha delle sezioni, pulisci prima tutto prima di poter cancellare",
        { status: 400 }
      );
    }

    const linksNav = await prismadb.link.findMany({});

    let usedInLinks = false;

    linksNav.forEach((link) => {
      if (link.link === "/" + pageToDelete?.PageId && link.type === "Single") {
        usedInLinks = true;
      }

      if (link.type === "Multiple") {
        link.multipleLink.forEach((single) => {
          if (single.link === "/" + pageToDelete?.PageId) {
            usedInLinks = true;
          }
        });
      }
    });

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

    if (used) {
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
      if (link.link === "/" + pageToDelete?.PageId) {
        used = true;
      }

      link.multipleLink.forEach((mult) => {
        if (mult.link === "/" + pageToDelete?.PageId) {
          used = true;
        }
      });
    });

    if (used) {
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
