import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, Circle, CreditCard, Paperclip, Send, Download, Calendar, AlertCircle } from "lucide-react"

export default function ProjectDetailPage() {
  // Mock data
  const project = {
    id: 1,
    title: "Application de gestion commerciale",
    description: "Développement d'une application complète de gestion commerciale avec WinDev",
    status: "En cours",
    progress: 45,
    startDate: "1 Mars 2024",
    dueDate: "15 Avril 2024",
    budget: 5000,
    currency: "EUR",
  }

  const tasks = [
    {
      id: 1,
      title: "Analyse des besoins",
      status: "completed",
      dueDate: "5 Mars 2024",
      needsValidation: false,
    },
    {
      id: 2,
      title: "Conception de la base de données",
      status: "completed",
      dueDate: "10 Mars 2024",
      needsValidation: true,
    },
    {
      id: 3,
      title: "Développement du module clients",
      status: "in_progress",
      dueDate: "20 Mars 2024",
      needsValidation: false,
    },
    {
      id: 4,
      title: "Développement du module factures",
      status: "pending",
      dueDate: "30 Mars 2024",
      needsValidation: false,
    },
  ]

  const payments = [
    {
      id: 1,
      title: "Tranche 1 - Analyse et conception",
      amount: 1500,
      currency: "EUR",
      status: "paid",
      dueDate: "10 Mars 2024",
      paidDate: "8 Mars 2024",
    },
    {
      id: 2,
      title: "Tranche 2 - Développement modules principaux",
      amount: 2000,
      currency: "EUR",
      status: "pending",
      dueDate: "25 Mars 2024",
    },
    {
      id: 3,
      title: "Tranche 3 - Tests et livraison",
      amount: 1500,
      currency: "EUR",
      status: "upcoming",
      dueDate: "15 Avril 2024",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "admin",
      senderName: "WindevExpert",
      content: "Bonjour, la phase d'analyse est terminée. Merci de valider le document joint.",
      timestamp: "Il y a 2 heures",
      attachments: ["analyse-besoins.pdf"],
    },
    {
      id: 2,
      sender: "client",
      senderName: "Vous",
      content: "Parfait, je vais regarder ça aujourd'hui.",
      timestamp: "Il y a 1 heure",
    },
  ]

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Circle className="h-5 w-5 text-blue-500 fill-blue-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-300" />
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="outline">Payé</Badge>
      case "pending":
        return <Badge variant="destructive">À payer</Badge>
      default:
        return <Badge variant="secondary">À venir</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <Badge>{project.status}</Badge>
        </div>
        <p className="text-muted-foreground">{project.description}</p>
      </div>

      {/* Project Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avancement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.budget} {project.currency}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Début</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.startDate}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Échéance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.dueDate}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Tâches</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getTaskStatusIcon(task.status)}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{task.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {task.dueDate}
                        </div>
                        {task.needsValidation && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Validation requise
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {task.needsValidation && (
                    <Button size="sm">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Valider
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{payment.title}</h3>
                      {getPaymentStatusBadge(payment.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Échéance: {payment.dueDate}
                      </div>
                      {payment.paidDate && (
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Payé le: {payment.paidDate}
                        </div>
                      )}
                    </div>
                    <div className="text-2xl font-bold mt-2">
                      {payment.amount} {payment.currency}
                    </div>
                  </div>
                  {payment.status === "pending" && (
                    <Button>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payer maintenant
                    </Button>
                  )}
                  {payment.status === "paid" && (
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger facture
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messagerie du projet</CardTitle>
              <CardDescription>Communiquez avec l&apos;équipe de développement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Messages List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "client" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar>
                      <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${message.sender === "client" ? "text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{message.senderName}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          message.sender === "client" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs">
                                <Paperclip className="h-3 w-3" />
                                <span>{file}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea placeholder="Écrivez votre message..." className="min-h-[80px]" />
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
