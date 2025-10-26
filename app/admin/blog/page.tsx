import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Calendar, User } from "lucide-react"
import Link from "next/link"

export default function AdminBlogPage() {
  // Mock data - in production this would come from a database
  const articles = [
    {
      id: 1,
      title: "Les meilleures pratiques WinDev en 2025",
      slug: "meilleures-pratiques-windev-2025",
      author: "Admin",
      category: "Tutoriels",
      status: "Publié",
      publishedAt: "2025-01-15",
      views: 1234,
      comments: 23,
      featured: true,
    },
    {
      id: 2,
      title: "Comment optimiser vos applications mobiles",
      slug: "optimiser-applications-mobiles",
      author: "Admin",
      category: "Développement",
      status: "Publié",
      publishedAt: "2025-01-10",
      views: 856,
      comments: 15,
      featured: false,
    },
    {
      id: 3,
      title: "Guide complet de WebDev pour débutants",
      slug: "guide-webdev-debutants",
      author: "Admin",
      category: "Tutoriels",
      status: "Brouillon",
      publishedAt: null,
      views: 0,
      comments: 0,
      featured: false,
    },
    {
      id: 4,
      title: "Nouveautés WinDev 29",
      slug: "nouveautes-windev-29",
      author: "Admin",
      category: "Actualités",
      status: "Publié",
      publishedAt: "2025-01-05",
      views: 2341,
      comments: 45,
      featured: true,
    },
    {
      id: 5,
      title: "Sécurité des applications : les essentiels",
      slug: "securite-applications-essentiels",
      author: "Admin",
      category: "Sécurité",
      status: "Programmé",
      publishedAt: "2025-01-30",
      views: 0,
      comments: 0,
      featured: false,
    },
  ]

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "Publié").length,
    drafts: articles.filter((a) => a.status === "Brouillon").length,
    scheduled: articles.filter((a) => a.status === "Programmé").length,
    totalViews: articles.reduce((acc, a) => acc + a.views, 0),
    totalComments: articles.reduce((acc, a) => acc + a.comments, 0),
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Articles de blog</h1>
          <p className="text-muted-foreground">Gérez vos articles et publications</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/nouveau">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.published} publiés, {stats.drafts} brouillons
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vues totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Tous les articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commentaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments}</div>
            <p className="text-xs text-muted-foreground">En attente de modération</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Programmés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduled}</div>
            <p className="text-xs text-muted-foreground">À publier prochainement</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des articles</CardTitle>
              <CardDescription>{articles.length} articles au total</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="tous">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="publie">Publiés</SelectItem>
                  <SelectItem value="brouillon">Brouillons</SelectItem>
                  <SelectItem value="programme">Programmés</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="toutes">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toutes">Toutes catégories</SelectItem>
                  <SelectItem value="tutoriels">Tutoriels</SelectItem>
                  <SelectItem value="developpement">Développement</SelectItem>
                  <SelectItem value="actualites">Actualités</SelectItem>
                  <SelectItem value="securite">Sécurité</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-9" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-w-full overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Titre</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Vues</TableHead>
                  <TableHead className="hidden lg:table-cell">Commentaires</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col gap-1">
                        <span className="line-clamp-1">{article.title}</span>
                        {article.featured && (
                          <Badge variant="secondary" className="w-fit text-xs">
                            À la une
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{article.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{article.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("fr-FR") : "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{article.views.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{article.comments}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          article.status === "Publié"
                            ? "default"
                            : article.status === "Programmé"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${article.slug}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              Voir l'article
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/blog/${article.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
