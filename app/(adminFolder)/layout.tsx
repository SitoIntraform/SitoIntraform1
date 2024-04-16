import NextAuthProvider from '@/providers/NextAuthProvider'
import React from 'react'

function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
  )
}

export default DashboardLayout