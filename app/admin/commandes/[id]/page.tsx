"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  CreditCard,
  Package,
  User,
  MapPin,
  Printer,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [orderStatus, setOrderStatus] = useState("pending")
  const [paymentStatus, setPaymentStatus] = useState("pending")
  const [reminderMessage, setReminderMessage] = useState("")

  // Mock data - in production this would come from a database
  const order = {
    id: params.id,
    customer: {
      name: "Ahmed Benali",
      email: "ahmed@example.com",
      phone: "+213 555 987 654",
      address: "123 Rue de la Liberté, Alger, Algérie",
      company: "TechStart Algeria",
    },
    date: "2024-03-13T10:30:00",
    items: [
      {
        id: 1,
        name: "Service Développement App Mobile",
        description: "Application mobile e-commerce iOS et Android",
        quantity: 1,
        price: 150000,
        type: "Service",
      },
    ],
    subtotal: 150000,
    tax: 0,
    total: 150000,
    currency: "DZD",
    paymentMethod: "Virement CCP",
    paymentStatus: "pending",
    orderStatus: "pending",
    paymentProof: "/uploads/proof-003.pdf",
    paymentProofDate: "2024-03-14T14:20:00",
    notes: "Client demande livraison avant fin mars",
    history: [
      { date: "2024-03-13T10:30:00", action: "Commande créée", user: "Système" },
      { date: "2024-03-14T14:20:00", action: "Preuve de paiement uploadée", user: "Ahmed Benali" },
    ],
  }

  const handleSendReminder = () => {
    console.log("[v0] Sending reminder:", reminderMessage)
    // In production, this would send an email/SMS
  }

  const handleValidatePayment = () => {
    setPaymentStatus("paid")
    console.log("[v0] Payment validated")
    // In production, this would update the database
  }

  const handleRejectPayment = () => {
    setPaymentStatus("failed")
    console.log("[v0] Payment rejected")
    // In production, this would update the database and notify customer
  }

  const handleUpdateStatus = () => {
    console.log("[v0] Order status updated to:", orderStatus)
    // In production, this would update the database
  }

  return (
    <div className="max-w-full space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/commandes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Commande {order.id}</h1>
            <p className="text-muted-foreground">
              Créée le {new Date(order.date).toLocaleDateString("fr-FR")} à{" "}
              {new Date(order.date).toLocaleTimeString("fr-FR")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Facture
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Articles commandés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b last:border-0">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                      <Badge variant="outline" className="mt-2">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {item.price.toLocaleString()} {order.currency}
                      </div>
                      <div className="text-sm text-muted-foreground">Qté: {item.quantity}</div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>
                      {order.subtotal.toLocaleString()} {order.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TVA</span>
                    <span>
                      {order.tax.toLocaleString()} {order.currency}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>
                      {order.total.toLocaleString()} {order.currency}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Informations de paiement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informations</TabsTrigger>
                  <TabsTrigger value="proof">Preuve de paiement</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label className="text-muted-foreground">Méthode de paiement</Label>
                      <div className="font-medium">{order.paymentMethod}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Statut du paiement</Label>
                      <div className="mt-1">
                        {order.paymentStatus === "paid" && (
                          <Badge className="bg-green-500">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Payé
                          </Badge>
                        )}
                        {order.paymentStatus === "pending" && (
                          <Badge variant="secondary">
                            <Clock className="mr-1 h-3 w-3" />
                            En attente
                          </Badge>
                        )}
                        {order.paymentStatus === "failed" && (
                          <Badge variant="destructive">
                            <XCircle className="mr-1 h-3 w-3" />
                            Échoué
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Montant</Label>
                      <div className="font-bold text-lg">
                        {order.total.toLocaleString()} {order.currency}
                      </div>
                    </div>
                  </div>

                  {order.paymentStatus === "pending" && order.paymentProof && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleValidatePayment} className="flex-1">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Valider le paiement
                      </Button>
                      <Button onClick={handleRejectPayment} variant="destructive" className="flex-1">
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeter
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="proof" className="space-y-4">
                  {order.paymentProof ? (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-blue-500" />
                            <div>
                              <div className="font-medium">Preuve de paiement</div>
                              <div className="text-sm text-muted-foreground">
                                Uploadée le {new Date(order.paymentProofDate).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <img src="/payment-receipt.png" alt="Preuve de paiement" className="w-full rounded" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Aucune preuve de paiement uploadée</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Historique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.history.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {index < order.history.length - 1 && <div className="w-px h-full bg-border" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="font-medium">{event.action}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("fr-FR")} à{" "}
                        {new Date(event.date).toLocaleTimeString("fr-FR")}
                      </div>
                      <div className="text-sm text-muted-foreground">Par {event.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-medium">{order.customer.name}</div>
                {order.customer.company && (
                  <div className="text-sm text-muted-foreground">{order.customer.company}</div>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${order.customer.email}`} className="hover:underline">
                    {order.customer.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${order.customer.phone}`} className="hover:underline">
                    {order.customer.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{order.customer.address}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button className="w-full bg-transparent" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer un email
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler
                </Button>
                <a
                  href={`https://wa.me/${order.customer.phone.replace(/\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-transparent" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Statut de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Statut actuel</Label>
                <Select value={orderStatus} onValueChange={setOrderStatus}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="processing">En traitement</SelectItem>
                    <SelectItem value="completed">Complété</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdateStatus} className="w-full">
                Mettre à jour le statut
              </Button>
            </CardContent>
          </Card>

          {/* Send Reminder */}
          <Card>
            <CardHeader>
              <CardTitle>Relancer le client</CardTitle>
              <CardDescription>Envoyer un rappel de paiement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Message</Label>
                <Textarea
                  placeholder="Bonjour, nous n'avons pas encore reçu votre paiement..."
                  className="mt-2 min-h-[100px]"
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer le rappel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmer l'envoi</DialogTitle>
                    <DialogDescription>Un email de rappel sera envoyé à {order.customer.email}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Annuler</Button>
                    <Button onClick={handleSendReminder}>Envoyer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
