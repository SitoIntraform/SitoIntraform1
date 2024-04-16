import Loading from '@/components/Loading';
import NavbarClient from '@/components/NavbarClient';
import ShowPageComponent from '@/components/ShowPageComponent';
import axios from 'axios';
import { NextResponse } from 'next/server';
import React from 'react'

export async function loader({ params }: { params: any }) {
  const linkId = params.linkId;  // Assumi che il parametro dinamico sia 'linkId'

  // Chiamata API per ottenere i dati basati su 'linkId'
  const response = await axios.get(`/api/getInfo`);

  // Restituisce la risposta con i dati e disabilita la cache
  return NextResponse.json(response.data, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

// Componente React per visualizzare i dati
export default function PageViewer({ data }: { data: any }) {

  console.log(data);

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