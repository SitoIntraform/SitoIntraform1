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

    const allSectionWithId = await prismadb.section.findMany({
      where: {
        PageId: pageId[0],
      }
    });

    const sectionToReset = allSectionWithId.map((s) => {

      if(sections.find((sec: any) => sec.PageId === s.PageId)){
        return s;
      }
    });

    if(sectionToReset.length > 0){
      sectionToReset.forEach(async (s) => {

        await prismadb.section.update({
          where: {
            SectionId: s?.SectionId,
          },
          data: {
            PageId: null,
            data: {
              animation: s?.data.animation,
              animationType: s?.data.animationType,

              backgroundImages: s?.data.backgroundImages,
              backgroundImageOpacity: s?.data.backgroundImageOpacity,
              backgroundColor: s?.data.backgroundColor,

              images: s?.data.images,
              imagesOnLeft: s?.data.imagesOnLeft,

              textBlue: s?.data.textBlue,
              textGreen: s?.data.textGreen,
              textBlack: s?.data.textBlack,
              description: s?.data.description,

              carouselDots: s?.data.carouselDots,
              carouselButtons: s?.data.carouselButtons,

              service: s?.data.service,

              hScreen: s?.data.hScreen,
              space: s?.data.space,

              primaryButton: s?.data.primaryButton,
              primaryButtonText: s?.data.primaryButtonText,
              primaryLink: s?.data.primaryLink,
              widthPrimaryButton: s?.data.widthPrimaryButton,
              heightPrimaryButton: s?.data.heightPrimaryButton,

              secondaryButton: s?.data.secondaryButton,
              secondaryButtonText: s?.data.secondaryButtonText,
              secondaryLink: s?.data.secondaryLink,
              widthSecondaryButton: s?.data.widthSecondaryButton,
              heightSecondaryButton: s?.data.heightSecondaryButton,

              faq: s?.data.faq,
            },
          },
        });

      })
    }

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
