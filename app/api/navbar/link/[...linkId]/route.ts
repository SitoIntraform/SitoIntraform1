import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params: { linkId } }: { params: { linkId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { type, titolo, link, multipleLink } = body;

    const linkWithSameName = await prismadb.link.findFirst({
      where: {
        titolo,
      },
    });

    if (linkWithSameName && linkWithSameName.LinkId !== linkId[0]) {
      return new NextResponse("Non puoi dare lo stesso nome a più link", {
        status: 400,
      });
    }

    const linkUpdate = await prismadb.link.update({
      data: {
        type,
        titolo,
        link,
        multipleLink,
      },
      where: {
        LinkId: linkId[0],
      },
    });

    return NextResponse.json(linkUpdate);
  } catch (err: any) {
    console.log("ERROR_SECTIONS_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params: { linkId } }: { params: { linkId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const nav = await prismadb.navbar.findFirst({});

    if (!nav) {
      return new NextResponse("Manca la navbar", { status: 400 });
    }

    const links = nav.links.filter((l) => l != linkId[0]);

    const updatedNav = await prismadb.navbar.update({
      data: {
        links,
      },
      where: {
        NavbraId: nav.NavbraId,
      },
    });

    const deleteLink = await prismadb.link.delete({
      where: {
        LinkId: linkId[0],
      },
    });

    return NextResponse.json(deleteLink);
  } catch (err: any) {
    console.log("ERROR_SECTIONS_DELETE", err);
    return new NextResponse(err, { status: 400 });
  }
}
