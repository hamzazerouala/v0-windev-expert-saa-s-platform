"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ArrowLeft, Save, Eye, Upload, X, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewBlogArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [status, setStatus] = useState("brouillon")
  const [publishDate, setPublishDate] = useState("")
  const [featured, setFeatured] = useState(false)
  const [allowComments, setAllowComments] = useState(true)
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug) {
      const generatedSlug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setSlug(generatedSlug)
    }
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddCategory = () => {
    if (newCategory) {
      setCategory(newCategory)
      setShowNewCategory(false)
      setNewCategory("")
    }
  }

  const handleSave = (saveStatus: string) => {
    console.log("[v0] Saving article:", {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      featuredImage,
      status: saveStatus,
      publishDate,
      featured,
      allowComments,
      metaTitle,
      metaDescription,
    })
    // In production, save to database
    router.push("/admin/blog")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nouvel article</h1>
            <p className="text-muted-foreground">Créez un nouvel article de blog</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleSave("brouillon")}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer brouillon
          </Button>
          <Button onClick={() => handleSave("publie")}>
            <Eye className="mr-2 h-4 w-4" />
            Publier
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contenu" className="space-y-6">
        <TabsList>
          <TabsTrigger value="contenu">Contenu</TabsTrigger>
          <TabsTrigger value="parametres">Paramètres</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="contenu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations principales</CardTitle>
              <CardDescription>Titre, slug et contenu de l'article</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de l'article *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Les meilleures pratiques WinDev en 2025"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  placeholder="meilleures-pratiques-windev-2025"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">URL de l'article : /blog/{slug || "votre-slug"}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Extrait</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Résumé court de l'article (150-200 caractères)"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">{excerpt.length} / 200 caractères</p>
              </div>

              <div className="space-y-2">
                <Label>Contenu de l'article *</Label>
                <RichTextEditor value={content} onChange={setContent} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image à la une</CardTitle>
              <CardDescription>Image principale de l'article</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="featuredImage">URL de l'image</Label>
                <div className="flex gap-2">
                  <Input
                    id="featuredImage"
                    placeholder="https://example.com/image.jpg"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                  />
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>
              {featuredImage && (
                <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                  <img src={featuredImage || "/placeholder.svg"} alt="Aperçu" className="h-full w-full object-cover" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parametres" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Catégorie et tags</CardTitle>
              <CardDescription>Organisez votre article</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                {!showNewCategory ? (
                  <div className="flex gap-2">
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tutoriels">Tutoriels</SelectItem>
                        <SelectItem value="developpement">Développement</SelectItem>
                        <SelectItem value="actualites">Actualités</SelectItem>
                        <SelectItem value="securite">Sécurité</SelectItem>
                        <SelectItem value="astuces">Astuces</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => setShowNewCategory(true)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nouvelle catégorie"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button onClick={handleAddCategory}>Ajouter</Button>
                    <Button variant="outline" onClick={() => setShowNewCategory(false)}>
                      Annuler
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Ajouter un tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-2">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
              <CardDescription>Statut et date de publication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brouillon">Brouillon</SelectItem>
                    <SelectItem value="publie">Publié</SelectItem>
                    <SelectItem value="programme">Programmé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {status === "programme" && (
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Date de publication</Label>
                  <Input
                    id="publishDate"
                    type="datetime-local"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Article à la une</Label>
                  <p className="text-sm text-muted-foreground">Mettre en avant cet article</p>
                </div>
                <Switch checked={featured} onCheckedChange={setFeatured} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autoriser les commentaires</Label>
                  <p className="text-sm text-muted-foreground">Les lecteurs peuvent commenter</p>
                </div>
                <Switch checked={allowComments} onCheckedChange={setAllowComments} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimisation SEO</CardTitle>
              <CardDescription>Métadonnées pour les moteurs de recherche</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Titre SEO</Label>
                <Input
                  id="metaTitle"
                  placeholder="Titre optimisé pour les moteurs de recherche"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">{metaTitle.length} / 60 caractères</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Description SEO</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Description optimisée pour les moteurs de recherche"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">{metaDescription.length} / 160 caractères</p>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <p className="text-sm font-medium">Aperçu Google</p>
                <div className="space-y-1">
                  <p className="text-blue-600 text-lg">{metaTitle || title || "Titre de l'article"}</p>
                  <p className="text-green-700 text-sm">https://windevexpert.com/blog/{slug || "votre-slug"}</p>
                  <p className="text-sm text-muted-foreground">
                    {metaDescription || excerpt || "Description de l'article..."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
