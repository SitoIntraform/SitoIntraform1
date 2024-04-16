import CreateEditLinkComponent from "@/components/admin/page/CreateEditLinkComponent";
import prismadb from "@/lib/prismadb";
import { LinkType } from "@/types";
import React from "react";

async function CreateEditLinkPage({
  params: { linkId },
}: {
  params: { linkId: string };
}) {
  const link = linkId[0] != "new" ? await prismadb.link.findFirst({
    where: {
      LinkId: linkId[0],
    },
  }) : null;

  const avablePage = await prismadb.page.findMany({});

  const avablePageLinks: Array<{name: string, value: string}> = avablePage.map((page) => {
    return {
      name: page.name,
      value: "/"+page.PageId,
    }
  });

  const correctedLink: LinkType = {
    LinkId: link?.LinkId || "new",
    createdAt: link?.createdAt ? new Date(link?.createdAt).toUTCString() : "",
    updatedAt: link?.updatedAt ? new Date(link.updatedAt).toUTCString() : "",

    type: link?.type || "Single",
    titolo: link?.titolo || "",
    link: link?.link || "",
    multipleLink: link?.multipleLink || []
  }

  

  return <CreateEditLinkComponent correctedLink={correctedLink} avablePageLinks={avablePageLinks} />;
}

export default CreateEditLinkPage;
