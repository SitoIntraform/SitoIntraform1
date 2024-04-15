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

    const { images } = body;

    const ImagesOnDb = await prismadb.image.createMany({
      data: images.map((image: string) => ({ link: image })),
    });

    return NextResponse.json(ImagesOnDb);
  } catch (err: any) {
    console.log("ERROR_IMAGES_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}
