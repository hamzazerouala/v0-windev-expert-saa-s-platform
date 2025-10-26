"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Eye, Edit, AlertCircle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

const mockProjects = [
  {
    id: "1",
    name: "Application Mobile E-commerce",
    client: "TechStore Algeria",
    type: "Développement",
    status: "en_cours",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 150000,
    paid: 90000,
    tasks: { total: 45, completed: 29, pending: 16 },
    alerts: { delays: 2, payments: 0, validations: 1 },
  },
  {
    id: "2",
    name: "Formation WinDev Avancé",
    client: "Digital Solutions",
    type: "Formation",
    status: "planifie",
    progress: 0,
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    budget: 45000,
    paid: 0,
    tasks: { total: 12, completed: 0, pending: 12 },
    alerts: { delays: 0, payments: 0, validations: 0 },
  },
]

const statusConfig = {
  planifie: { label: "Planifié", variant: "secondary" as const, icon: Clock },
  en_cours: { label: "En cours", variant: "default" as const, icon: AlertCircle },
  en_attente: { label: "En attente", variant: "outline" as const, icon: Clock },
  termine: { label: "Terminé", variant: "default" as const, icon: CheckCircle },
  annule: { label: "Annulé", variant: "destructive" as const, icon: AlertCircle },
}

export default function ProjetsPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">En retard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">Nécessite attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,000 DZD</div>
            <p className="text-xs text-muted-foreground">5 factures</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Validations requises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Tâches à valider</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un projet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Projet</TableHead>
                  <TableHead className="w-[150px]">Client</TableHead>
                  <TableHead className="hidden w-[100px] md:table-cell">Type</TableHead>
                  <TableHead className="w-[150px]">Progression</TableHead>
                  <TableHead className="hidden w-[120px] lg:table-cell">Tâches</TableHead>
                  <TableHead className="hidden w-[150px] xl:table-cell">Budget</TableHead>
                  <TableHead className="hidden w-[120px] lg:table-cell">Alertes</TableHead>
                  <TableHead className="w-[120px]">Statut</TableHead>
                  <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => {
                  const StatusIcon = statusConfig[project.status as keyof typeof statusConfig].icon
                  return (
                    <TableRow key={project.id}>
                      <TableCell className="w-[200px]">
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {project.startDate} → {project.endDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="w-[150px]">{project.client}</TableCell>
                      <TableCell className="hidden w-[100px] md:table-cell">
                        <Badge variant="outline">{project.type}</Badge>
                      </TableCell>
                      <TableCell className="w-[150px]">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden w-[120px] lg:table-cell">
                        <div className="text-sm">
                          <div className="text-green-600">{project.tasks.completed} terminées</div>
                          <div className="text-muted-foreground">{project.tasks.pending} en cours</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden w-[150px] xl:table-cell">
                        <div className="text-sm">
                          <div className="font-medium">{project.budget.toLocaleString()} DZD</div>
                          <div className="text-muted-foreground">
                            Payé: {((project.paid / project.budget) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden w-[120px] lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.alerts.delays > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {project.alerts.delays} retard
                            </Badge>
                          )}
                          {project.alerts.validations > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {project.alerts.validations} validation
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="w-[120px]">
                        <Badge variant={statusConfig[project.status as keyof typeof statusConfig].variant}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          <span className="hidden sm:inline">
                            {statusConfig[project.status as keyof typeof statusConfig].label}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="w-[80px] text-right">
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
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
