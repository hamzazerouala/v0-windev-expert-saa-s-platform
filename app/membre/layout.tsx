import type React from "react"
import { MemberHeader } from "@/components/member-header"
import { MemberNav } from "@/components/member-nav"
import { PrivateFooter } from "@/components/private-footer"

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MemberHeader />
      <div className="container flex-1 py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <MemberNav />
            </div>
          </aside>
          <main>{children}</main>
        </div>
      </div>
      <PrivateFooter />
    </div>
  )
}
