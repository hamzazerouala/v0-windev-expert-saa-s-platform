"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  GraduationCap,
  FolderKanban,
  User,
  LogOut,
  FileText,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"

export function MemberNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    {
      title: t("member.nav.dashboard"),
      href: "/membre/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("member.nav.formations"),
      href: "/membre/formations",
      icon: GraduationCap,
    },
    {
      title: t("member.nav.products"),
      href: "/membre/produits",
      icon: Package,
    },
    {
      title: t("member.nav.projects"),
      href: "/membre/projets",
      icon: FolderKanban,
    },
    {
      title: t("member.nav.documents"),
      href: "/membre/documents",
      icon: FileText,
    },
    {
      title: t("member.nav.orders"),
      href: "/membre/commandes",
      icon: ShoppingBag,
    },
    {
      title: t("member.nav.profile"),
      href: "/membre/profil",
      icon: User,
    },
  ]

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn("w-full justify-start", isActive && "bg-secondary")}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        )
      })}
      <div className="mt-4 pt-4 border-t border-border">
        <Link href="/auth/login">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            {t("member.nav.logout")}
          </Button>
        </Link>
      </div>
    </nav>
  )
}
