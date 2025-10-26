"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false)
  const [isSendingPassword, setIsSendingPassword] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchUser()
  }, [params.id])

  const fetchUser = async () => {
    try {
      console.log("[v0] Fetching user by ID:", params.id)
      const response = await fetch(`/api/users/${params.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch user")
      }
      const data = await response.json()
      console.log("[v0] Fetched user:", data)
      setUser(data)
    } catch (error) {
      console.error("[v0] Error fetching user:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les données de l'utilisateur",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSendTempPassword = async () => {
    if (!confirm("Êtes-vous sûr de vouloir générer et envoyer un mot de passe temporaire à cet utilisateur ?")) {
      return
    }

    setIsSendingPassword(true)
    try {
      const response = await fetch(`/api/admin/users/${params.id}/send-temp-password`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to send temporary password")
      }

      toast({
        title: "Succès",
        description: "Le mot de passe temporaire a été envoyé par email",
      })
    } catch (error) {
      console.error("[v0] Error sending temporary password:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le mot de passe temporaire",
        variant: "destructive",
      })
    } finally {
      setIsSendingPassword(false)
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Utilisateur non trouvé</h2>
        <Link href="/admin/utilisateurs">
          <Button>Retour à la liste</Button>
        </Link>
      </div>
    )
  }

  const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim()
  const userStatus = user.is_blocked ? "Bloqué" : "Actif"
  const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString("fr-FR") : "N/A"

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
          <Button variant="outline" onClick={handleSendTempPassword} disabled={isSendingPassword}>
            {isSendingPassword ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Envoi...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Envoyer mot de passe
              </>
            )}
          </Button>

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
                  <DialogTitle>Envoyer un message à {fullName}</DialogTitle>
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
              <Button variant={userStatus === "Actif" ? "destructive" : "default"}>
                {userStatus === "Actif" ? (
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
                <DialogTitle>{userStatus === "Actif" ? "Bloquer" : "Débloquer"} l&apos;utilisateur</DialogTitle>
                <DialogDescription>
                  {userStatus === "Actif"
                    ? "L'utilisateur ne pourra plus se connecter à la plateforme."
                    : "L'utilisateur pourra à nouveau se connecter à la plateforme."}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBlockDialogOpen(false)}>
                  Annuler
                </Button>
                <Button variant={userStatus === "Actif" ? "destructive" : "default"} onClick={handleBlockUser}>
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
                <CardTitle className="text-2xl">{fullName}</CardTitle>
                <CardDescription className="text-base">{user.email}</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    {user.role === "admin" ? "Admin" : "Client"}
                  </Badge>
                  <Badge variant={userStatus === "Actif" ? "default" : "destructive"}>{userStatus}</Badge>
                  {user.is_vip && <Badge variant="default">VIP</Badge>}
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
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" defaultValue={user.first_name || ""} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" defaultValue={user.last_name || ""} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue={user.phone || ""} disabled={!isEditing} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Entreprise</Label>
                <Input id="company" defaultValue={user.company || ""} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Rôle</Label>
                <Select defaultValue={user.role} disabled={!isEditing}>
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
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue={user.bio || ""} disabled={!isEditing} rows={3} />
              </div>
              <div className="grid gap-2">
                <Label>Date d&apos;inscription</Label>
                <Input value={joinDate} disabled />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">
            <Activity className="mr-2 h-4 w-4" />
            Informations
          </TabsTrigger>
          <TabsTrigger value="purchases">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Achats
          </TabsTrigger>
          <TabsTrigger value="formations">
            <GraduationCap className="mr-2 h-4 w-4" />
            Formations
          </TabsTrigger>
          <TabsTrigger value="projects">
            <FolderKanban className="mr-2 h-4 w-4" />
            Projets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Informations supplémentaires</CardTitle>
              <CardDescription>Détails du profil utilisateur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Langue préférée</Label>
                  <p className="text-sm">{user.language?.toUpperCase() || "Non définie"}</p>
                </div>
                <div className="space-y-2">
                  <Label>Devise</Label>
                  <p className="text-sm">{user.currency || "Non définie"}</p>
                </div>
                <div className="space-y-2">
                  <Label>Statut VIP</Label>
                  <p className="text-sm">{user.is_vip ? "Oui" : "Non"}</p>
                </div>
                <div className="space-y-2">
                  <Label>Changement de mot de passe requis</Label>
                  <p className="text-sm">{user.must_change_password ? "Oui" : "Non"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Historique des achats</CardTitle>
              <CardDescription>Liste de tous les achats effectués par l&apos;utilisateur</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Aucun achat pour le moment</p>
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
              <p className="text-sm text-muted-foreground">Aucune formation pour le moment</p>
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
              <p className="text-sm text-muted-foreground">Aucun projet pour le moment</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
