import CorsiPageComponent from '@/components/admin/page/CorsiPageComponent'
import prismadb from '@/lib/prismadb'
import React from 'react'

async function CorsiPage() {
  const corsi = await prismadb.course.findMany({});

  return (
    <CorsiPageComponent corsi={corsi} />
  )
}

export default CorsiPage