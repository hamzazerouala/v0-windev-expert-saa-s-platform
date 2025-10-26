"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Save, Eye, Plus, Trash2, GripVertical, Upload } from "lucide-react"
import Link from "next/link"
import { RichTextEditor } from "@/components/rich-text-editor"

interface Resource {
  id: number
  name: string
  url: string
  type: string
}

interface Lesson {
  id: number
  title: string
  type: "video" | "quiz" | "assignment" | "resource"
  duration: string
  content: string
  videoUrl: string
  resources: Resource[]
}

interface Module {
  id: number
  title: string
  description: string
  lessons: Lesson[]
}

export default function NewFormationPage() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Introduction",
      description: "",
      lessons: [
        {
          id: 1,
          title: "Bienvenue",
          type: "video",
          duration: "5:00",
          content: "",
          videoUrl: "",
          resources: [] as Resource[],
        },
      ],
    },
  ])

  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [showLevelDialog, setShowLevelDialog] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [newLevel, setNewLevel] = useState("")
  const [pricingModel, setPricingModel] = useState("lifetime")
  const [editingLesson, setEditingLesson] = useState<{ moduleId: number; lessonId: number } | null>(null)

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: Date.now(),
        title: `Module ${modules.length + 1}`,
        description: "",
        lessons: [],
      },
    ])
  }

  const addLesson = (moduleId: number) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: Date.now(),
                  title: `Leçon ${module.lessons.length + 1}`,
                  type: "video",
                  duration: "0:00",
                  content: "",
                  videoUrl: "",
                  resources: [],
                },
              ],
            }
          : module,
      ),
    )
  }

  const updateLesson = (moduleId: number, lessonId: number, field: keyof Lesson, value: any) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    )
  }

  const getCurrentLesson = (): Lesson | null => {
    if (!editingLesson) return null
    const module = modules.find((m) => m.id === editingLesson.moduleId)
    if (!module) return null
    return module.lessons.find((l) => l.id === editingLesson.lessonId) || null
  }

  const addResource = (moduleId: number, lessonId: number) => {
    const newResource: Resource = {
      id: Date.now(),
      name: "Nouvelle ressource",
      url: "",
      type: "pdf",
    }

    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, resources: [...lesson.resources, newResource] } : lesson,
              ),
            }
          : module,
      ),
    )
  }

  const removeResource = (moduleId: number, lessonId: number, resourceId: number) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, resources: lesson.resources.filter((r) => r.id !== resourceId) }
                  : lesson,
              ),
            }
          : module,
      ),
    )
  }

  const updateResource = (
    moduleId: number,
    lessonId: number,
    resourceId: number,
    field: keyof Resource,
    value: string,
  ) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      resources: lesson.resources.map((r) => (r.id === resourceId ? { ...r, [field]: value } : r)),
                    }
                  : lesson,
              ),
            }
          : module,
      ),
    )
  }

  const currentLesson = getCurrentLesson()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/formations">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Nouvelle Formation</h1>
            <p className="text-muted-foreground mt-1">Créez une nouvelle formation complète</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Prévisualiser
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Informations Générales</TabsTrigger>
          <TabsTrigger value="content">Contenu & Modules</TabsTrigger>
          <TabsTrigger value="pricing">Tarification</TabsTrigger>
          <TabsTrigger value="protection">Protection du contenu</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        {/* General Information */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
              <CardDescription>Définissez les informations principales de la formation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la formation *</Label>
                <Input id="title" placeholder="Ex: WinDev - Débutant à Expert" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Input id="subtitle" placeholder="Une description courte et accrocheuse" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="windev">WinDev</SelectItem>
                        <SelectItem value="webdev">WebDev</SelectItem>
                        <SelectItem value="mobile">WinDev Mobile</SelectItem>
                        <SelectItem value="database">Base de données</SelectItem>
                        <SelectItem value="architecture">Architecture</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Nouvelle catégorie</DialogTitle>
                          <DialogDescription>Créez une nouvelle catégorie de formation</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-category">Nom de la catégorie</Label>
                            <Input
                              id="new-category"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="Ex: Intelligence Artificielle"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                            Annuler
                          </Button>
                          <Button
                            onClick={() => {
                              // Add category logic here
                              setShowCategoryDialog(false)
                              setNewCategory("")
                            }}
                          >
                            Créer
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Niveau *</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Sélectionner un niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                        <SelectItem value="all">Tous niveaux</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog open={showLevelDialog} onOpenChange={setShowLevelDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Nouveau niveau</DialogTitle>
                          <DialogDescription>Créez un nouveau niveau de difficulté</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-level">Nom du niveau</Label>
                            <Input
                              id="new-level"
                              value={newLevel}
                              onChange={(e) => setNewLevel(e.target.value)}
                              placeholder="Ex: Expert"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowLevelDialog(false)}>
                            Annuler
                          </Button>
                          <Button
                            onClick={() => {
                              // Add level logic here
                              setShowLevelDialog(false)
                              setNewLevel("")
                            }}
                          >
                            Créer
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description complète *</Label>
                <RichTextEditor
                  value=""
                  onChange={() => {}}
                  placeholder="Décrivez en détail ce que les étudiants vont apprendre..."
                />
              </div>

              <div className="space-y-2">
                <Label>Objectifs d'apprentissage</Label>
                <RichTextEditor
                  value=""
                  onChange={() => {}}
                  placeholder="Listez les compétences que les étudiants acquerront..."
                />
              </div>

              <div className="space-y-2">
                <Label>Prérequis</Label>
                <RichTextEditor
                  value=""
                  onChange={() => {}}
                  placeholder="Quelles connaissances sont nécessaires avant de commencer..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Image de couverture</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Télécharger une image
                  </Button>
                  <span className="text-sm text-muted-foreground">Recommandé: 1280x720px, JPG ou PNG</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-intro">Vidéo de présentation (optionnel)</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Télécharger une vidéo
                  </Button>
                  <span className="text-sm text-muted-foreground">Format: MP4, max 100MB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content & Modules */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Structure du cours</CardTitle>
                  <CardDescription>Organisez votre formation en modules et leçons</CardDescription>
                </div>
                <Button onClick={addModule} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un module
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {modules.map((module, moduleIndex) => (
                <Card key={module.id} className="border-2">
                  <CardHeader className="bg-slate-50">
                    <div className="flex items-start gap-3">
                      <Button variant="ghost" size="icon" className="cursor-move mt-1">
                        <GripVertical className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge>Module {moduleIndex + 1}</Badge>
                          <Input
                            value={module.title}
                            onChange={(e) => {
                              const newModules = [...modules]
                              newModules[moduleIndex].title = e.target.value
                              setModules(newModules)
                            }}
                            className="flex-1 font-semibold"
                            placeholder="Titre du module"
                          />
                        </div>
                        <Textarea
                          value={module.description}
                          onChange={(e) => {
                            const newModules = [...modules]
                            newModules[moduleIndex].description = e.target.value
                            setModules(newModules)
                          }}
                          placeholder="Description du module (optionnel)"
                          rows={2}
                        />
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Button variant="ghost" size="icon" className="cursor-move">
                            <GripVertical className="h-4 w-4" />
                          </Button>
                          <div className="flex-1 grid gap-3 md:grid-cols-3">
                            <Input
                              value={lesson.title}
                              onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                              placeholder="Titre de la leçon"
                              className="md:col-span-2"
                            />
                            <Select
                              value={lesson.type}
                              onValueChange={(value) => updateLesson(module.id, lesson.id, "type", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Vidéo</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                                <SelectItem value="assignment">Devoir</SelectItem>
                                <SelectItem value="resource">Ressource</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingLesson({ moduleId: module.id, lessonId: lesson.id })}
                          >
                            Éditer
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button onClick={() => addLesson(module.id)} variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter une leçon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modèle de tarification</CardTitle>
              <CardDescription>Choisissez comment les clients accèdent à cette formation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Type d'accès</Label>
                <Select value={pricingModel} onValueChange={setPricingModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lifetime">Accès à vie (paiement unique)</SelectItem>
                    <SelectItem value="subscription">Abonnement (mensuel/annuel)</SelectItem>
                    <SelectItem value="vip">Inclus dans l'abonnement VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {pricingModel === "subscription" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Prix mensuel</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Prix annuel</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tarification multi-régions</CardTitle>
              <CardDescription>
                {pricingModel === "lifetime" && "Définissez les prix d'achat unique pour chaque région"}
                {pricingModel === "subscription" && "Définissez les prix d'abonnement pour chaque région"}
                {pricingModel === "vip" && "Cette formation est incluse dans l'abonnement VIP"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {pricingModel !== "vip" && (
                <>
                  {/* Algeria */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Algérie</h3>
                        <p className="text-sm text-muted-foreground">Paiement Chargily et hors ligne</p>
                      </div>
                      <Badge>DZD</Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Prix normal</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label>Prix promotionnel (optionnel)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                  </div>

                  {/* Africa */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Afrique</h3>
                        <p className="text-sm text-muted-foreground">Paiement Stripe</p>
                      </div>
                      <Badge>USD</Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Prix normal</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label>Prix promotionnel (optionnel)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                  </div>

                  {/* Europe */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Europe</h3>
                        <p className="text-sm text-muted-foreground">Paiement Stripe</p>
                      </div>
                      <Badge>EUR</Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Prix normal</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label>Prix promotionnel (optionnel)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                  </div>

                  {/* Rest of World */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Reste du monde</h3>
                        <p className="text-sm text-muted-foreground">Paiement Stripe</p>
                      </div>
                      <Badge>USD</Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Prix normal</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label>Prix promotionnel (optionnel)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {pricingModel === "vip" && (
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">VIP</Badge>
                    <h3 className="font-semibold text-lg">Abonnement VIP</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Cette formation est incluse dans l'abonnement VIP qui donne accès à toutes les formations de la
                    plateforme.
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="p-3 bg-white rounded border">
                      <p className="text-sm text-muted-foreground">Abonnement annuel VIP</p>
                      <p className="text-2xl font-bold text-purple-600">Configuré dans les paramètres</p>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <p className="text-sm text-muted-foreground">Accès à vie VIP</p>
                      <p className="text-2xl font-bold text-pink-600">Configuré dans les paramètres</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Protection du contenu</CardTitle>
              <CardDescription>Configurez les mesures de sécurité pour protéger vos contenus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="text-base">Protection DRM des vidéos</Label>
                    <p className="text-sm text-muted-foreground">
                      Chiffrement et protection contre le téléchargement illégal
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="text-base">Watermark sur les vidéos</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajouter le nom de l'utilisateur en filigrane sur les vidéos
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="text-base">Désactiver le clic droit</Label>
                    <p className="text-sm text-muted-foreground">Empêcher le téléchargement via le menu contextuel</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="text-base">Protection des images</Label>
                    <p className="text-sm text-muted-foreground">Désactiver le glisser-déposer et la copie d'images</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="text-base">URLs signées pour les ressources</Label>
                    <p className="text-sm text-muted-foreground">
                      Générer des liens temporaires et sécurisés pour les téléchargements
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Nombre maximum de téléchargements par ressource</Label>
                  <Input type="number" placeholder="3" defaultValue="3" />
                  <p className="text-sm text-muted-foreground">
                    Nombre de fois qu'un utilisateur peut télécharger une ressource
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Durée de validité des liens (heures)</Label>
                  <Input type="number" placeholder="24" defaultValue="24" />
                  <p className="text-sm text-muted-foreground">
                    Durée pendant laquelle un lien de téléchargement reste valide
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Texte du watermark</Label>
                  <Input placeholder="{user_email} - {date}" defaultValue="{user_email} - {date}" />
                  <p className="text-sm text-muted-foreground">
                    Variables disponibles: {"{user_email}"}, {"{user_name}"}, {"{date}"}, {"{time}"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Certificat de complétion</Label>
                    <p className="text-sm text-muted-foreground">Délivrer un certificat à la fin</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Quiz obligatoires</Label>
                    <p className="text-sm text-muted-foreground">Les quiz doivent être réussis pour progresser</p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Accès à vie</Label>
                    <p className="text-sm text-muted-foreground">Les étudiants ont un accès illimité</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Téléchargement des ressources</Label>
                    <p className="text-sm text-muted-foreground">Permettre le téléchargement des fichiers</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Forum de discussion</Label>
                    <p className="text-sm text-muted-foreground">Activer les discussions entre étudiants</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Durée d'accès (jours)</Label>
                <Input type="number" placeholder="365" />
                <p className="text-sm text-muted-foreground">Laisser vide pour un accès illimité</p>
              </div>

              <div className="space-y-2">
                <Label>Note minimale pour le certificat (%)</Label>
                <Input type="number" placeholder="80" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres avancés</CardTitle>
              <CardDescription>Configuration de la formation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Certificat de complétion</Label>
                    <p className="text-sm text-muted-foreground">Délivrer un certificat à la fin</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Quiz obligatoires</Label>
                    <p className="text-sm text-muted-foreground">Les quiz doivent être réussis pour progresser</p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Accès à vie</Label>
                    <p className="text-sm text-muted-foreground">Les étudiants ont un accès illimité</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Téléchargement des ressources</Label>
                    <p className="text-sm text-muted-foreground">Permettre le téléchargement des fichiers</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Forum de discussion</Label>
                    <p className="text-sm text-muted-foreground">Activer les discussions entre étudiants</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Durée d'accès (jours)</Label>
                <Input type="number" placeholder="365" />
                <p className="text-sm text-muted-foreground">Laisser vide pour un accès illimité</p>
              </div>

              <div className="space-y-2">
                <Label>Note minimale pour le certificat (%)</Label>
                <Input type="number" placeholder="80" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingLesson} onOpenChange={(open) => !open && setEditingLesson(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Éditer la leçon: {currentLesson?.title}</DialogTitle>
            <DialogDescription>Ajoutez le contenu, la vidéo et les ressources de cette leçon</DialogDescription>
          </DialogHeader>

          {currentLesson && editingLesson && (
            <div className="space-y-6 py-4">
              {/* Video Section */}
              {currentLesson.type === "video" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>URL de la vidéo *</Label>
                    <Input
                      value={currentLesson.videoUrl}
                      onChange={(e) =>
                        updateLesson(editingLesson.moduleId, editingLesson.lessonId, "videoUrl", e.target.value)
                      }
                      placeholder="https://... ou téléchargez une vidéo"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Télécharger une vidéo
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Format: MP4, max 500MB. La vidéo sera automatiquement protégée par DRM.
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label>Durée de la vidéo</Label>
                    <Input
                      value={currentLesson.duration}
                      onChange={(e) =>
                        updateLesson(editingLesson.moduleId, editingLesson.lessonId, "duration", e.target.value)
                      }
                      placeholder="Ex: 15:30"
                    />
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className="space-y-2">
                <Label>Contenu de la leçon</Label>
                <RichTextEditor
                  value={currentLesson.content}
                  onChange={(value) => updateLesson(editingLesson.moduleId, editingLesson.lessonId, "content", value)}
                  placeholder="Décrivez le contenu de cette leçon, ajoutez des explications, des notes importantes..."
                  minHeight="300px"
                />
              </div>

              {/* Resources Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Ressources téléchargeables</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajoutez des fichiers PDF, documents, code source, etc.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addResource(editingLesson.moduleId, editingLesson.lessonId)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une ressource
                  </Button>
                </div>

                {currentLesson.resources.length > 0 && (
                  <div className="space-y-2">
                    {currentLesson.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1 grid gap-3 md:grid-cols-3">
                          <Input
                            value={resource.name}
                            onChange={(e) =>
                              updateResource(
                                editingLesson.moduleId,
                                editingLesson.lessonId,
                                resource.id,
                                "name",
                                e.target.value,
                              )
                            }
                            placeholder="Nom de la ressource"
                          />
                          <Select
                            value={resource.type}
                            onValueChange={(value) =>
                              updateResource(editingLesson.moduleId, editingLesson.lessonId, resource.id, "type", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="doc">Document</SelectItem>
                              <SelectItem value="code">Code source</SelectItem>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="other">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex gap-2">
                            <Input
                              value={resource.url}
                              onChange={(e) =>
                                updateResource(
                                  editingLesson.moduleId,
                                  editingLesson.lessonId,
                                  resource.id,
                                  "url",
                                  e.target.value,
                                )
                              }
                              placeholder="URL ou..."
                              className="flex-1"
                            />
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          onClick={() => removeResource(editingLesson.moduleId, editingLesson.lessonId, resource.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quiz Section */}
              {currentLesson.type === "quiz" && (
                <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Questions du quiz</Label>
                      <p className="text-sm text-muted-foreground">Créez les questions et réponses pour ce quiz</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter une question
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Le constructeur de quiz sera disponible dans la prochaine version
                  </p>
                </div>
              )}

              {/* Assignment Section */}
              {currentLesson.type === "assignment" && (
                <div className="space-y-4 p-4 border rounded-lg bg-purple-50">
                  <Label className="text-base">Instructions du devoir</Label>
                  <RichTextEditor
                    value=""
                    onChange={() => {}}
                    placeholder="Décrivez ce que les étudiants doivent faire pour ce devoir..."
                    minHeight="200px"
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Date limite</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Note maximale</Label>
                      <Input type="number" placeholder="100" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLesson(null)}>
              Annuler
            </Button>
            <Button onClick={() => setEditingLesson(null)}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
