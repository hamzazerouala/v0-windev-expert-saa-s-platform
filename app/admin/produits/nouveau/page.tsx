import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Plus } from "lucide-react"
import Link from "next/link"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function NewProductPage() {
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
          <Button variant="outline">Enregistrer comme brouillon</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Publier
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
            <CardDescription>Informations principales du produit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input id="name" placeholder="Ex: GestStock Pro" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type de produit *</Label>
                <div className="flex gap-2">
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
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
                          <Input id="new-type" placeholder="Ex: Service - Formation" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" type="button">
                          Annuler
                        </Button>
                        <Button type="button">Ajouter</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description complète *</Label>
              <RichTextEditor placeholder="Décrivez votre produit en détail avec mise en forme..." minHeight="300px" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <div className="flex gap-2">
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gestion">Gestion</SelectItem>
                      <SelectItem value="interface">Interface</SelectItem>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="securite">Sécurité</SelectItem>
                      <SelectItem value="base-donnees">Base de données</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
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
                          <Input id="new-category" placeholder="Ex: Intelligence Artificielle" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category-slug">Slug (URL)</Label>
                          <Input id="category-slug" placeholder="intelligence-artificielle" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" type="button">
                          Annuler
                        </Button>
                        <Button type="button">Ajouter</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input id="version" placeholder="1.0.0" defaultValue="1.0.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU / Référence</Label>
                <Input id="sku" placeholder="PRD-2024-001" />
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <Label htmlFor="price-dz">Prix (DZD) *</Label>
                  <Input id="price-dz" type="number" placeholder="50000" required />
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
                  <Input id="price-eu" type="number" placeholder="89" />
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

        <Card>
          <CardHeader>
            <CardTitle>Fonctionnalités</CardTitle>
            <CardDescription>Listez les fonctionnalités principales avec mise en forme</CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              placeholder="Utilisez des listes à puces pour énumérer les fonctionnalités..."
              minHeight="250px"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prérequis système</CardTitle>
            <CardDescription>Configuration minimale requise (si applicable)</CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor placeholder="Listez les prérequis techniques..." minHeight="200px" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fichiers et médias</CardTitle>
            <CardDescription>Téléchargez les fichiers du produit et images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="main-file">Fichier principal du produit</Label>
              <Input id="main-file" type="file" />
              <p className="text-xs text-muted-foreground">Formats acceptés: .zip, .exe, .msi, .dmg (max 500 MB)</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="product-image">Image principale *</Label>
              <Input id="product-image" type="file" accept="image/*" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="screenshots">Captures d'écran (optionnel)</Label>
              <Input id="screenshots" type="file" accept="image/*" multiple />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Options avancées</CardTitle>
            <CardDescription>Configuration supplémentaire</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slug">URL du produit (slug)</Label>
              <Input id="slug" placeholder="mon-produit" />
              <p className="text-xs text-muted-foreground">Laissez vide pour générer automatiquement depuis le nom</p>
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
                <RichTextEditor placeholder="Meta description..." minHeight="100px" />
                <Input placeholder="Mots-clés (séparés par des virgules)" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
