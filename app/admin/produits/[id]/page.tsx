import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save, Download, Upload, Package, DollarSign, TrendingUp, Star, Plus } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { RichTextEditor } from "@/components/rich-text-editor"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in production this would come from a database
  const product = {
    id: params.id,
    name: "GestStock Pro",
    type: "Logiciel",
    category: "Gestion",
    description:
      "Logiciel de gestion de stock complet avec suivi en temps réel, alertes automatiques et rapports détaillés. Idéal pour les PME et commerces.",
    price: 499,
    pricingModel: "Unique",
    stock: "Illimité",
    status: "Actif",
    sales: 34,
    downloads: 102,
    version: "2.1.0",
    fileSize: "45 MB",
    fileName: "geststock-pro-v2.1.0.zip",
    image: "/geststock-pro.jpg",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-20",
    features: [
      "Suivi en temps réel des stocks",
      "Alertes automatiques de réapprovisionnement",
      "Gestion multi-entrepôts",
      "Rapports et statistiques avancés",
      "Export PDF/Excel",
      "Interface intuitive",
      "Support multi-utilisateurs",
      "Sauvegarde automatique",
    ],
    requirements: [
      "Windows 10 ou supérieur",
      "4 GB RAM minimum",
      "500 MB d'espace disque",
      "Connexion Internet pour les mises à jour",
    ],
    changelog: [
      { version: "2.1.0", date: "2024-12-20", changes: "Amélioration des performances, correction de bugs" },
      { version: "2.0.0", date: "2024-10-15", changes: "Nouvelle interface, ajout du mode sombre" },
      { version: "1.5.0", date: "2024-08-01", changes: "Support multi-entrepôts" },
    ],
  }

  const recentSales = [
    { id: 1, customer: "Jean Dupont", email: "jean@example.com", date: "2024-12-25", amount: 499 },
    { id: 2, customer: "Marie Martin", email: "marie@example.com", date: "2024-12-24", amount: 499 },
    { id: 3, customer: "Pierre Durand", email: "pierre@example.com", date: "2024-12-23", amount: 499 },
  ]

  const reviews = [
    {
      id: 1,
      customer: "Jean Dupont",
      rating: 5,
      comment: "Excellent logiciel, très intuitif et complet!",
      date: "2024-12-20",
    },
    {
      id: 2,
      customer: "Marie Martin",
      rating: 4,
      comment: "Très bon produit, quelques améliorations possibles sur l'export.",
      date: "2024-12-18",
    },
  ]

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
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">
              {product.type} • Version {product.version}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Ventes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product.sales}</div>
            <p className="text-xs text-muted-foreground">Revenu: {product.sales * product.price}€</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Download className="h-4 w-4 text-muted-foreground" />
              Téléchargements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product.downloads}</div>
            <p className="text-xs text-muted-foreground">Ratio: {(product.downloads / product.sales).toFixed(1)}x</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              Note moyenne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5/5</div>
            <p className="text-xs text-muted-foreground">{reviews.length} avis</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Tendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <p className="text-xs text-muted-foreground">vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="pricing">Tarification</TabsTrigger>
          <TabsTrigger value="files">Fichiers</TabsTrigger>
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
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
                  <Label htmlFor="name">Nom du produit</Label>
                  <Input id="name" defaultValue={product.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <div className="flex gap-2">
                    <Select defaultValue={product.type.toLowerCase()}>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
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
                            <Input id="new-type" placeholder="Ex: Service - Formation" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Annuler</Button>
                          <Button>Ajouter</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  value={product.description}
                  placeholder="Décrivez votre produit en détail..."
                  minHeight="250px"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <div className="flex gap-2">
                    <Select defaultValue={product.category.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gestion">Gestion</SelectItem>
                        <SelectItem value="interface">Interface</SelectItem>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
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
                            <Input id="new-category" placeholder="Ex: Intelligence Artificielle" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category-slug">Slug (URL)</Label>
                            <Input id="category-slug" placeholder="intelligence-artificielle" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Annuler</Button>
                          <Button>Ajouter</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input id="version" defaultValue={product.version} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select defaultValue={product.status.toLowerCase()}>
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
              <CardTitle>Tarification</CardTitle>
              <CardDescription>Prix et modèle de tarification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€)</Label>
                  <Input id="price" type="number" defaultValue={product.price} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricing-model">Modèle de tarification</Label>
                  <Select defaultValue="unique">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unique">Paiement unique</SelectItem>
                      <SelectItem value="abonnement">Abonnement mensuel</SelectItem>
                      <SelectItem value="annuel">Abonnement annuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Gestion du stock</Label>
                  <Select defaultValue="illimite">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="illimite">Illimité</SelectItem>
                      <SelectItem value="limite">Limité</SelectItem>
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
                value={product.features.map((f) => `<li>${f}</li>`).join("")}
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
                value={product.requirements.map((r) => `<li>${r}</li>`).join("")}
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
                    <Input id="price-dz" type="number" placeholder="50000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing-model-dz">Modèle de tarification</Label>
                    <Select defaultValue="unique">
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
                      <input type="checkbox" id="chargily" defaultChecked />
                      <Label htmlFor="chargily" className="font-normal">
                        Paiement en ligne via Chargily
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="offline-dz" defaultChecked />
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
                    <Input id="price-africa" type="number" placeholder="99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing-model-africa">Modèle de tarification</Label>
                    <Select defaultValue="unique">
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
                    <Label htmlFor="price-eu">Prix (EUR)</Label>
                    <Input id="price-eu" type="number" placeholder="89" defaultValue="499" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing-model-eu">Modèle de tarification</Label>
                    <Select defaultValue="unique">
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
                    <Input id="price-world" type="number" placeholder="99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing-model-world">Modèle de tarification</Label>
                    <Select defaultValue="unique">
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
                <Label htmlFor="stock">Gestion du stock</Label>
                <Select defaultValue="illimite">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="illimite">Illimité (produit digital)</SelectItem>
                    <SelectItem value="limite">Limité (licences)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
              <CardTitle>Fichier principal</CardTitle>
              <CardDescription>Fichier téléchargeable par les clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{product.fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.fileSize} • Version {product.version}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Remplacer
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-file">Télécharger une nouvelle version</Label>
                <Input id="new-file" type="file" />
                <p className="text-xs text-muted-foreground">Formats acceptés: .zip, .exe, .msi, .dmg (max 500 MB)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historique des versions</CardTitle>
              <CardDescription>Changelog et mises à jour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.changelog.map((entry, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="flex-shrink-0">
                      <Badge>{entry.version}</Badge>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{entry.changes}</p>
                      <p className="text-xs text-muted-foreground">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Images et médias</CardTitle>
              <CardDescription>Images du produit et captures d'écran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-image">Image principale</Label>
                <Input id="product-image" type="file" accept="image/*" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="screenshots">Captures d'écran (plusieurs fichiers)</Label>
                <Input id="screenshots" type="file" accept="image/*" multiple />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventes récentes</CardTitle>
              <CardDescription>{recentSales.length} ventes ce mois-ci</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.customer}</TableCell>
                      <TableCell>{sale.email}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell className="text-right font-medium">{sale.amount}€</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Avis clients</CardTitle>
              <CardDescription>{reviews.length} avis • Note moyenne: 4.5/5</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{review.customer}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
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
                <Input id="slug" defaultValue="geststock-pro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU / Référence</Label>
                <Input id="sku" defaultValue="GSP-2024-001" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Options de téléchargement</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="limit-downloads" defaultChecked />
                    <Label htmlFor="limit-downloads" className="font-normal">
                      Limiter le nombre de téléchargements par achat
                    </Label>
                  </div>
                  <Input type="number" placeholder="Nombre max de téléchargements" defaultValue="5" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="expiry" />
                  <Label htmlFor="expiry" className="font-normal">
                    Définir une date d'expiration pour les téléchargements
                  </Label>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>SEO et métadonnées</Label>
                <div className="space-y-2">
                  <Input placeholder="Meta title" />
                  <Textarea placeholder="Meta description" rows={2} />
                  <Input placeholder="Mots-clés (séparés par des virgules)" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
