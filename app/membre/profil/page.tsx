import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

export default function MemberProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mon profil</h1>
        <p className="text-muted-foreground">Gérez vos informations personnelles et préférences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Photo de profil</CardTitle>
            <CardDescription>Votre photo visible sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Changer la photo
            </Button>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Statistiques du compte</CardTitle>
            <CardDescription>Votre activité sur WindevExpert</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Achats effectués</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Formations actives</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Certificat obtenu</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>Mettez à jour vos informations de profil</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" defaultValue="Jean" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" defaultValue="Dupont" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="jean.dupont@exemple.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" type="tel" defaultValue="+33 6 12 34 56 78" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Parlez-nous de vous..."
                rows={4}
                defaultValue="Développeur passionné par WinDev et les technologies PC SOFT."
              />
            </div>
            <Button type="submit">Enregistrer les modifications</Button>
          </form>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Sécurité</CardTitle>
          <CardDescription>Gérez votre mot de passe et la sécurité de votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button type="submit">Changer le mot de passe</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
