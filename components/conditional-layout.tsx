"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't show site header/footer in member or admin areas
  const isProtectedArea = pathname?.startsWith("/membre") || pathname?.startsWith("/admin")

  if (isProtectedArea) {
    return <>{children}</>
  }

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
