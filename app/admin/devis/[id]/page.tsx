"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Send,
  ShoppingCart,
  FolderKanban,
  XCircle,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Clock,
  FileText,
  User,
} from "lucide-react"
import Link from "next/link"

export default function DevisDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  // Mock data
  const quote = {
    id: params.id,
    client: "TechStore Algeria",
    email: "contact@techstore.dz",
    phone: "+213 555 123 456",
    company: "TechStore SARL",
    type: "E-commerce",
    services: ["Développement", "Design UI/UX", "Paiement en ligne", "Hébergement"],
    budget: "500 000 - 1 000 000 DZD",
    currency: "DZD",
    timeline: "1 à 3 mois",
    features: ["Tableau de bord admin", "Gestion utilisateurs", "Paiement sécurisé", "Export de données"],
    description:
      "Nous souhaitons créer une plateforme e-commerce moderne pour vendre nos produits électroniques en Algérie. Le site doit supporter les paiements en ligne (CCP, Chargily) et offrir une expérience utilisateur fluide.",
    status: "pending",
    date: "2024-01-15",
  }

  const messages = [
    {
      id: 1,
      sender: "client",
      name: "TechStore Algeria",
      content: "Bonjour, j'aimerais avoir plus d'informations sur les délais de réalisation.",
      date: "2024-01-15 10:30",
    },
    {
      id: 2,
      sender: "admin",
      name: "WindevExpert",
      content:
        "Bonjour, merci pour votre demande. Pour un projet e-commerce de cette envergure, nous estimons un délai de 2 à 3 mois. Nous pouvons organiser un appel pour discuter des détails.",
      date: "2024-01-15 14:20",
    },
    {
      id: 3,
      sender: "client",
      name: "TechStore Algeria",
      content: "Parfait, je suis disponible cette semaine pour un appel. Pouvez-vous m'envoyer un devis détaillé ?",
      date: "2024-01-16 09:15",
    },
  ]

  const handleSendMessage = async () => {
    if (!message.trim()) return
    setSending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setMessage("")
    setSending(false)
  }

  const handleConvertToOrder = () => {
    if (confirm("Voulez-vous convertir cette demande de devis en commande ?")) {
      router.push("/admin/commandes/nouveau?from=devis&id=" + quote.id)
    }
  }

  const handleConvertToProject = () => {
    if (confirm("Voulez-vous convertir cette demande de devis en projet ?")) {
      router.push("/admin/projets/nouveau?from=devis&id=" + quote.id)
    }
  }

  const handleReject = () => {
    if (confirm("Voulez-vous refuser cette demande de devis ?")) {
      // Handle rejection
      router.push("/admin/devis")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/devis">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Demande de Devis #{quote.id}</h1>
            <p className="text-slate-600 mt-1">Reçue le {quote.date}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReject} className="text-red-600 hover:text-red-700 bg-transparent">
            <XCircle className="h-4 w-4 mr-2" />
            Refuser
          </Button>
          <Button
            variant="outline"
            onClick={handleConvertToOrder}
            className="text-blue-600 hover:text-blue-700 bg-transparent"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Convertir en commande
          </Button>
          <Button onClick={handleConvertToProject} className="bg-cyan-600 hover:bg-cyan-700">
            <FolderKanban className="h-4 w-4 mr-2" />
            Convertir en projet
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informations Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-600">Nom / Entreprise</div>
                    <div className="font-medium">{quote.client}</div>
                    {quote.company && <div className="text-sm text-slate-600">{quote.company}</div>}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-600">Email</div>
                    <div className="font-medium">{quote.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-600">Téléphone</div>
                    <div className="font-medium">{quote.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-600">Date de demande</div>
                    <div className="font-medium">{quote.date}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Détails du Projet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm text-slate-600">Type de projet</Label>
                <div className="mt-1">
                  <Badge variant="outline" className="text-base">
                    {quote.type}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm text-slate-600">Services demandés</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quote.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm text-slate-600">Fonctionnalités souhaitées</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quote.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm text-slate-600">Description du projet</Label>
                <p className="mt-2 text-slate-900 whitespace-pre-wrap">{quote.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Messaging */}
          <Card>
            <CardHeader>
              <CardTitle>Messagerie</CardTitle>
              <CardDescription>Échangez directement avec le client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        msg.sender === "admin" ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">{msg.name}</div>
                      <p className="text-sm">{msg.content}</p>
                      <div className={`text-xs mt-2 ${msg.sender === "admin" ? "text-cyan-100" : "text-slate-600"}`}>
                        {msg.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex gap-2">
                <Textarea
                  placeholder="Écrivez votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim() || sending} className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budget & Délai</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm text-slate-600">Budget estimé</div>
                  <div className="font-semibold text-slate-900">{quote.budget}</div>
                  <Badge variant="outline" className="mt-1">
                    {quote.currency}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm text-slate-600">Délai souhaité</div>
                  <div className="font-semibold text-slate-900">{quote.timeline}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href={`mailto:${quote.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer un email
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href={`tel:${quote.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler le client
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Générer un devis PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
