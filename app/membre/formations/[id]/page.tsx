"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PlayCircle, CheckCircle, Lock, Download, Award, ChevronRight } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function TrainingDetailPage() {
  const params = useParams()
  const [selectedVideo, setSelectedVideo] = useState(0)

  // Mock data - in production this would come from a database
  const training = {
    id: params.id,
    title: "WinDev - Débutant à Expert",
    description: "Formation complète sur WinDev couvrant tous les aspects du développement",
    instructor: "Jean Dupont",
    duration: "40 heures",
    level: "Tous niveaux",
    progress: 65,
    image: "/windev-development-course.jpg",
    chapters: [
      {
        id: 1,
        title: "Introduction à WinDev",
        duration: "2h 30min",
        videos: [
          {
            id: 1,
            title: "Présentation de WinDev",
            duration: "15:30",
            completed: true,
            locked: false,
          },
          {
            id: 2,
            title: "Installation et configuration",
            duration: "20:45",
            completed: true,
            locked: false,
          },
          {
            id: 3,
            title: "Premier projet",
            duration: "25:15",
            completed: true,
            locked: false,
          },
        ],
      },
      {
        id: 2,
        title: "Les bases du développement",
        duration: "5h 15min",
        videos: [
          {
            id: 4,
            title: "Variables et types de données",
            duration: "30:20",
            completed: true,
            locked: false,
          },
          {
            id: 5,
            title: "Structures de contrôle",
            duration: "35:45",
            completed: true,
            locked: false,
          },
          {
            id: 6,
            title: "Fonctions et procédures",
            duration: "40:10",
            completed: false,
            locked: false,
          },
          {
            id: 7,
            title: "Gestion des erreurs",
            duration: "28:30",
            completed: false,
            locked: false,
          },
        ],
      },
      {
        id: 3,
        title: "Interface utilisateur",
        duration: "6h 45min",
        videos: [
          {
            id: 8,
            title: "Création de fenêtres",
            duration: "45:20",
            completed: false,
            locked: false,
          },
          {
            id: 9,
            title: "Champs et contrôles",
            duration: "50:15",
            completed: false,
            locked: false,
          },
          {
            id: 10,
            title: "Menus et barres d'outils",
            duration: "35:40",
            completed: false,
            locked: true,
          },
        ],
      },
      {
        id: 4,
        title: "Base de données",
        duration: "8h 20min",
        videos: [
          {
            id: 11,
            title: "Introduction à HyperFileSQL",
            duration: "40:00",
            completed: false,
            locked: true,
          },
          {
            id: 12,
            title: "Requêtes SQL",
            duration: "55:30",
            completed: false,
            locked: true,
          },
        ],
      },
    ],
  }

  const currentVideo =
    training.chapters.flatMap((c) => c.videos).find((v) => v.id === selectedVideo) || training.chapters[0].videos[0]

  const totalVideos = training.chapters.reduce((acc, chapter) => acc + chapter.videos.length, 0)
  const completedVideos = training.chapters.reduce(
    (acc, chapter) => acc + chapter.videos.filter((v) => v.completed).length,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Training Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              <img
                src={training.image || "/placeholder.svg"}
                alt={training.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold mb-1">{training.title}</h1>
                <p className="text-muted-foreground">{training.description}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Instructeur : </span>
                  <span className="font-medium">{training.instructor}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Durée : </span>
                  <span className="font-medium">{training.duration}</span>
                </div>
                <Badge variant="secondary">{training.level}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progression : {completedVideos}/{totalVideos} vidéos
                  </span>
                  <span className="font-medium">{training.progress}%</span>
                </div>
                <Progress value={training.progress} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Video Player */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black">
                {currentVideo.locked ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Vidéo verrouillée</p>
                      <p className="text-sm opacity-75">Complétez les vidéos précédentes pour débloquer</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-white">
                      <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-75" />
                      <p className="text-sm opacity-75">Lecteur vidéo avec protection DRM</p>
                      <p className="text-xs opacity-50 mt-2">Google Widevine DRM + Watermarking</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{currentVideo.title}</CardTitle>
                  <CardDescription>Durée : {currentVideo.duration}</CardDescription>
                </div>
                {currentVideo.completed && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button className="flex-1" disabled={currentVideo.locked}>
                  {currentVideo.completed ? "Revoir la vidéo" : "Marquer comme terminé"}
                </Button>
                <Button variant="outline" disabled={currentVideo.locked}>
                  <Download className="mr-2 h-4 w-4" />
                  Ressources
                </Button>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dans cette vidéo, vous apprendrez les concepts fondamentaux nécessaires pour maîtriser cette partie du
                  cours. Des exemples pratiques et des exercices vous permettront de mettre en pratique vos
                  connaissances.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Ressources téléchargeables</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    disabled={currentVideo.locked}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Code source des exemples.zip
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    disabled={currentVideo.locked}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Support de cours.pdf
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Content Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contenu de la formation</CardTitle>
              <CardDescription>
                {completedVideos}/{totalVideos} vidéos terminées
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {training.chapters.map((chapter) => (
                  <div key={chapter.id} className="border-b border-border last:border-0">
                    <div className="p-4 bg-muted/50">
                      <h3 className="font-semibold text-sm">{chapter.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {chapter.videos.length} vidéos • {chapter.duration}
                      </p>
                    </div>
                    <div>
                      {chapter.videos.map((video) => (
                        <button
                          key={video.id}
                          onClick={() => !video.locked && setSelectedVideo(video.id)}
                          disabled={video.locked}
                          className={`w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                            selectedVideo === video.id ? "bg-muted" : ""
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {video.locked ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : video.completed ? (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            ) : (
                              <PlayCircle className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium line-clamp-1">{video.title}</div>
                            <div className="text-xs text-muted-foreground">{video.duration}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {training.progress === 100 && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certificat disponible
                </CardTitle>
                <CardDescription>Félicitations pour avoir terminé la formation !</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le certificat
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
