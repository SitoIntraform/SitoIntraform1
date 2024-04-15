import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const {
      links,
      logo,
      logoWidth,
      logoHeight,
      buttonText,
      buttonWidth,
      buttonHeight,
      buttonLink,
    } = body;

    let navbar = await prismadb.navbar.findFirst({});

    if (!navbar) {
      navbar = await prismadb.navbar.create({ data: {} });
    }

    const navbarUpdated = await prismadb.navbar.update({
      where: {
        NavbraId: navbar.NavbraId,
      },
      data: {
        links,
        logo,
        logoWidth,
        logoHeight,
        buttonText,
        buttonWidth,
        buttonHeight,
        buttonLink,
      },
    });

    return NextResponse.json(navbarUpdated);
  } catch (err: any) {
    console.log("ERROR_IMAGES_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}
