"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileText, Clock, CheckCircle2, XCircle, Eye } from "lucide-react"
import Link from "next/link"
import { getQuoteRequests } from "@/app/actions/quotes"

export default async function DevisPage() {
  const result = await getQuoteRequests()
  const quotes = result.success ? result.data : []

  const stats = [
    {
      title: "Total demandes",
      value: quotes.length.toString(),
      change: "Toutes",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "En attente",
      value: quotes.filter((q: any) => q.status === "pending").length.toString(),
      change: "À traiter",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Converties",
      value: quotes.filter((q: any) => q.status === "accepted").length.toString(),
      change: "Acceptées",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Refusées",
      value: quotes.filter((q: any) => q.status === "rejected").length.toString(),
      change: "Rejetées",
      icon: XCircle,
      color: "text-red-600",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { label: "En attente", className: "bg-orange-100 text-orange-700" },
      accepted: { label: "Acceptée", className: "bg-green-100 text-green-700" },
      rejected: { label: "Refusée", className: "bg-red-100 text-red-700" },
    }
    const config = variants[status] || variants.pending
    return (
      <Badge variant="default" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Demandes de Devis</h1>
        <p className="text-slate-600 mt-2">Gérez les demandes de devis et convertissez-les en commandes ou projets</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <p className="text-xs text-slate-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Rechercher..." className="pl-10" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Aucune demande de devis trouvée.
                    </TableCell>
                  </TableRow>
                ) : (
                  quotes.map((quote: any) => (
                    <TableRow key={quote.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {quote.name || quote.user?.first_name + " " + quote.user?.last_name}
                          </div>
                          <div className="text-sm text-slate-600">{quote.company || quote.user?.company}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{quote.email || quote.user?.email}</TableCell>
                      <TableCell className="text-sm">{quote.phone}</TableCell>
                      <TableCell className="text-sm">{new Date(quote.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(quote.status)}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/devis/${quote.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
