"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ParametresPage() {
  const { toast } = useToast()
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = (section: string) => {
    toast({
      title: "Paramètres enregistrés",
      description: `Les paramètres de ${section} ont été enregistrés avec succès.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez les paramètres de votre plateforme</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="payment">Paiement</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        {/* Général */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configuration de base de la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nom du site</Label>
                <Input id="site-name" defaultValue="WindevExpert" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-tagline">Slogan</Label>
                <Input id="site-tagline" defaultValue="Excellence en Développement" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Leader français du développement d'applications sur mesure, de la formation technique avancée et du consulting IT."
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="europe-paris">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                      <SelectItem value="africa-algiers">Africa/Algiers</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Langue par défaut</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode maintenance</Label>
                  <p className="text-sm text-muted-foreground">Activer le mode maintenance du site</p>
                </div>
                <Switch />
              </div>

              <Button onClick={() => handleSave("général")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Entreprise */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>Détails légaux et coordonnées de WindevExpert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Raison sociale</Label>
                  <Input id="company-name" defaultValue="WindevExpert SAS" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siret">SIRET</Label>
                  <Input id="siret" defaultValue="123 456 789 00012" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tva">Numéro TVA</Label>
                  <Input id="tva" defaultValue="FR12345678901" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rcs">RCS</Label>
                  <Input id="rcs" defaultValue="RCS Paris" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" defaultValue="123 Avenue des Champs-Élysées" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Code postal</Label>
                  <Input id="postal-code" defaultValue="75008" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" defaultValue="Paris" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input id="country" defaultValue="France" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue="+33 1 23 45 67 89" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contact@windevexpert.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email">Email support</Label>
                <Input id="support-email" type="email" defaultValue="support@windevexpert.com" />
              </div>

              <Button onClick={() => handleSave("entreprise")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* APIs */}
        <TabsContent value="apis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clés API & Intégrations</CardTitle>
              <CardDescription>Configurez vos clés API pour les services externes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Firebase */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Firebase (Authentification SMS Admin)</h3>
                <p className="text-sm text-muted-foreground">
                  Requis uniquement pour l'authentification SMS de l'administrateur
                </p>
                <div className="space-y-2">
                  <Label htmlFor="firebase-api-key">Clé API Firebase</Label>
                  <div className="flex gap-2">
                    <Input
                      id="firebase-api-key"
                      type={showApiKeys.firebase ? "text" : "password"}
                      placeholder="AIza..."
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("firebase")}>
                      {showApiKeys.firebase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-auth-domain">Domaine d'authentification</Label>
                  <Input id="firebase-auth-domain" placeholder="votre-projet.firebaseapp.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-project-id">ID du projet</Label>
                  <Input id="firebase-project-id" placeholder="votre-projet-id" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-storage-bucket">Storage Bucket</Label>
                  <Input id="firebase-storage-bucket" placeholder="votre-projet.appspot.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-messaging-sender-id">Messaging Sender ID</Label>
                  <Input id="firebase-messaging-sender-id" placeholder="123456789012" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-app-id">App ID</Label>
                  <Input id="firebase-app-id" placeholder="1:123456789012:web:abc123def456" />
                </div>
              </div>

              {/* SMTP2GO */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">SMTP2GO (Email)</h3>
                <div className="space-y-2">
                  <Label htmlFor="smtp2go-api-key">Clé API SMTP2GO</Label>
                  <div className="flex gap-2">
                    <Input
                      id="smtp2go-api-key"
                      type={showApiKeys.smtp2go ? "text" : "password"}
                      placeholder="api-..."
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("smtp2go")}>
                      {showApiKeys.smtp2go ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* OpenAI */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">OpenAI (Intelligence Artificielle)</h3>
                <div className="space-y-2">
                  <Label htmlFor="openai-api-key">Clé API OpenAI</Label>
                  <div className="flex gap-2">
                    <Input id="openai-api-key" type={showApiKeys.openai ? "text" : "password"} placeholder="sk-..." />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("openai")}>
                      {showApiKeys.openai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Anthropic */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Anthropic Claude (IA)</h3>
                <div className="space-y-2">
                  <Label htmlFor="anthropic-api-key">Clé API Anthropic</Label>
                  <div className="flex gap-2">
                    <Input
                      id="anthropic-api-key"
                      type={showApiKeys.anthropic ? "text" : "password"}
                      placeholder="sk-ant-..."
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("anthropic")}>
                      {showApiKeys.anthropic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Google Maps (Géolocalisation)</h3>
                <div className="space-y-2">
                  <Label htmlFor="google-maps-api-key">Clé API Google Maps</Label>
                  <div className="flex gap-2">
                    <Input
                      id="google-maps-api-key"
                      type={showApiKeys.googleMaps ? "text" : "password"}
                      placeholder="AIza..."
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("googleMaps")}>
                      {showApiKeys.googleMaps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("APIs")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paiement */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration des paiements</CardTitle>
              <CardDescription>Gérez les méthodes de paiement et les devises</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stripe */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Stripe (International)</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activer Stripe</Label>
                    <p className="text-sm text-muted-foreground">Pour les paiements internationaux (EUR, USD)</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-publishable-key">Clé publique Stripe</Label>
                  <Input id="stripe-publishable-key" placeholder="pk_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret-key">Clé secrète Stripe</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stripe-secret-key"
                      type={showApiKeys.stripe ? "text" : "password"}
                      placeholder="sk_..."
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("stripe")}>
                      {showApiKeys.stripe ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chargily */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Chargily (Algérie - DZD)</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activer Chargily</Label>
                    <p className="text-sm text-muted-foreground">Pour les paiements en ligne en Algérie (DZD)</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargily-api-key">Clé API Chargily</Label>
                  <div className="flex gap-2">
                    <Input
                      id="chargily-api-key"
                      type={showApiKeys.chargily ? "text" : "password"}
                      placeholder="test_sk_..."
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("chargily")}>
                      {showApiKeys.chargily ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargily-secret">Secret Webhook Chargily</Label>
                  <div className="flex gap-2">
                    <Input
                      id="chargily-secret"
                      type={showApiKeys.chargilySecret ? "text" : "password"}
                      placeholder="whsec_..."
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("chargilySecret")}>
                      {showApiKeys.chargilySecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Paiement hors ligne (DZD)</Label>
                      <p className="text-sm text-muted-foreground">Virement CCP/Banque avec upload de preuve</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ccp-account">Compte CCP</Label>
                    <Input id="ccp-account" placeholder="Ex: 0012345678 Clé: 12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-account">Compte bancaire</Label>
                    <Input id="bank-account" placeholder="Ex: 00123456789012345678" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-holder">Bénéficiaire</Label>
                    <Input id="account-holder" placeholder="WindevExpert SAS" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Nom de la banque</Label>
                    <Input id="bank-name" placeholder="Ex: BNA, CPA, BADR..." />
                  </div>
                </div>
              </div>

              {/* IBAN pour virements EUR/USD */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Virements bancaires instantanés (EUR/USD)</h3>
                <p className="text-sm text-muted-foreground">
                  Pour les paiements par virement bancaire en Europe et international
                </p>

                <div className="space-y-2">
                  <Label htmlFor="iban-eur">IBAN (EUR)</Label>
                  <Input id="iban-eur" placeholder="FR76 1234 5678 9012 3456 7890 123" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="swift-eur">Code SWIFT/BIC (EUR)</Label>
                  <Input id="swift-eur" placeholder="BNPAFRPPXXX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iban-usd">IBAN (USD)</Label>
                  <Input id="iban-usd" placeholder="US12 3456 7890 1234 5678 90" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="swift-usd">Code SWIFT/BIC (USD)</Label>
                  <Input id="swift-usd" placeholder="CHASUS33XXX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-holder-intl">Titulaire du compte</Label>
                  <Input id="bank-holder-intl" defaultValue="WindevExpert SAS" />
                </div>
              </div>

              {/* Devises */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Devises supportées</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>DZD - Dinar Algérien</Label>
                      <p className="text-sm text-muted-foreground">Algérie - Chargily + Hors ligne</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>EUR - Euro</Label>
                      <p className="text-sm text-muted-foreground">Europe - Stripe + Virement IBAN</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>USD - Dollar Américain</Label>
                      <p className="text-sm text-muted-foreground">
                        Afrique et reste du monde - Stripe + Virement IBAN
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("paiement")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Email</CardTitle>
              <CardDescription>Paramètres SMTP et templates d'emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Serveur SMTP</Label>
                <Input id="smtp-host" defaultValue="mail.smtp2go.com" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Port SMTP</Label>
                  <Input id="smtp-port" type="number" defaultValue="2525" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-encryption">Chiffrement</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="smtp-encryption">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="none">Aucun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Nom d'utilisateur SMTP</Label>
                  <Input id="smtp-username" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Mot de passe SMTP</Label>
                  <Input id="smtp-password" type="password" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-email">Email expéditeur</Label>
                <Input id="from-email" type="email" defaultValue="noreply@windevexpert.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-name">Nom expéditeur</Label>
                <Input id="from-name" defaultValue="WindevExpert" />
              </div>

              <Button onClick={() => handleSave("email")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Référencement & Analytics</CardTitle>
              <CardDescription>Optimisation SEO et suivi des performances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Titre par défaut</Label>
                <Input id="meta-title" defaultValue="WindevExpert - Excellence en Développement" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Description par défaut</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Leader français du développement d'applications sur mesure, de la formation technique avancée et du consulting IT."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Mots-clés</Label>
                <Input id="meta-keywords" defaultValue="développement, windev, formation, consulting, IT" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-analytics">ID Google Analytics</Label>
                <Input id="google-analytics" placeholder="G-XXXXXXXXXX" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-tag-manager">ID Google Tag Manager</Label>
                <Input id="google-tag-manager" placeholder="GTM-XXXXXXX" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                <Input id="facebook-pixel" placeholder="123456789012345" />
              </div>

              <Button onClick={() => handleSave("SEO")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sécurité */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>Paramètres de sécurité et authentification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-phone">Numéro de téléphone administrateur</Label>
                <Input id="admin-phone" type="tel" defaultValue="+213558440392" placeholder="+213 XXX XXX XXX" />
                <p className="text-sm text-muted-foreground">
                  Numéro utilisé pour l'authentification SMS de l'administrateur (format international)
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Authentification à deux facteurs (2FA)</Label>
                  <p className="text-sm text-muted-foreground">Exiger 2FA pour les administrateurs</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Délai d'expiration de session (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">Tentatives de connexion max</Label>
                <Input id="max-login-attempts" type="number" defaultValue="5" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lockout-duration">Durée de blocage (minutes)</Label>
                <Input id="lockout-duration" type="number" defaultValue="30" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Forcer HTTPS</Label>
                  <p className="text-sm text-muted-foreground">Rediriger HTTP vers HTTPS</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Logs d'activité</Label>
                  <p className="text-sm text-muted-foreground">Enregistrer les actions des utilisateurs</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button onClick={() => handleSave("sécurité")}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
