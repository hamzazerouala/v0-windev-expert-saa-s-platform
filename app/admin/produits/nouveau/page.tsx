"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Plus } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createProduct, getCategories, createCategory } from "@/app/actions/products"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RichTextEditor } from "@/components/rich-text-editor"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [showTypeDialog, setShowTypeDialog] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategorySlug, setNewCategorySlug] = useState("")
  const [newTypeName, setNewTypeName] = useState("")

  // Form state - Informations de base
  const [name, setName] = useState("")
  const [type, setType] = useState("logiciel")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [version, setVersion] = useState("1.0.0")
  const [status, setStatus] = useState("actif")

  // Tarification
  const [priceDZD, setPriceDZD] = useState("")
  const [pricingModelDZ, setPricingModelDZ] = useState("unique")
  const [enableChargily, setEnableChargily] = useState(true)
  const [enableOfflineDZ, setEnableOfflineDZ] = useState(true)

  const [priceAfrica, setPriceAfrica] = useState("")
  const [pricingModelAfrica, setPricingModelAfrica] = useState("unique")

  const [priceEU, setPriceEU] = useState("")
  const [pricingModelEU, setPricingModelEU] = useState("unique")

  const [priceWorld, setPriceWorld] = useState("")
  const [pricingModelWorld, setPricingModelWorld] = useState("unique")

  const [stockManagement, setStockManagement] = useState("illimite")
  const [stockQuantity, setStockQuantity] = useState("0")

  // Fonctionnalités et prérequis
  const [features, setFeatures] = useState("")
  const [requirements, setRequirements] = useState("")

  // Fichiers et médias
  const [imageUrl, setImageUrl] = useState("")

  // SEO
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [keywords, setKeywords] = useState("")
  const [slug, setSlug] = useState("")
  const [sku, setSku] = useState("")

  // Options
  const [limitDownloads, setLimitDownloads] = useState(true)
  const [maxDownloads, setMaxDownloads] = useState("5")
  const [hasExpiry, setHasExpiry] = useState(false)

  const [errors, setErrors] = useState<{
    name?: string
    priceEU?: string
  }>({})

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    if (name) {
      setSlug(
        name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      )
    }
  }, [name])

  const loadCategories = async () => {
    setIsLoadingCategories(true)
    const result = await getCategories()
    if (result.success) {
      setCategories(result.categories || [])
    }
    setIsLoadingCategories(false)
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie est requis",
        variant: "destructive",
      })
      return
    }

    const categorySlug = newCategorySlug || newCategoryName.toLowerCase().replace(/\s+/g, "-")
    const result = await createCategory({ name: newCategoryName, slug: categorySlug })

    if (result.success) {
      toast({
        title: "Succès",
        description: "Catégorie créée avec succès",
      })
      setShowCategoryDialog(false)
      setNewCategoryName("")
      setNewCategorySlug("")
      await loadCategories()
      if (result.category) {
        setCategoryId(result.category.id)
      }
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Erreur lors de la création de la catégorie",
        variant: "destructive",
      })
    }
  }

  const handleSave = async () => {
    if (isSaving) return

    console.log("[v0] Saving product...")
    console.log("[v0] Form values:", { name, priceEU, categoryId, description })

    setErrors({})

    const newErrors: { name?: string; priceEU?: string } = {}

    if (!name.trim()) {
      console.log("[v0] Validation failed: name is empty")
      newErrors.name = "Le nom du produit est requis"
    }

    if (!priceEU || Number.parseFloat(priceEU) < 0) {
      console.log("[v0] Validation failed: invalid price", priceEU)
      newErrors.priceEU = "Le prix Europe est requis et doit être positif"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires marqués en rouge",
        variant: "destructive",
      })
      return
    }

    console.log("[v0] Validation passed, preparing data...")

    setIsSaving(true)

    try {
      const productData = {
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/\s+/g, "-"),
        description: description.trim(),
        image_url: imageUrl.trim() || undefined,
        price_cents: Math.round(Number.parseFloat(priceEU) * 100),
        stock_quantity: stockManagement === "illimite" ? 0 : Number.parseInt(stockQuantity) || 0,
        is_active: status === "actif",
        category_id: categoryId || undefined,
      }

      console.log("[v0] Product data prepared:", productData)
      console.log("[v0] Calling createProduct...")

      const result = await createProduct(productData)

      console.log("[v0] createProduct result:", result)

      if (result.success) {
        toast({
          title: "Succès",
          description: "Produit créé avec succès",
        })
        router.push("/admin/produits")
      } else {
        console.log("[v0] Error from createProduct:", result.error)
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la création du produit",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Exception in handleSave:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/produits">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nouveau produit</h1>
            <p className="text-muted-foreground">Créer un nouveau produit digital ou service</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="pricing">Tarification</TabsTrigger>
          <TabsTrigger value="files">Fichiers & Médias</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Détails et description du produit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-1">
                    Nom du produit <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: GestStock Pro"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors({ ...errors, name: undefined })
                    }}
                    className={errors.name ? "border-red-500" : ""}
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <div className="flex gap-2">
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logiciel">Logiciel</SelectItem>
                        <SelectItem value="composant">Composant</SelectItem>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="plugin">Plugin</SelectItem>
                        <SelectItem value="service-maintenance">Service - Maintenance</SelectItem>
                        <SelectItem value="service-assistance">Service - Assistance</SelectItem>
                        <SelectItem value="service-consulting">Service - Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog open={showTypeDialog} onOpenChange={setShowTypeDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" type="button">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter un nouveau type</DialogTitle>
                          <DialogDescription>Créer un nouveau type de produit</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-type">Nom du type</Label>
                            <Input
                              id="new-type"
                              placeholder="Ex: Service - Formation"
                              value={newTypeName}
                              onChange={(e) => setNewTypeName(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowTypeDialog(false)}>
                            Annuler
                          </Button>
                          <Button onClick={() => setShowTypeDialog(false)}>Ajouter</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <RichTextEditor
                  value={description}
                  onChange={setDescription}
                  placeholder="Décrivez votre produit en détail..."
                  minHeight="250px"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <div className="flex gap-2">
                    <Select value={categoryId} onValueChange={setCategoryId} disabled={isLoadingCategories}>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingCategories ? "Chargement..." : "Sélectionner"} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" type="button">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
                          <DialogDescription>Créer une nouvelle catégorie de produit</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-category">Nom de la catégorie</Label>
                            <Input
                              id="new-category"
                              placeholder="Ex: Intelligence Artificielle"
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category-slug">Slug (URL)</Label>
                            <Input
                              id="category-slug"
                              placeholder="intelligence-artificielle"
                              value={newCategorySlug}
                              onChange={(e) => setNewCategorySlug(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                            Annuler
                          </Button>
                          <Button onClick={handleAddCategory}>Ajouter</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    placeholder="1.0.0"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="inactif">Inactif</SelectItem>
                      <SelectItem value="brouillon">Brouillon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalités</CardTitle>
              <CardDescription>Liste des fonctionnalités principales avec mise en forme</CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={features}
                onChange={setFeatures}
                placeholder="Listez les fonctionnalités avec mise en forme..."
                minHeight="300px"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prérequis système</CardTitle>
              <CardDescription>Configuration minimale requise avec mise en forme</CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={requirements}
                onChange={setRequirements}
                placeholder="Listez les prérequis système..."
                minHeight="200px"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tarification par région</CardTitle>
              <CardDescription>
                Configurez les prix selon les régions géographiques. Les clients verront automatiquement le prix de leur
                région.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Algeria Pricing */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      🇩🇿 Algérie
                      <Badge variant="secondary">DZD</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">Paiement en ligne et hors ligne</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price-dz">Prix (DZD)</Label>
                    <Input
                      id="price-dz"
                      type="number"
                      placeholder="50000"
                      value={priceDZD}
                      onChange={(e) => setPriceDZD(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing-model-dz">Modèle de tarification</Label>
                    <Select value={pricingModelDZ} onValueChange={setPricingModelDZ}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unique">Paiement unique</SelectItem>
                        <SelectItem value="mensuel">Abonnement mensuel</SelectItem>
                        <SelectItem value="annuel">Abonnement annuel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Méthodes de paiement</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="chargily"
                        checked={enableChargily}
                        onChange={(e) => setEnableChargily(e.target.checked)}
                      />
                      <Label htmlFor="chargily" className="font-normal">
                        Paiement en ligne via Chargily
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="offline-dz"
                        checked={enableOfflineDZ}
                        onChange={(e) => setEnableOfflineDZ(e.target.checked)}
                      />
                      <Label htmlFor="offline-dz" className="font-normal">
                        Paiement hors ligne (CCP / Virement bancaire)
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-md text-sm">
                  <p className="font-medium mb-1">Paiement hors ligne:</p>
                  <p className="text-muted-foreground">
                    Le client pourra télécharger une preuve de paiement dans sa zone client. La commande sera en attente
                    de validation.
                  </p>
                </div>
              </div>

              {/* Africa Pricing */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      🌍 Afrique
                      <Badge variant="secondary">USD</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">Paiement en ligne via Stripe</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price-africa">Prix (USD)</Label>
                    <Input
                      id="price-africa"
                      type="number"
                      placeholder="99"
                      value={priceAfrica}
                      onChange={(e) => setPriceAfrica(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing-model-africa">Modèle de tarification</Label>
                    <Select value={pricingModelAfrica} onValueChange={setPricingModelAfrica}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unique">Paiement unique</SelectItem>
                        <SelectItem value="mensuel">Abonnement mensuel</SelectItem>
                        <SelectItem value="annuel">Abonnement annuel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Europe Pricing */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      🇪🇺 Europe
                      <Badge variant="secondary">EUR</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">Paiement en ligne via Stripe</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price-eu" className="flex items-center gap-1">
                      Prix (EUR) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price-eu"
                      type="number"
                      placeholder="89"
                      value={priceEU}
                      onChange={(e) => {
                        setPriceEU(e.target.value)
                        if (errors.priceEU) setErrors({ ...errors, priceEU: undefined })
                      }}
                      className={errors.priceEU ? "border-red-500" : ""}
                      required
                    />
                    {errors.priceEU && <p className="text-sm text-red-500">{errors.priceEU}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing-model-eu">Modèle de tarification</Label>
                    <Select value={pricingModelEU} onValueChange={setPricingModelEU}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unique">Paiement unique</SelectItem>
                        <SelectItem value="mensuel">Abonnement mensuel</SelectItem>
                        <SelectItem value="annuel">Abonnement annuel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Rest of World Pricing */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      🌎 Reste du monde
                      <Badge variant="secondary">USD</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">Paiement en ligne via Stripe</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price-world">Prix (USD)</Label>
                    <Input
                      id="price-world"
                      type="number"
                      placeholder="99"
                      value={priceWorld}
                      onChange={(e) => setPriceWorld(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing-model-world">Modèle de tarification</Label>
                    <Select value={pricingModelWorld} onValueChange={setPricingModelWorld}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unique">Paiement unique</SelectItem>
                        <SelectItem value="mensuel">Abonnement mensuel</SelectItem>
                        <SelectItem value="annuel">Abonnement annuel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="stock-management">Gestion du stock</Label>
                <Select value={stockManagement} onValueChange={setStockManagement}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="illimite">Illimité (produit digital)</SelectItem>
                    <SelectItem value="limite">Limité (licences)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {stockManagement === "limite" && (
                <div className="space-y-2">
                  <Label htmlFor="stock-quantity">Quantité en stock</Label>
                  <Input
                    id="stock-quantity"
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                  />
                </div>
              )}

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-medium mb-2">💡 Géolocalisation automatique</h4>
                <p className="text-sm text-muted-foreground">
                  Les clients verront automatiquement le prix correspondant à leur région géographique. Un client en
                  Algérie ne verra que les prix en DZD, un client en France ne verra que les prix en EUR, etc.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Images et médias</CardTitle>
              <CardDescription>Images du produit et captures d'écran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">URL de l'image principale</Label>
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-image">Ou télécharger une image</Label>
                <Input id="product-image" type="file" accept="image/*" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="screenshots">Captures d'écran (plusieurs fichiers)</Label>
                <Input id="screenshots" type="file" accept="image/*" multiple />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fichier principal</CardTitle>
              <CardDescription>Fichier téléchargeable par les clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-file">Télécharger le fichier produit</Label>
                <Input id="product-file" type="file" />
                <p className="text-xs text-muted-foreground">Formats acceptés: .zip, .exe, .msi, .dmg (max 500 MB)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres avancés</CardTitle>
              <CardDescription>Configuration et options du produit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL du produit (slug)</Label>
                <Input id="slug" placeholder="geststock-pro" value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU / Référence</Label>
                <Input id="sku" placeholder="GSP-2024-001" value={sku} onChange={(e) => setSku(e.target.value)} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Options de téléchargement</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="limit-downloads"
                      checked={limitDownloads}
                      onChange={(e) => setLimitDownloads(e.target.checked)}
                    />
                    <Label htmlFor="limit-downloads" className="font-normal">
                      Limiter le nombre de téléchargements par achat
                    </Label>
                  </div>
                  {limitDownloads && (
                    <Input
                      type="number"
                      placeholder="Nombre max de téléchargements"
                      value={maxDownloads}
                      onChange={(e) => setMaxDownloads(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="expiry"
                    checked={hasExpiry}
                    onChange={(e) => setHasExpiry(e.target.checked)}
                  />
                  <Label htmlFor="expiry" className="font-normal">
                    Définir une date d'expiration pour les téléchargements
                  </Label>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>SEO et métadonnées</Label>
                <div className="space-y-2">
                  <Input placeholder="Meta title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                  <Textarea
                    placeholder="Meta description"
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                  <Input
                    placeholder="Mots-clés (séparés par des virgules)"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
