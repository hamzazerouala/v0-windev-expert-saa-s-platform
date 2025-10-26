"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Eye, EyeOff, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getAllSettings, saveSettings } from "@/app/actions/settings"

export default function ParametresPage() {
  const { toast } = useToast()
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [settings, setSettings] = useState<Record<string, any>>({})

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setIsLoading(true)
    const response = await getAllSettings()
    if (response.success) {
      setSettings(response.data)
    }
    setIsLoading(false)
  }

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async (section: string) => {
    setIsSaving(true)
    try {
      const response = await saveSettings(settings)

      if (response.success) {
        toast({
          title: "Paramètres enregistrés",
          description: `Les paramètres de ${section} ont été enregistrés avec succès.`,
        })
      } else {
        toast({
          title: "Erreur",
          description: response.error || "Impossible d'enregistrer les paramètres",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
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
                <Input
                  id="site-name"
                  value={settings.site_name || "WindevExpert"}
                  onChange={(e) => updateSetting("site_name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-tagline">Slogan</Label>
                <Input
                  id="site-tagline"
                  value={settings.site_tagline || "Excellence en Développement"}
                  onChange={(e) => updateSetting("site_tagline", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Description</Label>
                <Textarea
                  id="site-description"
                  value={
                    settings.site_description ||
                    "Leader français du développement d'applications sur mesure, de la formation technique avancée et du consulting IT."
                  }
                  onChange={(e) => updateSetting("site_description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select
                    value={settings.timezone || "europe-paris"}
                    onValueChange={(value) => updateSetting("timezone", value)}
                  >
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
                  <Select value={settings.language || "fr"} onValueChange={(value) => updateSetting("language", value)}>
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
                <Switch
                  checked={settings.maintenance_mode === true}
                  onCheckedChange={(checked) => updateSetting("maintenance_mode", checked)}
                />
              </div>

              <Button onClick={() => handleSave("général")} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
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
                  <Input
                    id="company-name"
                    value={settings.company_name || "WindevExpert SAS"}
                    onChange={(e) => updateSetting("company_name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siret">SIRET</Label>
                  <Input
                    id="siret"
                    value={settings.siret || "123 456 789 00012"}
                    onChange={(e) => updateSetting("siret", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tva">Numéro TVA</Label>
                  <Input
                    id="tva"
                    value={settings.tva || "FR12345678901"}
                    onChange={(e) => updateSetting("tva", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rcs">RCS</Label>
                  <Input
                    id="rcs"
                    value={settings.rcs || "RCS Paris"}
                    onChange={(e) => updateSetting("rcs", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={settings.address || "123 Avenue des Champs-Élysées"}
                  onChange={(e) => updateSetting("address", e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Code postal</Label>
                  <Input
                    id="postal-code"
                    value={settings.postal_code || "75008"}
                    onChange={(e) => updateSetting("postal_code", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={settings.city || "Paris"}
                    onChange={(e) => updateSetting("city", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    value={settings.country || "France"}
                    onChange={(e) => updateSetting("country", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={settings.phone || "+33 1 23 45 67 89"}
                    onChange={(e) => updateSetting("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email || "contact@windevexpert.com"}
                    onChange={(e) => updateSetting("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email">Email support</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={settings.support_email || "support@windevexpert.com"}
                  onChange={(e) => updateSetting("support_email", e.target.value)}
                />
              </div>

              <Button onClick={() => handleSave("entreprise")} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
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
              {/* OpenAI */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">OpenAI (Intelligence Artificielle)</h3>
                <div className="space-y-2">
                  <Label htmlFor="openai-api-key">Clé API OpenAI</Label>
                  <div className="flex gap-2">
                    <Input
                      id="openai-api-key"
                      type={showApiKeys.openai ? "text" : "password"}
                      placeholder="sk-..."
                      value={settings.openai_api_key || ""}
                      onChange={(e) => updateSetting("openai_api_key", e.target.value)}
                    />
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
                      value={settings.anthropic_api_key || ""}
                      onChange={(e) => updateSetting("anthropic_api_key", e.target.value)}
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("anthropic")}>
                      {showApiKeys.anthropic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Google Gemini */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Google Gemini (IA - Génération de contenu)</h3>
                <p className="text-sm text-muted-foreground">
                  Utilisé pour la génération automatique d'articles de blog avec IA
                </p>
                <div className="space-y-2">
                  <Label htmlFor="gemini-api-key">Clé API Gemini</Label>
                  <div className="flex gap-2">
                    <Input
                      id="gemini-api-key"
                      type={showApiKeys.gemini ? "text" : "password"}
                      placeholder="AIza..."
                      value={settings.gemini_api_key || ""}
                      onChange={(e) => updateSetting("gemini_api_key", e.target.value)}
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("gemini")}>
                      {showApiKeys.gemini ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                      value={settings.google_maps_api_key || ""}
                      onChange={(e) => updateSetting("google_maps_api_key", e.target.value)}
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("googleMaps")}>
                      {showApiKeys.googleMaps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("APIs")} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
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
                  <Switch
                    checked={settings.stripe_enabled === true}
                    onCheckedChange={(checked) => updateSetting("stripe_enabled", checked)}
                    defaultChecked
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-publishable-key">Clé publique Stripe</Label>
                  <Input
                    id="stripe-publishable-key"
                    value={settings.stripe_publishable_key || ""}
                    onChange={(e) => updateSetting("stripe_publishable_key", e.target.value)}
                    placeholder="pk_..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret-key">Clé secrète Stripe</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stripe-secret-key"
                      type={showApiKeys.stripe ? "text" : "password"}
                      placeholder="sk_..."
                      value={settings.stripe_secret_key || ""}
                      onChange={(e) => updateSetting("stripe_secret_key", e.target.value)}
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
                  <Switch
                    checked={settings.chargily_enabled === true}
                    onCheckedChange={(checked) => updateSetting("chargily_enabled", checked)}
                    defaultChecked
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargily-api-key">Clé API Chargily</Label>
                  <div className="flex gap-2">
                    <Input
                      id="chargily-api-key"
                      type={showApiKeys.chargily ? "text" : "password"}
                      placeholder="test_sk_..."
                      value={settings.chargily_api_key || ""}
                      onChange={(e) => updateSetting("chargily_api_key", e.target.value)}
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
                      value={settings.chargily_secret || ""}
                      onChange={(e) => updateSetting("chargily_secret", e.target.value)}
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
                    <Switch
                      checked={settings.offline_payment_enabled === true}
                      onCheckedChange={(checked) => updateSetting("offline_payment_enabled", checked)}
                      defaultChecked
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ccp-account">Compte CCP</Label>
                    <Input
                      id="ccp-account"
                      value={settings.ccp_account || ""}
                      onChange={(e) => updateSetting("ccp_account", e.target.value)}
                      placeholder="Ex: 0012345678 Clé: 12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-account">Compte bancaire</Label>
                    <Input
                      id="bank-account"
                      value={settings.bank_account || ""}
                      onChange={(e) => updateSetting("bank_account", e.target.value)}
                      placeholder="Ex: 00123456789012345678"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-holder">Bénéficiaire</Label>
                    <Input
                      id="account-holder"
                      value={settings.account_holder || ""}
                      onChange={(e) => updateSetting("account_holder", e.target.value)}
                      placeholder="WindevExpert SAS"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Nom de la banque</Label>
                    <Input
                      id="bank-name"
                      value={settings.bank_name || ""}
                      onChange={(e) => updateSetting("bank_name", e.target.value)}
                      placeholder="Ex: BNA, CPA, BADR..."
                    />
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
                  <Input
                    id="iban-eur"
                    value={settings.iban_eur || ""}
                    onChange={(e) => updateSetting("iban_eur", e.target.value)}
                    placeholder="FR76 1234 5678 9012 3456 7890 123"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="swift-eur">Code SWIFT/BIC (EUR)</Label>
                  <Input
                    id="swift-eur"
                    value={settings.swift_eur || ""}
                    onChange={(e) => updateSetting("swift_eur", e.target.value)}
                    placeholder="BNPAFRPPXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iban-usd">IBAN (USD)</Label>
                  <Input
                    id="iban-usd"
                    value={settings.iban_usd || ""}
                    onChange={(e) => updateSetting("iban_usd", e.target.value)}
                    placeholder="US12 3456 7890 1234 5678 90"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="swift-usd">Code SWIFT/BIC (USD)</Label>
                  <Input
                    id="swift-usd"
                    value={settings.swift_usd || ""}
                    onChange={(e) => updateSetting("swift_usd", e.target.value)}
                    placeholder="CHASUS33XXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-holder-intl">Titulaire du compte</Label>
                  <Input
                    id="bank-holder-intl"
                    value={settings.bank_holder_intl || "WindevExpert SAS"}
                    onChange={(e) => updateSetting("bank_holder_intl", e.target.value)}
                  />
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
                    <Switch
                      checked={settings.dzd_supported === true}
                      onCheckedChange={(checked) => updateSetting("dzd_supported", checked)}
                      defaultChecked
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>EUR - Euro</Label>
                      <p className="text-sm text-muted-foreground">Europe - Stripe + Virement IBAN</p>
                    </div>
                    <Switch
                      checked={settings.eur_supported === true}
                      onCheckedChange={(checked) => updateSetting("eur_supported", checked)}
                      defaultChecked
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>USD - Dollar Américain</Label>
                      <p className="text-sm text-muted-foreground">
                        Afrique et reste du monde - Stripe + Virement IBAN
                      </p>
                    </div>
                    <Switch
                      checked={settings.usd_supported === true}
                      onCheckedChange={(checked) => updateSetting("usd_supported", checked)}
                      defaultChecked
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("paiement")} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
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
                <Input
                  id="smtp-host"
                  value={settings.smtp_host || "mail.smtp2go.com"}
                  onChange={(e) => updateSetting("smtp_host", e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Port SMTP</Label>
                  <Input
                    id="smtp-port"
                    type="number"
                    value={settings.smtp_port || 2525}
                    onChange={(e) => updateSetting("smtp_port", Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-encryption">Chiffrement</Label>
                  <Select
                    value={settings.smtp_encryption || "tls"}
                    onValueChange={(value) => updateSetting("smtp_encryption", value)}
                  >
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
                  <Input
                    id="smtp-username"
                    value={settings.smtp_username || ""}
                    onChange={(e) => updateSetting("smtp_username", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Mot de passe SMTP</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={settings.smtp_password || ""}
                    onChange={(e) => updateSetting("smtp_password", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-email">Email expéditeur</Label>
                <Input
                  id="from-email"
                  type="email"
                  value={settings.from_email || "noreply@windevexpert.com"}
                  onChange={(e) => updateSetting("from_email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-name">Nom expéditeur</Label>
                <Input
                  id="from-name"
                  value={settings.from_name || "WindevExpert"}
                  onChange={(e) => updateSetting("from_name", e.target.value)}
                />
              </div>

              {/* SMTP2GO */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">SMTP2GO (Email & SMS)</h3>
                <p className="text-sm text-muted-foreground">Service d'envoi d'emails et SMS pour les notifications</p>
                <div className="space-y-2">
                  <Label htmlFor="smtp2go-api-key">Clé API SMTP2GO</Label>
                  <div className="flex gap-2">
                    <Input
                      id="smtp2go-api-key"
                      type={showApiKeys.smtp2go ? "text" : "password"}
                      placeholder="api-..."
                      value={settings.smtp2go_api_key || ""}
                      onChange={(e) => updateSetting("smtp2go_api_key", e.target.value)}
                    />
                    <Button variant="outline" size="icon" onClick={() => toggleApiKeyVisibility("smtp2go")}>
                      {showApiKeys.smtp2go ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp2go-sender-email">Email expéditeur</Label>
                  <Input
                    id="smtp2go-sender-email"
                    type="email"
                    placeholder="noreply@windevexpert.com"
                    value={settings.smtp2go_sender_email || ""}
                    onChange={(e) => updateSetting("smtp2go_sender_email", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Email utilisé comme expéditeur pour tous les emails envoyés
                  </p>
                </div>
              </div>

              <Button onClick={() => handleSave("email")} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
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
                <Input
                  id="meta-title"
                  value={settings.meta_title || "WindevExpert - Excellence en Développement"}
                  onChange={(e) => updateSetting("meta_title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Description par défaut</Label>
                <Textarea
                  id="meta-description"
                  value={
                    settings.meta_description ||
                    "Leader français du développement d'applications sur mesure, de la formation technique avancée et du consulting IT."
                  }
                  onChange={(e) => updateSetting("meta_description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Mots-clés</Label>
                <Input
                  id="meta-keywords"
                  value={settings.meta_keywords || "développement, windev, formation, consulting, IT"}
                  onChange={(e) => updateSetting("meta_keywords", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-analytics">ID Google Analytics</Label>
                <Input
                  id="google-analytics"
                  value={settings.google_analytics || ""}
                  onChange={(e) => updateSetting("google_analytics", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-tag-manager">ID Google Tag Manager</Label>
                <Input
                  id="google-tag-manager"
                  value={settings.google_tag_manager || ""}
                  onChange={(e) => updateSetting("google_tag_manager", e.target.value)}
                  placeholder="GTM-XXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                <Input
                  id="facebook-pixel"
                  value={settings.facebook_pixel || ""}
                  onChange={(e) => updateSetting("facebook_pixel", e.target.value)}
                  placeholder="123456789012345"
                />
              </div>

              <Button onClick={() => handleSave("SEO")} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
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
                <Input
                  id="admin-phone"
                  type="tel"
                  value={settings.admin_phone || "+213558440392"}
                  onChange={(e) => updateSetting("admin_phone", e.target.value)}
                  placeholder="+213 XXX XXX XXX"
                />
                <p className="text-sm text-muted-foreground">
                  Numéro utilisé pour l'authentification SMS de l'administrateur (format international)
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Authentification à deux facteurs (2FA)</Label>
                  <p className="text-sm text-muted-foreground">Exiger 2FA pour les administrateurs</p>
                </div>
                <Switch
                  checked={settings.two_factor_auth === true}
                  onCheckedChange={(checked) => updateSetting("two_factor_auth", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Délai d'expiration de session (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.session_timeout || 60}
                  onChange={(e) => updateSetting("session_timeout", Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">Tentatives de connexion max</Label>
                <Input
                  id="max-login-attempts"
                  type="number"
                  value={settings.max_login_attempts || 5}
                  onChange={(e) => updateSetting("max_login_attempts", Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lockout-duration">Durée de blocage (minutes)</Label>
                <Input
                  id="lockout-duration"
                  type="number"
                  value={settings.lockout_duration || 30}
                  onChange={(e) => updateSetting("lockout_duration", Number(e.target.value))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Forcer HTTPS</Label>
                  <p className="text-sm text-muted-foreground">Rediriger HTTP vers HTTPS</p>
                </div>
                <Switch
                  checked={settings.force_https === true}
                  onCheckedChange={(checked) => updateSetting("force_https", checked)}
                  defaultChecked
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Logs d'activité</Label>
                  <p className="text-sm text-muted-foreground">Enregistrer les actions des utilisateurs</p>
                </div>
                <Switch
                  checked={settings.activity_logs === true}
                  onCheckedChange={(checked) => updateSetting("activity_logs", checked)}
                  defaultChecked
                />
              </div>

              <Button onClick={() => handleSave("sécurité")} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
