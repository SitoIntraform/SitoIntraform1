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

    let { type, titolo, link, multipleLink } = body;

    const linkWithSameName = await prismadb.link.findFirst({
      where: {
        titolo,
      }
    })

    if(linkWithSameName){
      return new NextResponse("Non puoi dare lo stesso nome a più link", { status: 400 });
    }

    if(type === "Single"){
      multipleLink = [];
    }
    else{
      link = "";
    }

    const createLink = await prismadb.link.create({
      data: {
        type,
        titolo,
        link,
        multipleLink,
      },
    });

    let navbar = await prismadb.navbar.findFirst({});

    if (!navbar) {
      navbar = await prismadb.navbar.create({ data: {} });
    }

    const links = [...navbar.links, createLink.LinkId];

    await prismadb.navbar.update({
      where: {
        NavbraId: navbar.NavbraId,
      },
      data: {
        links,
      },
    });

    return NextResponse.json(createLink);
  } catch (err: any) {
    console.log("ERROR_IMAGES_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}


