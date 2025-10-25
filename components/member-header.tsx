import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export function MemberHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/membre/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">W</span>
          </div>
          <span className="text-xl font-bold">Espace Membre</span>
        </Link>

        <Link href="/">
          <Button variant="ghost" size="sm">
            <Home className="mr-2 h-4 w-4" />
            Retour au site
          </Button>
        </Link>
      </div>
    </header>
  )
}
