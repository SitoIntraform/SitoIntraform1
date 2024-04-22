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

    const {
      name,
      title,
      link,
      description,
      price,
      duration,
      code,
      haveFile,
      fileLink,
      image,
    } = body;

    const existingPage = await prismadb.page.findMany({
      where: {
        name: name,
      },
    });

    if (existingPage.length > 0) {
      return new NextResponse(
        "Il nome è già stato utilizzato per una pagina!",
        { status: 400 }
      );
    }

    const existPageLink = await prismadb.page.findMany({
      where: {
        link: link,
      },
    });

    if (existPageLink.length > 0) {
      return new NextResponse("Una pagina possiede questo link, modificalo", {
        status: 400,
      });
    }

    const existingCourse = await prismadb.course.findMany({
      where: {
        name: name,
      },
    });

    if (existingCourse.length > 0) {
      return new NextResponse("Il nome è già stato utilizzato per un corso!", {
        status: 400,
      });
    }

    const existingCourseLink = await prismadb.course.findMany({
      where: {
        link: link,
      },
    });

    if (existingCourseLink.length > 0) {
      return new NextResponse("Un corso possiede questo link, modificalo", {
        status: 400,
      });
    }

    const course = await prismadb.course.create({
      data: {
        name,
        title,
        link,
        description,
        price,
        duration,
        code,
        haveFile,
        fileLink,
        image,
      },
    });

    return NextResponse.json(course);
  } catch (err: any) {
    console.log("ERROR_COURSE_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}