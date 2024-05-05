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

      const BATCH_SIZE = 10; // Ridimensiona a seconda della capacità del tuo DB e del contesto
      for (let i = 0; i < sections.length; i += BATCH_SIZE) {
        const batch = sections.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map((section: any) =>
            prisma.section.update({
              where: {
                SectionId: section.SectionId,
              },
              data: {
                PageId: pageId[0],
                data: {
                  ...section.data,
                },
              },
            })
          )
        );
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

    const allPage = await prismadb.page.findMany();

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
    let text = "";

    linksNav.forEach((link) => {
      if (link.link === "/" + pageToDelete?.PageId && link.type === "Single") {
        usedInLinks = true;
        text = `Non puoi cancellare questa pagina poichè è utilizzata nel link della navbar ${link.titolo}`;
      }

      if (link.type === "Multiple") {
        link.multipleLink.forEach((single) => {
          if (single.link === "/" + pageToDelete?.PageId) {
            usedInLinks = true;
            text = `Non puoi cancellare questa pagina poichè è utilizzata nel link della navbar ${link.titolo}`;
          }
        });
      }
    });

    if (usedInLinks) {
      return new NextResponse(text, { status: 400 });
    }

    const sections = await prismadb.section.findMany({});

    let used = false;

    console.log(pageId);

    sections.forEach((sect) => {
      if (sect.PageId != null || sect.PageId != "") {
        if (sect.data.primaryLink === "/" + pageToDelete?.PageId) {
          used = true;
          const page = allPage.find((p) => p.PageId === sect.PageId);
          text = `Non puoi cancellare la pagina poichè è utilizzata come link nella sezione ${sect.name} nella pagina ${page?.name}`;
          return;
        }

        if (sect.data.secondaryLink === "/" + pageToDelete?.PageId) {
          used = true;
          const page = allPage.find((p) => p.PageId === sect.PageId);
          text = `Non puoi cancellare la pagina poichè è utilizzata come link nella sezione ${sect.name} nella pagina ${page?.name}`;
          return;
        }

        sect.data.service.forEach((serv) => {
          if (serv.LinkPage === "/" + pageToDelete?.PageId) {
            used = true;
            const page = allPage.find((p) => p.PageId === sect.PageId);
            text = `Non puoi cancellare la pagina poichè è utilizzata come link nella sezione ${sect.name} nella pagina ${page?.name}`;
            return;
          }
        });
      }
    });

    if (used) {
      return new NextResponse(text, { status: 400 });
    }

    if (pageToDelete?.defaltPage == true) {
      return new NextResponse(
        "Non puoi cancellare la pagina principale, imposta prima un'altra pagina come principale",
        { status: 400 }
      );
    }

    // const links = await prismadb.link.findMany({});

    // used = false;

    // links.forEach((link) => {
    //   if (link.link === "/" + pageToDelete?.PageId) {
    //     used = true;
    //   }

    //   link.multipleLink.forEach((mult) => {
    //     if (mult.link === "/" + pageToDelete?.PageId) {
    //       used = true;
    //     }
    //   });
    // });

    // if (used) {
    //   return new NextResponse(
    //     "Non puoi cancellare la pagina poichè è collegata ad un link nella navbar, cancella prima il link",
    //     { status: 400 }
    //   );
    // }

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
