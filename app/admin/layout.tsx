import type React from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminNav } from "@/components/admin-nav"
import { PrivateFooter } from "@/components/private-footer"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container max-w-full flex-1 overflow-hidden py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <AdminNav />
            </div>
          </aside>
          <main className="min-w-0 max-w-full overflow-hidden">{children}</main>
        </div>
      </div>
      <PrivateFooter />
    </div>
  )
}
