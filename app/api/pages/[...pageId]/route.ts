import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Section, Service } from "@prisma/client";

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

    const sectionIds = sections.map((s: Section) => s.SectionId);

    const result = await prismadb.$transaction(async (prisma) => {
      // Aggiorna prima le sezioni che non sono più collegate a questa pagina
      await prisma.section.updateMany({
        where: {
          PageId: pageId[0],
          NOT: {
            SectionId: {
              in: sectionIds,
            },
          },
        },
        data: {
          PageId: null,
        },
      });

      // Poi aggiorna le sezioni attualmente collegate a questa pagina
      for (const section of sections) {
        await prisma.section.update({
          where: {
            SectionId: section.SectionId,
          },
          data: {
            PageId: pageId[0],
            data: {
              ...section.data,
            }, // Assicurati che la struttura di `section.data` sia corretta
          },
        });
      }
    });

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

// allSections.forEach(async (sec) => {
//   const isInSections: Section = sections.find(
//     (s: Section) => s.SectionId === sec.SectionId
//   );

//   if (isInSections) {
//     console.log("is in sections: " + sec.name);

//     const serviceCorrected: Service[] = [
//       ...sec.data.service.map((s, index) => {
//         return {
//           image: s.image,
//           LinkPage: isInSections.data.service[index].LinkPage,
//           description: s.description,
//           name: s.name,
//         };
//       }),
//     ];

//     try {
//       const req = await prismadb.section.update({
//         where: {
//           SectionId: sec.SectionId,
//         },
//         data: {
//           PageId: pageId[0],
//           data: {
//             animation: isInSections.data.animation,
//             animationType: isInSections.data.animationType,

//             backgroundImages: isInSections.data.backgroundImages,
//             backgroundImageOpacity: isInSections.data.backgroundImageOpacity,
//             backgroundColor: isInSections.data.backgroundColor,

//             images: isInSections.data.images,
//             imagesOnLeft: isInSections.data.imagesOnLeft,

//             textBlue: isInSections.data.textBlue,
//             textGreen: isInSections.data.textGreen,
//             textBlack: isInSections.data.textBlack,
//             description: isInSections.data.description,

//             carouselDots: isInSections.data.carouselDots,
//             carouselButtons: isInSections.data.carouselButtons,

//             service: serviceCorrected,

//             hScreen: isInSections.data.hScreen,
//             space: isInSections.data.space,

//             primaryButton: isInSections.data.primaryButton,
//             primaryButtonText: isInSections.data.primaryButtonText,
//             primaryLink: isInSections.data.primaryLink,
//             widthPrimaryButton: isInSections.data.widthPrimaryButton,
//             heightPrimaryButton: isInSections.data.heightPrimaryButton,

//             secondaryButton: isInSections.data.secondaryButton,
//             secondaryButtonText: isInSections.data.secondaryButtonText,
//             secondaryLink: isInSections.data.secondaryLink,
//             widthSecondaryButton: isInSections.data.widthSecondaryButton,
//             heightSecondaryButton: isInSections.data.heightSecondaryButton,

//             faq: isInSections.data.faq,
//             courseId: isInSections.data.courseId,
//           },
//         },
//       });

//       console.log("Sto per eseguire l'azione");

//       console.log(req);

//       console.log("Azione eseguita!");
//       console.log("Nuovo page id: " + req.PageId);
//       console.log("Console log avvenuto");
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     if (sec.PageId === pageId[0]) {
//       console.log("to delete: " + sec.name);

//       const service: Service[] = [
//         ...sec.data.service.map((s) => {
//           return {
//             image: s.image,
//             LinkPage: "",
//             description: s.description,
//             name: s.name,
//           };
//         }),
//       ];

//       console.log("Sto per eseguire l'azione");

//       const req = await prismadb.section.update({
//         where: {
//           SectionId: sec.SectionId,
//         },
//         data: {
//           PageId: null,
//           data: {
//             animation: sec.data.animation,
//             animationType: sec.data.animationType,

//             backgroundImages: sec.data.backgroundImages,
//             backgroundImageOpacity: sec.data.backgroundImageOpacity,
//             backgroundColor: sec.data.backgroundColor,

//             images: sec.data.images,
//             imagesOnLeft: sec.data.imagesOnLeft,

//             textBlue: sec.data.textBlue,
//             textGreen: sec.data.textGreen,
//             textBlack: sec.data.textBlack,
//             description: sec.data.description,

//             carouselDots: sec.data.carouselDots,
//             carouselButtons: sec.data.carouselButtons,

//             service: service,

//             hScreen: sec.data.hScreen,
//             space: sec.data.space,

//             primaryButton: sec.data.primaryButton,
//             primaryButtonText: sec.data.primaryButtonText,
//             primaryLink: "",
//             widthPrimaryButton: sec.data.widthPrimaryButton,
//             heightPrimaryButton: sec.data.heightPrimaryButton,

//             secondaryButton: sec.data.secondaryButton,
//             secondaryButtonText: sec.data.secondaryButtonText,
//             secondaryLink: "",
//             widthSecondaryButton: sec.data.widthSecondaryButton,
//             heightSecondaryButton: sec.data.heightSecondaryButton,

//             faq: sec.data.faq,
//             courseId: sec.data.courseId,
//           },
//         },
//       });

//       console.log("Azione eseguita!");
//       console.log("Nuovo page id: " + req.PageId);
//       console.log("Console log avvenuto");
//     }
//   }
// });
