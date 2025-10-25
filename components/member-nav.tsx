"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ShoppingBag, GraduationCap, FolderKanban, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Tableau de bord",
    href: "/membre/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mes achats",
    href: "/membre/achats",
    icon: ShoppingBag,
  },
  {
    title: "Mes formations",
    href: "/membre/formations",
    icon: GraduationCap,
  },
  {
    title: "Mes projets",
    href: "/membre/projets",
    icon: FolderKanban,
  },
  {
    title: "Mon profil",
    href: "/membre/profil",
    icon: User,
  },
]

export function MemberNav() {
  const pathname = usePathname()

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
            Déconnexion
          </Button>
        </Link>
      </div>
    </nav>
  )
}
