import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, Paperclip } from "lucide-react"

export default function MemberProjectsPage() {
  // Mock data - in production this would come from a database
  const projects = [
    {
      id: 1,
      title: "Application de gestion commerciale",
      description: "Développement d'une application complète de gestion commerciale avec WinDev",
      status: "En cours",
      progress: 45,
      startDate: "1 Mars 2024",
      dueDate: "15 Avril 2024",
      budget: 5000,
      messages: 12,
      attachments: 8,
    },
    {
      id: 2,
      title: "Site web e-commerce",
      description: "Création d'un site e-commerce avec WebDev et intégration paiement",
      status: "En attente",
      progress: 20,
      startDate: "10 Mars 2024",
      dueDate: "30 Avril 2024",
      budget: 3500,
      messages: 5,
      attachments: 3,
    },
    {
      id: 3,
      title: "Application mobile de suivi",
      description: "Application mobile iOS/Android avec WinDev Mobile",
      status: "Terminé",
      progress: 100,
      startDate: "1 Février 2024",
      dueDate: "28 Février 2024",
      budget: 4000,
      messages: 28,
      attachments: 15,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "default"
      case "En attente":
        return "secondary"
      case "Terminé":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mes projets</h1>
          <p className="text-muted-foreground">Suivez l&apos;avancement de vos projets de développement</p>
        </div>
        <Button>Nouveau projet</Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle>{project.title}</CardTitle>
                    <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Début</div>
                    <div className="font-medium">{project.startDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Échéance</div>
                    <div className="font-medium">{project.dueDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Budget</div>
                    <div className="font-medium">{project.budget}€</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avancement</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{project.messages} messages</span>
                </div>
                <div className="flex items-center gap-1">
                  <Paperclip className="h-4 w-4" />
                  <span>{project.attachments} fichiers</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Voir les détails</Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
