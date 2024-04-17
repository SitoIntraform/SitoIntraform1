import Loading from '@/components/Loading';
import NavbarClient from '@/components/NavbarClient';
import ShowPageComponent from '@/components/ShowPageComponent';
import axios from 'axios';
import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react'

async function getData() {
  const response = await fetch('https://intraform.vercel.app/api/getInfo');
  const data = await response.json();
  return data;
}

export default async function PageViewer() {

  const data = await getData();

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