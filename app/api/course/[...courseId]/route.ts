import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
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

    const existingPage = await prismadb.page.findFirst({
      where: {
        name: name,
      },
    });

    if (existingPage) {
      return new NextResponse(
        "Il nome è già stato utilizzato per una pagina!",
        { status: 400 }
      );
    }

    const existPageLink = await prismadb.page.findFirst({
      where: {
        link: link,
      },
    });

    if (existPageLink) {
      return new NextResponse("Una pagina possiede questo link, modificalo", {
        status: 400,
      });
    }

    const existingCourse = await prismadb.course.findFirst({
      where: {
        name: name,
      },
    });

    if (existingCourse && existingCourse.CorsoId != courseId[0]) {
      return new NextResponse("Il nome è già stato utilizzato per un corso!", {
        status: 400,
      });
    }

    const existingCourseLink = await prismadb.course.findFirst({
      where: {
        link: link,
      },
    });

    if (existingCourseLink && existingCourseLink.CorsoId != courseId[0]) {
      return new NextResponse("Un corso possiede questo link, modificalo", {
        status: 400,
      });
    }

    const course = await prismadb.course.update({
      where: {
        CorsoId: courseId[0],
      },
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
    console.log("ERROR_SECTIONS_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sections = await prismadb.section.findMany({});

    let canDelte = true;

    sections.forEach((section) => {
      if (section.data.courseId && section.data.courseId.length > 0) {
        section.data.courseId.forEach((value) => {
          if (value === courseId[0]) {
            canDelte = false;
          }
        });
      }
    });

    if (!canDelte) {
      return new NextResponse(
        "Non puoi eliminare questo corso poichè è utilizzato",
        {
          status: 400,
        }
      );
    }

    const sectionDelete = await prismadb.course.delete({
      where: {
        CorsoId: courseId[0],
      },
    });

    return NextResponse.json(sectionDelete);
  } catch (err: any) {
    console.log("ERROR_SECTIONS_DELETE", err);
    return new NextResponse(err, { status: 400 });
  }
}
