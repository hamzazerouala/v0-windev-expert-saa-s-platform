"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react"
import { useState, useEffect } from "react"
import { CartButton } from "@/components/cart-button"
import { useAuth } from "@/lib/auth/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getUserInitials = () => {
    if (!user) return "U"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-border/60 bg-background/98 backdrop-blur-md shadow-lg"
          : "border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">W</span>
          </div>
          <span className="text-xl font-bold">WindevExpert</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/services"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Services
          </Link>
          <Link
            href="/formations"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Formations
          </Link>
          <Link
            href="/boutique"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Boutique
          </Link>
          <Link href="/blog" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(isAdmin ? "/admin/dashboard" : "/membre/dashboard")}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>{isAdmin ? "Administration" : "Mon espace"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/membre/profil")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login" className="hidden md:inline-flex">
                <Button variant="ghost" size="sm">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/register" className="hidden md:inline-flex">
                <Button size="sm">S&apos;inscrire</Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            <Link href="/services" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>
            <Link href="/formations" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Formations
            </Link>
            <Link href="/boutique" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Boutique
            </Link>
            <Link href="/blog" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => {
                      router.push(isAdmin ? "/admin/dashboard" : "/membre/dashboard")
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {isAdmin ? "Administration" : "Mon espace"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">S&apos;inscrire</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
