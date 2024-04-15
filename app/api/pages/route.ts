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

    const { name, link } = body;

    const thereIsWhitSameName = await prismadb.page.findFirst({
      where: {
        name,
      },
    });

    if (thereIsWhitSameName) {
      return new NextResponse("C'è già una pagina con quel nome", {
        status: 400,
      });
    }

    const thereIsWithSameLink = await prismadb.page.findFirst({
      where: {
        link,
      },
    });

    if (thereIsWithSameLink) {
      return new NextResponse("C'è già una pagina con quel link", {
        status: 400,
      });
    }

    const thereIsDefaultPage = await prismadb.page.findFirst({
      where: {
        defaltPage: true,
      },
    });

    const thereIsSectionWithSameName = await prismadb.section.findFirst({
      where: {
        name,
      }
    })

    if(thereIsSectionWithSameName) {
      return new NextResponse("C'è già una sezione con quel nome, non dare lo stesso ad una pagina e ad una sezione", { status: 400 });
    }

    const page = await prismadb.page.create({
      data: {
        name,
        link: thereIsDefaultPage ? link : "",
        defaltPage: thereIsDefaultPage ? false : true,
      },
    });

    return NextResponse.json(page);
  } catch (err: any) {
    console.log("ERROR_PAGES_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}
