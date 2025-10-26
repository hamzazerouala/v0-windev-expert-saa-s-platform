"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Save,
  Ban,
  CheckCircle,
  Mail,
  ShoppingBag,
  GraduationCap,
  FolderKanban,
  Activity,
  Phone,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false)

  // Mock user data - in production this would come from a database
  const user = {
    id: params.id,
    name: "Jean Dupont",
    email: "jean.dupont@exemple.com",
    phone: "+33 6 12 34 56 78",
    role: "Client",
    status: "Actif",
    joinDate: "15 Mars 2024",
    lastLogin: "2 Janvier 2025",
    address: "123 Rue de la Paix, 75001 Paris",
    company: "Tech Solutions SARL",
    socialMedia: {
      whatsapp: "+33612345678",
      facebook: "jean.dupont",
      twitter: "@jeandupont",
      linkedin: "jean-dupont",
      instagram: "@jeandupont",
    },
    purchases: [
      { id: 1, product: "Formation WinDev", date: "20 Déc 2024", amount: "299€", status: "Complété" },
      { id: 2, product: "Composant UI Pro", date: "15 Nov 2024", amount: "149€", status: "Complété" },
      { id: 3, product: "Service Consulting", date: "10 Oct 2024", amount: "500€", status: "En cours" },
    ],
    formations: [
      { id: 1, name: "WinDev - Débutant à Expert", progress: 75, status: "En cours" },
      { id: 2, name: "WebDev - Développement Web Moderne", progress: 100, status: "Terminé" },
    ],
    projects: [
      { id: 1, name: "Application de Gestion", status: "En cours", startDate: "1 Déc 2024" },
      { id: 2, name: "Site E-commerce", status: "Terminé", startDate: "15 Oct 2024" },
    ],
    activity: [
      { date: "2 Jan 2025", action: "Connexion à la plateforme" },
      { date: "1 Jan 2025", action: "Progression formation WinDev: 75%" },
      { date: "30 Déc 2024", action: "Téléchargement certificat WebDev" },
      { date: "20 Déc 2024", action: "Achat: Formation WinDev" },
    ],
  }

  const handleSave = () => {
    // Handle save user changes
    setIsEditing(false)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle send message
    setIsMessageDialogOpen(false)
  }

  const handleBlockUser = () => {
    // Handle block/unblock user
    setIsBlockDialogOpen(false)
  }

  const handlePhoneCall = () => {
    window.location.href = `tel:${user.phone}`
  }

  const handleWhatsApp = () => {
    const phoneNumber = user.socialMedia.whatsapp.replace(/\s/g, "")
    window.open(`https://wa.me/${phoneNumber}`, "_blank")
  }

  const handleFacebook = () => {
    window.open(`https://facebook.com/${user.socialMedia.facebook}`, "_blank")
  }

  const handleTwitter = () => {
    window.open(`https://twitter.com/${user.socialMedia.twitter.replace("@", "")}`, "_blank")
  }

  const handleLinkedIn = () => {
    window.open(`https://linkedin.com/in/${user.socialMedia.linkedin}`, "_blank")
  }

  const handleInstagram = () => {
    window.open(`https://instagram.com/${user.socialMedia.instagram.replace("@", "")}`, "_blank")
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/utilisateurs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Profil utilisateur</h1>
            <p className="text-muted-foreground">Gérez les informations et l&apos;activité de l&apos;utilisateur</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Envoyer un message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSendMessage}>
                <DialogHeader>
                  <DialogTitle>Envoyer un message à {user.name}</DialogTitle>
                  <DialogDescription>
                    Le message sera envoyé par email et visible dans l&apos;espace membre
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Objet</Label>
                    <Input id="subject" placeholder="Objet du message" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Votre message..." rows={6} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">Envoyer</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
            <DialogTrigger asChild>
              <Button variant={user.status === "Actif" ? "destructive" : "default"}>
                {user.status === "Actif" ? (
                  <>
                    <Ban className="mr-2 h-4 w-4" />
                    Bloquer
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Débloquer
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{user.status === "Actif" ? "Bloquer" : "Débloquer"} l&apos;utilisateur</DialogTitle>
                <DialogDescription>
                  {user.status === "Actif"
                    ? "L'utilisateur ne pourra plus se connecter à la plateforme."
                    : "L'utilisateur pourra à nouveau se connecter à la plateforme."}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBlockDialogOpen(false)}>
                  Annuler
                </Button>
                <Button variant={user.status === "Actif" ? "destructive" : "default"} onClick={handleBlockUser}>
                  Confirmer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="text-base">{user.email}</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                  <Badge variant={user.status === "Actif" ? "default" : "destructive"}>{user.status}</Badge>
                </div>
              </div>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Modifier</Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" defaultValue={user.name} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue={user.phone} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Entreprise</Label>
                <Input id="company" defaultValue={user.company} disabled={!isEditing} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Rôle</Label>
                <Select defaultValue={user.role.toLowerCase()} disabled={!isEditing}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" defaultValue={user.address} disabled={!isEditing} rows={3} />
              </div>
              <div className="grid gap-2">
                <Label>Date d&apos;inscription</Label>
                <Input value={user.joinDate} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Dernière connexion</Label>
                <Input value={user.lastLogin} disabled />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Réseaux sociaux & Contact</CardTitle>
          <CardDescription>Coordonnées et profils sociaux de l&apos;utilisateur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Quick Contact Actions */}
            <div>
              <Label className="mb-3 block">Actions rapides</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handlePhoneCall}>
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler
                </Button>
                <Button variant="outline" size="sm" onClick={handleWhatsApp} className="text-green-600 bg-transparent">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" onClick={handleFacebook} className="text-blue-600 bg-transparent">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" onClick={handleTwitter} className="text-sky-500 bg-transparent">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" onClick={handleLinkedIn} className="text-blue-700 bg-transparent">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" onClick={handleInstagram} className="text-pink-600 bg-transparent">
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </Button>
              </div>
            </div>

            {/* Social Media Fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <div className="flex gap-2">
                  <Input
                    id="whatsapp"
                    placeholder="+33 6 12 34 56 78"
                    defaultValue={user.socialMedia.whatsapp}
                    disabled={!isEditing}
                  />
                  {!isEditing && user.socialMedia.whatsapp && (
                    <Button variant="outline" size="icon" onClick={handleWhatsApp}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="facebook">Facebook</Label>
                <div className="flex gap-2">
                  <Input
                    id="facebook"
                    placeholder="nom.utilisateur"
                    defaultValue={user.socialMedia.facebook}
                    disabled={!isEditing}
                  />
                  {!isEditing && user.socialMedia.facebook && (
                    <Button variant="outline" size="icon" onClick={handleFacebook}>
                      <Facebook className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="twitter">Twitter</Label>
                <div className="flex gap-2">
                  <Input
                    id="twitter"
                    placeholder="@utilisateur"
                    defaultValue={user.socialMedia.twitter}
                    disabled={!isEditing}
                  />
                  {!isEditing && user.socialMedia.twitter && (
                    <Button variant="outline" size="icon" onClick={handleTwitter}>
                      <Twitter className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="flex gap-2">
                  <Input
                    id="linkedin"
                    placeholder="nom-utilisateur"
                    defaultValue={user.socialMedia.linkedin}
                    disabled={!isEditing}
                  />
                  {!isEditing && user.socialMedia.linkedin && (
                    <Button variant="outline" size="icon" onClick={handleLinkedIn}>
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <div className="flex gap-2">
                  <Input
                    id="instagram"
                    placeholder="@utilisateur"
                    defaultValue={user.socialMedia.instagram}
                    disabled={!isEditing}
                  />
                  {!isEditing && user.socialMedia.instagram && (
                    <Button variant="outline" size="icon" onClick={handleInstagram}>
                      <Instagram className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="purchases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="purchases">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Achats ({user.purchases.length})
          </TabsTrigger>
          <TabsTrigger value="formations">
            <GraduationCap className="mr-2 h-4 w-4" />
            Formations ({user.formations.length})
          </TabsTrigger>
          <TabsTrigger value="projects">
            <FolderKanban className="mr-2 h-4 w-4" />
            Projets ({user.projects.length})
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="mr-2 h-4 w-4" />
            Activité
          </TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Historique des achats</CardTitle>
              <CardDescription>Liste de tous les achats effectués par l&apos;utilisateur</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.purchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-medium">{purchase.product}</TableCell>
                      <TableCell>{purchase.date}</TableCell>
                      <TableCell>{purchase.amount}</TableCell>
                      <TableCell>
                        <Badge variant={purchase.status === "Complété" ? "default" : "secondary"}>
                          {purchase.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formations">
          <Card>
            <CardHeader>
              <CardTitle>Formations en cours</CardTitle>
              <CardDescription>Formations auxquelles l&apos;utilisateur est inscrit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.formations.map((formation) => (
                  <div key={formation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{formation.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${formation.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{formation.progress}%</span>
                      </div>
                    </div>
                    <Badge variant={formation.status === "Terminé" ? "default" : "secondary"}>{formation.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projets</CardTitle>
              <CardDescription>Projets de développement de l&apos;utilisateur</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du projet</TableHead>
                    <TableHead>Date de début</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.startDate}</TableCell>
                      <TableCell>
                        <Badge variant={project.status === "Terminé" ? "default" : "secondary"}>{project.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Historique des actions de l&apos;utilisateur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.activity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
