import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, CheckCircle, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function MemberTrainingsPage() {
  // Mock data - in production this would come from a database
  const trainings = [
    {
      id: 1,
      title: "WinDev - Débutant à Expert",
      description: "Formation complète sur WinDev",
      progress: 65,
      totalVideos: 45,
      watchedVideos: 29,
      duration: "40 heures",
      lastAccessed: "Il y a 2 heures",
      status: "En cours",
      image: "/windev-development-course.jpg",
    },
    {
      id: 2,
      title: "WebDev - Développement Web Moderne",
      description: "Créez des applications web avec WebDev",
      progress: 30,
      totalVideos: 38,
      watchedVideos: 11,
      duration: "35 heures",
      lastAccessed: "Il y a 1 jour",
      status: "En cours",
      image: "/web-development-course.png",
    },
    {
      id: 3,
      title: "Base de données avec HyperFileSQL",
      description: "Maîtrisez HyperFileSQL",
      progress: 100,
      totalVideos: 28,
      watchedVideos: 28,
      duration: "25 heures",
      lastAccessed: "Il y a 3 jours",
      status: "Terminé",
      image: "/database-management-course.jpg",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mes formations</h1>
        <p className="text-muted-foreground">Accédez à vos formations et suivez votre progression</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {trainings.map((training) => (
          <Card key={training.id} className="flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <img
                src={training.image || "/placeholder.svg"}
                alt={training.title}
                className="h-full w-full object-cover"
              />
              {training.status === "Terminé" && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Terminé
                  </Badge>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{training.title}</CardTitle>
              <CardDescription>{training.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <PlayCircle className="h-4 w-4" />
                  <span>
                    {training.watchedVideos}/{training.totalVideos} vidéos
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{training.duration}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium">{training.progress}%</span>
                </div>
                <Progress value={training.progress} />
              </div>

              <p className="text-sm text-muted-foreground">Dernier accès : {training.lastAccessed}</p>
            </CardContent>
            <CardContent className="pt-0">
              {training.status === "Terminé" ? (
                <div className="flex gap-2">
                  <Link href={`/membre/formations/${training.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Revoir la formation
                    </Button>
                  </Link>
                  <Button variant="outline">
                    <Award className="mr-2 h-4 w-4" />
                    Certificat
                  </Button>
                </div>
              ) : (
                <Link href={`/membre/formations/${training.id}`} className="block">
                  <Button className="w-full">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Continuer la formation
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
