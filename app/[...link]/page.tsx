"use client"

import Loading from '@/components/Loading';
import NavbarClient from '@/components/NavbarClient';
import ShowPageComponent from '@/components/ShowPageComponent';
import axios from 'axios';
import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react'


export default function PageViewer() {

  const [data, setData] = useState<any>();

  const getData = async () => {
    try {
      const res = await axios.get("/api/getInfo", {
        headers: {
          'Cache-Control': 'no-store, max-age=0'
        }
      });
      console.log(res.data);
      setData(res.data);
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  if (!data) {
    return <Loading />
  }

  return (
    <>
      <NavbarClient
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
      />
    </>
  );
}