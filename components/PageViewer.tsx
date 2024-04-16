"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarClient from "./NavbarClient";
import ShowPageComponent from "./ShowPageComponent";
import Loading from "./Loading";

function PageViewer() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const requestData = async () => {
      const req = await axios.get(`/api/getInfo`)
      setData(req.data);
    };

    requestData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      {/* <NavbarClient
        allLinks={data.links}
        dev={false}
        allPage={data.allPages}
        links={data.navbar?.links || []}
        logo={data.navbar?.logo || ""}
        logoHeight={data.navbar?.logoHeight || 0}
        logoWidth={data.navbar?.logoWidth || 0}
        buttonHeight={data.navbar?.buttonHeight || 0}
        buttonWidth={data.navbar?.buttonWidth || 0}
        buttonLink={data.navbar?.buttonLink || ""}
        buttonText={data.navbar?.buttonText || ""}
      />
      <ShowPageComponent
        links={data.links}
        allSections={data.allSectionType}
        allPages={data.allPages}
      /> */}
    </>
  );
}

export default PageViewer;