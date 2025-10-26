"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Download, Share2, Trash2, FileText, Upload } from "lucide-react"

const mockDocuments = [
  {
    id: "1",
    name: "Contrat Développement App Mobile.pdf",
    type: "Contrat",
    client: "TechStore Algeria",
    project: "Application Mobile E-commerce",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    sharedWith: ["client"],
    status: "signed",
  },
  {
    id: "2",
    name: "Cahier des charges - Formation WinDev.pdf",
    type: "Cahier des charges",
    client: "Digital Solutions",
    project: "Formation WinDev Avancé",
    size: "1.8 MB",
    uploadDate: "2024-02-20",
    sharedWith: ["client"],
    status: "pending",
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    type: "",
    client: "",
    project: "",
  })

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="max-w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion Documentaire (GED)</h1>
          <p className="text-muted-foreground">Gérez et partagez des documents avec vos clients</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" />
              Téléverser un document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Téléverser un document</DialogTitle>
              <DialogDescription>Ajoutez un nouveau document à partager avec un client</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">Fichier</Label>
                <Input id="file" type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type de document</Label>
                <Select
                  value={uploadForm.type}
                  onValueChange={(value) => setUploadForm({ ...uploadForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contrat">Contrat</SelectItem>
                    <SelectItem value="cahier">Cahier des charges</SelectItem>
                    <SelectItem value="facture">Facture</SelectItem>
                    <SelectItem value="devis">Devis</SelectItem>
                    <SelectItem value="rapport">Rapport</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Select
                  value={uploadForm.client}
                  onValueChange={(value) => setUploadForm({ ...uploadForm, client: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">TechStore Algeria</SelectItem>
                    <SelectItem value="2">Digital Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Projet (optionnel)</Label>
                <Select
                  value={uploadForm.project}
                  onValueChange={(value) => setUploadForm({ ...uploadForm, project: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un projet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Application Mobile E-commerce</SelectItem>
                    <SelectItem value="2">Formation WinDev Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsUploadDialogOpen(false)}>Téléverser</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Contrats signés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">3 en attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Partagés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Avec clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Espace utilisé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">Sur 10 GB</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document..."
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
                  <TableHead className="w-[250px]">Document</TableHead>
                  <TableHead className="hidden w-[120px] md:table-cell">Type</TableHead>
                  <TableHead className="w-[150px]">Client</TableHead>
                  <TableHead className="hidden w-[200px] lg:table-cell">Projet</TableHead>
                  <TableHead className="hidden w-[100px] sm:table-cell">Taille</TableHead>
                  <TableHead className="hidden w-[120px] xl:table-cell">Date</TableHead>
                  <TableHead className="w-[100px]">Statut</TableHead>
                  <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="w-[250px]">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden w-[120px] md:table-cell">
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="w-[150px]">{doc.client}</TableCell>
                    <TableCell className="hidden w-[200px] lg:table-cell">{doc.project}</TableCell>
                    <TableCell className="hidden w-[100px] sm:table-cell">{doc.size}</TableCell>
                    <TableCell className="hidden w-[120px] xl:table-cell">{doc.uploadDate}</TableCell>
                    <TableCell className="w-[100px]">
                      <Badge variant={doc.status === "signed" ? "default" : "secondary"}>
                        {doc.status === "signed" ? "Signé" : "En attente"}
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
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Partager
                          </DropdownMenuItem>
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
