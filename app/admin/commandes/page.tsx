"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Download,
  Eye,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  CreditCard,
  Banknote,
} from "lucide-react"
import Link from "next/link"

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [currencyFilter, setCurrencyFilter] = useState("all")

  // Mock data - in production this would come from a database
  const orders = [
    {
      id: "CMD-2024-001",
      customer: { name: "Jean Dupont", email: "jean@example.com", phone: "+213 555 123 456" },
      date: "2024-03-15",
      items: [{ name: "Formation WinDev Avancé", quantity: 1, price: 45000 }],
      total: 45000,
      currency: "DZD",
      paymentMethod: "Chargily",
      paymentStatus: "paid",
      orderStatus: "completed",
      paymentProof: null,
    },
    {
      id: "CMD-2024-002",
      customer: { name: "Marie Martin", email: "marie@example.com", phone: "+33 6 12 34 56 78" },
      date: "2024-03-14",
      items: [{ name: "Logiciel Gestion Stock", quantity: 1, price: 279 }],
      total: 279,
      currency: "EUR",
      paymentMethod: "Stripe",
      paymentStatus: "paid",
      orderStatus: "completed",
      paymentProof: null,
    },
    {
      id: "CMD-2024-003",
      customer: { name: "Ahmed Benali", email: "ahmed@example.com", phone: "+213 555 987 654" },
      date: "2024-03-13",
      items: [{ name: "Service Développement App Mobile", quantity: 1, price: 150000 }],
      total: 150000,
      currency: "DZD",
      paymentMethod: "Virement CCP",
      paymentStatus: "pending",
      orderStatus: "pending",
      paymentProof: "/uploads/proof-003.pdf",
    },
    {
      id: "CMD-2024-004",
      customer: { name: "Sophie Bernard", email: "sophie@example.com", phone: "+33 6 98 76 54 32" },
      date: "2024-03-12",
      items: [{ name: "Template E-commerce", quantity: 1, price: 199 }],
      total: 199,
      currency: "EUR",
      paymentMethod: "Stripe",
      paymentStatus: "paid",
      orderStatus: "processing",
      paymentProof: null,
    },
    {
      id: "CMD-2024-005",
      customer: { name: "Karim Mansouri", email: "karim@example.com", phone: "+213 555 456 789" },
      date: "2024-03-11",
      items: [{ name: "Formation WebDev", quantity: 1, price: 35000 }],
      total: 35000,
      currency: "DZD",
      paymentMethod: "Virement Bancaire",
      paymentStatus: "pending",
      orderStatus: "pending",
      paymentProof: null,
    },
  ]

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="mr-1 h-3 w-3" />
            Payé
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            En attente
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Échoué
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline">
            <AlertCircle className="mr-1 h-3 w-3" />
            Remboursé
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Complété</Badge>
      case "processing":
        return <Badge className="bg-blue-500">En traitement</Badge>
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    if (method === "Stripe") return <CreditCard className="h-4 w-4" />
    if (method === "Chargily") return <DollarSign className="h-4 w-4" />
    return <Banknote className="h-4 w-4" />
  }

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "DZD") return `${amount.toLocaleString()} DZD`
    if (currency === "EUR") return `${amount}€`
    if (currency === "USD") return `$${amount}`
    return `${amount} ${currency}`
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter
    const matchesCurrency = currencyFilter === "all" || order.currency === currencyFilter
    return matchesSearch && matchesStatus && matchesPayment && matchesCurrency
  })

  const stats = {
    totalSales: orders.reduce((sum, order) => (order.paymentStatus === "paid" ? sum + order.total : sum), 0),
    totalOrders: orders.length,
    pendingPayments: orders.filter((o) => o.paymentStatus === "pending").length,
    pendingProofs: orders.filter((o) => o.paymentProof && o.paymentStatus === "pending").length,
  }

  return (
    <div className="max-w-full space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Commandes</h1>
          <p className="text-muted-foreground">Gérez les commandes et paiements clients</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()} DZD</div>
            <p className="text-xs text-muted-foreground">Commandes payées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">Toutes les commandes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">Paiements en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">À suivre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Preuves à valider</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.pendingProofs}</div>
            <p className="text-xs text-muted-foreground">Paiements hors ligne</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des commandes</CardTitle>
                <CardDescription>{filteredOrders.length} commande(s)</CardDescription>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par N° ou client..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les paiements</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                  <SelectItem value="refunded">Remboursé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="processing">En traitement</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes devises</SelectItem>
                  <SelectItem value="DZD">DZD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">N° Commande</TableHead>
                <TableHead className="min-w-[150px]">Client</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Articles</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead className="hidden xl:table-cell">Méthode</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead className="hidden lg:table-cell">Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{order.customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(order.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{order.items.length}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(order.total, order.currency)}</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(order.paymentMethod)}
                      <span className="text-sm">{order.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell className="hidden lg:table-cell">{getOrderStatusBadge(order.orderStatus)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/commandes/${order.id}`}>
                        <Button variant="ghost" size="icon" title="Voir détails">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" title="Envoyer email">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Appeler">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
