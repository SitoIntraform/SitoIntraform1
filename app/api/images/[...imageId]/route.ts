import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params: { imageId } }: { params: { imageId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    if (!imageId || imageId[0] === "undefined") {
      return new NextResponse("ImageId is required", { status: 400 });
    }

    console.log(imageId);

    const image = await prismadb.image.findFirst({
      where: {
        ImageId: imageId[0],
      },
    });

    const sections = await prismadb.section.findMany({});

    let imageInSec = false;
    let text = "";

    sections.forEach((section) => {
      if (section.data.backgroundImages === image?.link) {
        imageInSec = true;
        text = `Impossibile cancellare l'immagine poichè essa è usata come sfondo nella sezione ${section.name}`;
      }

      section.data.images.forEach((img) => {
        if (img === image?.link) {
          imageInSec = true;
          text = `Impossibile cancellare l'immagine poichè essa è usata come immagine nella sezione ${section.name}`;
        }
      });

      section.data.service.forEach((service) => {
        if (service.image === image?.link) {
          imageInSec = true;
          text = `Impossibile cancellare l'immagine poichè essa è usata come immagine servizio nella sezione ${section.name} servizio ${service.name}`;
        }
      });
    });

    if(imageInSec){
      return new NextResponse(text, { status: 400 });
    }

    const deletedImage = await prismadb.image.delete({
      where: {
        ImageId: imageId[0],
      },
    });

    return NextResponse.json(deletedImage);
  } catch (err: any) {
    console.log("ERROR_IMAGE_DELETE", err);
    return new NextResponse("Impossibile eliminare l'immagine", {
      status: 400,
    });
  }
}
