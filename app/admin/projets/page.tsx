"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Eye, Edit, AlertCircle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/app/actions/projects"

const statusConfig = {
  planning: { label: "Planifié", variant: "secondary" as const, icon: Clock },
  in_progress: { label: "En cours", variant: "default" as const, icon: AlertCircle },
  on_hold: { label: "En attente", variant: "outline" as const, icon: Clock },
  completed: { label: "Terminé", variant: "default" as const, icon: CheckCircle },
  cancelled: { label: "Annulé", variant: "destructive" as const, icon: AlertCircle },
}

export default async function ProjetsPage() {
  const result = await getProjects()
  const projects = result.success ? result.data : []

  return (
    <div className="max-w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projets</h1>
          <p className="text-muted-foreground">Gérez les projets de développement et de formation</p>
        </div>
        <Link href="/admin/projets/nouveau">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau projet
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Projets actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p: any) => p.status === "in_progress").length}</div>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total projets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">Tous statuts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Terminés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p: any) => p.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Complétés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p: any) => p.status === "on_hold").length}</div>
            <p className="text-xs text-muted-foreground">Suspendus</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher un projet..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projet</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Aucun projet trouvé. Créez votre premier projet.
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project: any) => {
                    const StatusIcon = statusConfig[project.status as keyof typeof statusConfig]?.icon || Clock
                    return (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {project.description?.substring(0, 50)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {project.client?.first_name} {project.client?.last_name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{project.project_type || "Développement"}</Badge>
                        </TableCell>
                        <TableCell>
                          {project.budget_cents
                            ? `${(project.budget_cents / 100).toFixed(2)} ${project.currency}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusConfig[project.status as keyof typeof statusConfig]?.variant || "secondary"}
                          >
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig[project.status as keyof typeof statusConfig]?.label || project.status}
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
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/projets/${project.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir les détails
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
