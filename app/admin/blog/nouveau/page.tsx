"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ArrowLeft, Save, Eye, Upload, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createBlogPost, importBlogPostsFromJSON } from "@/app/actions/blog"
import { toast } from "sonner"
import { getBlogCategories, createBlogCategory } from "@/app/actions/categories"
import { generateArticleWithAI } from "@/app/actions/ai-generate"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function NewBlogArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [status, setStatus] = useState("draft")
  const [publishDate, setPublishDate] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryDescription, setNewCategoryDescription] = useState("")
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [aiTopic, setAiTopic] = useState("")
  const [aiTone, setAiTone] = useState<"professional" | "casual" | "technical" | "educational">("professional")
  const [aiLength, setAiLength] = useState<"short" | "medium" | "long">("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const isSavingRef = useRef(false)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const result = await getBlogCategories()
    if (result.success) {
      setCategories(result.data || [])
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Le nom de la catégorie est requis")
      return
    }

    setIsCreatingCategory(true)
    try {
      const slug = newCategoryName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const result = await createBlogCategory({
        name: newCategoryName,
        slug,
        description: newCategoryDescription || undefined,
      })

      if (result.success) {
        toast.success("Catégorie créée avec succès !")
        await loadCategories()
        setCategoryId(result.data.id)
        setIsDialogOpen(false)
        setNewCategoryName("")
        setNewCategoryDescription("")
      } else {
        toast.error(result.error || "Erreur lors de la création de la catégorie")
      }
    } catch (error) {
      console.error("[v0] Error creating category:", error)
      toast.error("Erreur lors de la création de la catégorie")
    } finally {
      setIsCreatingCategory(false)
    }
  }

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

  const handleSave = async (saveStatus: string) => {
    if (isSavingRef.current) {
      console.log("[v0] Save already in progress, ignoring duplicate call")
      return
    }

    if (!title || !slug || !content) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    isSavingRef.current = true
    setIsSaving(true)

    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        category_id: categoryId || null,
        featured_image_url: featuredImage || null,
        status: saveStatus,
        published_at:
          saveStatus === "scheduled" ? publishDate : saveStatus === "published" ? new Date().toISOString() : null,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        // author_id sera défini automatiquement côté serveur
      }

      console.log("[v0] Saving article to database...")
      console.log("[v0] Post data:", postData)

      const result = await createBlogPost(postData)

      console.log("[v0] Save result:", result)

      if (result.success) {
        toast.success(
          saveStatus === "published"
            ? "Article publié avec succès !"
            : saveStatus === "scheduled"
              ? "Article programmé avec succès !"
              : "Brouillon enregistré avec succès !",
        )
        router.push("/admin/blog")
      } else {
        toast.error(result.error || "Erreur lors de l'enregistrement")
      }
    } catch (error) {
      console.error("[v0] Exception in handleSave:", error)
      toast.error("Erreur lors de l'enregistrement de l'article")
    } finally {
      setIsSaving(false)
      isSavingRef.current = false
    }
  }

  const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      const text = await file.text()
      const json = JSON.parse(text)

      // Support both single post and array of posts
      const posts = Array.isArray(json) ? json : [json]

      console.log("[v0] Importing", posts.length, "posts from JSON")
      const result = await importBlogPostsFromJSON(posts)

      if (result.success) {
        toast.success(
          `${result.imported} article(s) importé(s) avec succès ! ${result.failed > 0 ? `(${result.failed} échec(s))` : ""}`,
        )
        await loadCategories()
        router.refresh()
      } else {
        toast.error(result.error || "Erreur lors de l'import")
      }
    } catch (error) {
      console.error("[v0] Error importing JSON:", error)
      toast.error("Fichier JSON invalide")
    } finally {
      setIsImporting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleGenerateWithAI = async () => {
    if (!aiTopic.trim()) {
      toast.error("Veuillez entrer un sujet pour l'article")
      return
    }

    setIsGenerating(true)
    try {
      const selectedCategory = categories.find((cat) => cat.id === categoryId)
      const result = await generateArticleWithAI({
        topic: aiTopic,
        category: selectedCategory?.name,
        tone: aiTone,
        length: aiLength,
      })

      if (result.success && result.data) {
        // Pré-remplir le formulaire avec le contenu généré
        setTitle(result.data.title)
        setSlug(result.data.slug)
        setExcerpt(result.data.excerpt)
        setContent(result.data.content)
        setMetaTitle(result.data.meta_title)
        setMetaDescription(result.data.meta_description)
        setFeaturedImage(result.data.featured_image_url)

        toast.success("Article généré avec succès ! Vous pouvez maintenant le modifier et le publier.")
        setIsAIDialogOpen(false)
        setAiTopic("")
      } else {
        toast.error(result.error || "Erreur lors de la génération de l'article")
      }
    } catch (error) {
      console.error("[v0] Error generating article:", error)
      toast.error("Erreur lors de la génération de l'article")
    } finally {
      setIsGenerating(false)
    }
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
          <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Générer avec IA
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Générer un article avec Gemini AI</DialogTitle>
                <DialogDescription>
                  Décrivez le sujet de votre article et l'IA générera un contenu complet avec image
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="aiTopic">Sujet de l'article *</Label>
                  <Textarea
                    id="aiTopic"
                    placeholder="Ex: Les meilleures pratiques pour développer des applications mobiles avec WinDev Mobile"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aiTone">Ton de l'article</Label>
                  <Select value={aiTone} onValueChange={(value: any) => setAiTone(value)}>
                    <SelectTrigger id="aiTone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professionnel</SelectItem>
                      <SelectItem value="casual">Décontracté</SelectItem>
                      <SelectItem value="technical">Technique</SelectItem>
                      <SelectItem value="educational">Éducatif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aiLength">Longueur de l'article</Label>
                  <Select value={aiLength} onValueChange={(value: any) => setAiLength(value)}>
                    <SelectTrigger id="aiLength">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Court (500-800 mots)</SelectItem>
                      <SelectItem value="medium">Moyen (1000-1500 mots)</SelectItem>
                      <SelectItem value="long">Long (2000-3000 mots)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {categoryId && (
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm text-muted-foreground">
                      Catégorie sélectionnée:{" "}
                      <span className="font-medium text-foreground">
                        {categories.find((c) => c.id === categoryId)?.name}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAIDialogOpen(false)} disabled={isGenerating}>
                  Annuler
                </Button>
                <Button onClick={handleGenerateWithAI} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Générer l'article
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isImporting}>
            <Upload className="mr-2 h-4 w-4" />
            {isImporting ? "Import..." : "Importer JSON"}
          </Button>
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Enregistrement..." : "Enregistrer brouillon"}
          </Button>
          <Button onClick={() => handleSave("published")} disabled={isSaving}>
            <Eye className="mr-2 h-4 w-4" />
            {isSaving ? "Publication..." : "Publier"}
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
              <CardTitle>Catégorie</CardTitle>
              <CardDescription>Organisez votre article</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <div className="flex gap-2">
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger id="category" className="flex-1">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nouvelle catégorie</DialogTitle>
                        <DialogDescription>Créez une nouvelle catégorie pour vos articles de blog</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="newCategoryName">Nom de la catégorie *</Label>
                          <Input
                            id="newCategoryName"
                            placeholder="Ex: Tutoriels WinDev"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newCategoryDescription">Description</Label>
                          <Textarea
                            id="newCategoryDescription"
                            placeholder="Description de la catégorie (optionnel)"
                            value={newCategoryDescription}
                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isCreatingCategory}>
                          Annuler
                        </Button>
                        <Button onClick={handleCreateCategory} disabled={isCreatingCategory}>
                          {isCreatingCategory ? "Création..." : "Créer la catégorie"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
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
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="scheduled">Programmé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {status === "scheduled" && (
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
