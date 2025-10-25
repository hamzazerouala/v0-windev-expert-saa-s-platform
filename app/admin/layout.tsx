import type React from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminNav } from "@/components/admin-nav"
import { PrivateFooter } from "@/components/private-footer"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container flex-1 py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <AdminNav />
            </div>
          </aside>
          <main>{children}</main>
        </div>
      </div>
      <PrivateFooter />
    </div>
  )
}
