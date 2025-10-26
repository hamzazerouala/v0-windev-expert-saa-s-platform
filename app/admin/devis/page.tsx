"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, Clock, CheckCircle2, XCircle, Eye } from "lucide-react"
import Link from "next/link"

export default function DevisPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const stats = [
    {
      title: "Total demandes",
      value: "156",
      change: "+12 ce mois",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "En attente",
      value: "23",
      change: "À traiter",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Converties",
      value: "89",
      change: "57% taux conversion",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Refusées",
      value: "44",
      change: "28% du total",
      icon: XCircle,
      color: "text-red-600",
    },
  ]

  const quotes = [
    {
      id: "DEV-2024-001",
      client: "TechStore Algeria",
      email: "contact@techstore.dz",
      phone: "+213 555 123 456",
      type: "E-commerce",
      budget: "500 000 - 1 000 000 DZD",
      currency: "DZD",
      timeline: "1 à 3 mois",
      status: "pending",
      date: "2024-01-15",
      unreadMessages: 3,
    },
    {
      id: "WP-2024-002",
      client: "Digital Solutions",
      email: "info@digitalsolutions.fr",
      phone: "+33 6 12 34 56 78",
      type: "WordPress",
      budget: "5 000 € - 10 000 €",
      currency: "EUR",
      timeline: "Urgent (moins d'1 mois)",
      status: "pending",
      date: "2024-01-14",
      unreadMessages: 1,
    },
    {
      id: "DEV-2024-003",
      client: "Global Tech Inc",
      email: "contact@globaltech.com",
      phone: "+1 555 987 6543",
      type: "Application Web",
      budget: "$25,000 - $50,000",
      currency: "USD",
      timeline: "3 à 6 mois",
      status: "converted-order",
      date: "2024-01-10",
      unreadMessages: 0,
    },
    {
      id: "DEV-2024-004",
      client: "StartUp Innovante",
      email: "hello@startup.fr",
      phone: "+33 7 89 01 23 45",
      type: "Plateforme SaaS",
      budget: "Plus de 50 000 €",
      currency: "EUR",
      timeline: "3 à 6 mois",
      status: "converted-project",
      date: "2024-01-08",
      unreadMessages: 0,
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: "En attente", variant: "default" as const, className: "bg-orange-100 text-orange-700" },
      "converted-order": {
        label: "Convertie en commande",
        variant: "default" as const,
        className: "bg-blue-100 text-blue-700",
      },
      "converted-project": {
        label: "Convertie en projet",
        variant: "default" as const,
        className: "bg-green-100 text-green-700",
      },
      rejected: { label: "Refusée", variant: "destructive" as const, className: "" },
    }
    const config = variants[status as keyof typeof variants] || variants.pending
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
                <Input
                  placeholder="Rechercher par client, email ou ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="converted-order">Converties en commande</SelectItem>
                  <SelectItem value="converted-project">Converties en projet</SelectItem>
                  <SelectItem value="rejected">Refusées</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Délai</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-mono text-sm">{quote.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{quote.client}</div>
                        <div className="text-sm text-slate-600">{quote.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{quote.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{quote.budget}</div>
                        <div className="text-slate-600">{quote.currency}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{quote.timeline}</TableCell>
                    <TableCell className="text-sm">{quote.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(quote.status)}
                        {quote.unreadMessages > 0 && (
                          <Badge
                            variant="destructive"
                            className="h-5 w-5 p-0 flex items-center justify-center rounded-full"
                          >
                            {quote.unreadMessages}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/devis/${quote.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
