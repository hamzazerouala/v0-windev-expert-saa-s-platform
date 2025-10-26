"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShoppingBag, GraduationCap, FolderKanban, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-provider"

export default function MemberDashboardPage() {
  const { t } = useLanguage()

  const stats = {
    totalPurchases: 5,
    activeTrainings: 3,
    activeProjects: 2,
    completedTrainings: 1,
  }

  const recentTrainings = [
    {
      id: 1,
      title: "WinDev - Débutant à Expert",
      progress: 65,
      lastAccessed: "Il y a 2 heures",
      image: "/windev-development-course.jpg",
    },
    {
      id: 2,
      title: "WebDev - Développement Web Moderne",
      progress: 30,
      lastAccessed: "Il y a 1 jour",
      image: "/web-development-course.png",
    },
    {
      id: 3,
      title: "Base de données avec HyperFileSQL",
      progress: 100,
      lastAccessed: "Il y a 3 jours",
      image: "/database-management-course.jpg",
    },
  ]

  const recentProjects = [
    {
      id: 1,
      title: "Application de gestion commerciale",
      status: "En cours",
      progress: 45,
      dueDate: "15 Avril 2024",
    },
    {
      id: 2,
      title: "Site web e-commerce",
      status: "En attente",
      progress: 20,
      dueDate: "30 Avril 2024",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t("member.dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("member.dashboard.welcome")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("member.dashboard.stats.totalPurchases")}</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPurchases}</div>
            <p className="text-xs text-muted-foreground">{t("member.dashboard.stats.productsServices")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("member.dashboard.stats.activeTrainings")}</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTrainings}</div>
            <p className="text-xs text-muted-foreground">{t("member.dashboard.stats.inProgress")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("member.dashboard.stats.activeProjects")}</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">{t("member.dashboard.stats.activeProjectsDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("member.dashboard.stats.completedTrainings")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTrainings}</div>
            <p className="text-xs text-muted-foreground">{t("member.dashboard.stats.certificates")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trainings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("member.dashboard.recentTrainings.title")}</CardTitle>
              <CardDescription>{t("member.dashboard.recentTrainings.description")}</CardDescription>
            </div>
            <Link href="/membre/formations">
              <Button variant="outline" size="sm">
                {t("common.viewAll")}
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentTrainings.map((training) => (
            <div key={training.id} className="flex gap-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <img
                  src={training.image || "/placeholder.svg"}
                  alt={training.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold line-clamp-1">{training.title}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {training.lastAccessed}
                    </p>
                  </div>
                  {training.progress === 100 && <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("common.progress")}</span>
                    <span className="font-medium">{training.progress}%</span>
                  </div>
                  <Progress value={training.progress} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("member.dashboard.recentProjects.title")}</CardTitle>
              <CardDescription>{t("member.dashboard.recentProjects.description")}</CardDescription>
            </div>
            <Link href="/membre/projets">
              <Button variant="outline" size="sm">
                {t("common.viewAll")}
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentProjects.map((project) => (
            <div key={project.id} className="space-y-3 rounded-lg border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("member.dashboard.recentProjects.dueDate")} : {project.dueDate}
                  </p>
                </div>
                <span className="text-sm font-medium text-primary">{project.status}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("common.progress")}</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
