import NavbarClient from '@/components/NavbarClient';
import PageViewer from '@/components/PageViewer';
import ShowPageComponent from '@/components/ShowPageComponent';
import prismadb from '@/lib/prismadb';
import { SectionType } from '@/types';
import { Page } from '@prisma/client';
import axios from 'axios';
import React, { useEffect } from 'react'

async function page() {
  return (
    <>
      <PageViewer />
    </>
  )
}

export default page