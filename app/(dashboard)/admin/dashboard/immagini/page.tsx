import ImagePageComponent from "@/components/admin/page/ImagePageComponent";
import ImagePage from "@/components/admin/page/ImagePageComponent";
import prismadb from "@/lib/prismadb";
import { ImageType } from "@/types";

async function ImmaginiPage() {

  const images = await prismadb.image.findMany({});

  console.log(images);

  return (
    <ImagePageComponent images={images} />
  );
}

export default ImmaginiPage;
