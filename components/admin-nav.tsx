"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  GraduationCap,
  FolderKanban,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  UserCheck,
  FolderOpen,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Tableau de bord",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Utilisateurs",
    href: "/admin/utilisateurs",
    icon: Users,
  },
  {
    title: "Formateurs",
    href: "/admin/formateurs",
    icon: UserCheck,
  },
  {
    title: "Produits",
    href: "/admin/produits",
    icon: ShoppingBag,
  },
  {
    title: "Commandes",
    href: "/admin/commandes",
    icon: FileText,
  },
  {
    title: "Formations",
    href: "/admin/formations",
    icon: GraduationCap,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: BookOpen,
  },
  {
    title: "Demandes de Devis",
    href: "/admin/devis",
    icon: FileText,
  },
  {
    title: "Projets",
    href: "/admin/projets",
    icon: FolderKanban,
  },
  {
    title: "Documents",
    href: "/admin/documents",
    icon: FolderOpen,
  },
  {
    title: "Rapports",
    href: "/admin/rapports",
    icon: BarChart3,
  },
  {
    title: "Paramètres",
    href: "/admin/parametres",
    icon: Settings,
  },
]

export function AdminNav() {
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
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            Retour au site
          </Button>
        </Link>
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
