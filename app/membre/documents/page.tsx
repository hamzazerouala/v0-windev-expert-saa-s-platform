import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Download, Eye, Search, File, FileCode } from "lucide-react"

export default function MemberDocumentsPage() {
  const documents = [
    {
      id: 1,
      name: "Contrat Développement App Mobile.pdf",
      type: "Contrat",
      project: "Application mobile de suivi",
      size: "2.4 MB",
      date: "15 Mars 2024",
      status: "Signé",
      icon: FileText,
    },
    {
      id: 2,
      name: "Cahier des charges - E-commerce.pdf",
      type: "Cahier des charges",
      project: "Site web e-commerce",
      size: "1.8 MB",
      date: "10 Mars 2024",
      status: "En attente",
      icon: FileText,
    },
    {
      id: 3,
      name: "Facture #2024-001.pdf",
      type: "Facture",
      project: "Application de gestion commerciale",
      size: "156 KB",
      date: "5 Mars 2024",
      status: "Payé",
      icon: File,
    },
    {
      id: 4,
      name: "Documentation API.pdf",
      type: "Documentation",
      project: "Application mobile de suivi",
      size: "3.2 MB",
      date: "1 Mars 2024",
      status: "Partagé",
      icon: FileCode,
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Signé":
      case "Payé":
        return "default"
      case "En attente":
        return "secondary"
      case "Partagé":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mes documents</h1>
        <p className="text-muted-foreground">Accédez aux documents partagés par l&apos;équipe</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher un document..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => {
              const Icon = doc.icon
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{doc.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{doc.project}</p>
                  </div>
                  <Badge variant={getStatusVariant(doc.status)}>{doc.status}</Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
