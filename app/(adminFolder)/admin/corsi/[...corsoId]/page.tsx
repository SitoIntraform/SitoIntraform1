import CreateEditCorsoPageComponent from "@/components/admin/page/CreateEditCorsoPageComponent";
import PageNotFound from "@/components/PageNotFound";
import prismadb from "@/lib/prismadb";
import { Course } from "@prisma/client";
import React from "react";

async function page({
  params: { corsoId },
}: {
  params: {
    corsoId: string;
  };
}) {
  const queryImages = await prismadb.image.findMany({});

  const totalImage = [...queryImages.map((image) => image.link)];

  let course: Course | null = {
    CorsoId: "new",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    link: "",
    title: "",

    description: "",
    price: 0,
    duration: "",

    code: "",

    haveFile: false,
    fileLink: "",
    image: "",
  };

  if (corsoId[0] !== "new") {
    course = await prismadb.course.findUnique({
      where: {
        CorsoId: corsoId[0],
      },
    });
  }

  if(!course?.CorsoId){
    return <PageNotFound />;
  }

  return <CreateEditCorsoPageComponent course={course} totalImage={totalImage} />;
}

export default page;
