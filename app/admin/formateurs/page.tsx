"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Mail, Phone, GraduationCap } from "lucide-react"
import Link from "next/link"

// Mock data for trainers
const mockTrainers = [
  {
    id: "1",
    name: "Ahmed Benali",
    email: "ahmed.benali@windevexpert.com",
    phone: "+213 555 123 456",
    specialties: ["WinDev", "WebDev", "WinDev Mobile"],
    formations: 12,
    students: 245,
    rating: 4.8,
    status: "active",
    joinDate: "2023-01-15",
    bio: "Expert WinDev avec 10 ans d'expérience",
  },
  {
    id: "2",
    name: "Sarah Mansouri",
    email: "sarah.mansouri@windevexpert.com",
    phone: "+213 555 234 567",
    specialties: ["React", "Next.js", "TypeScript"],
    formations: 8,
    students: 189,
    rating: 4.9,
    status: "active",
    joinDate: "2023-03-20",
    bio: "Développeuse Full Stack passionnée",
  },
]

export default function FormateursPage() {
  const [trainers, setTrainers] = useState(mockTrainers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    specialties: "",
    bio: "",
  })

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleCreateTrainer = () => {
    const trainer = {
      id: String(trainers.length + 1),
      ...newTrainer,
      specialties: newTrainer.specialties.split(",").map((s) => s.trim()),
      formations: 0,
      students: 0,
      rating: 0,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    }
    setTrainers([...trainers, trainer])
    setIsCreateDialogOpen(false)
    setNewTrainer({ name: "", email: "", phone: "", specialties: "", bio: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Formateurs</h1>
          <p className="text-muted-foreground">Gérez les formateurs de la plateforme</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau formateur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un formateur</DialogTitle>
              <DialogDescription>Créez un nouveau compte formateur</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={newTrainer.name}
                  onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                  placeholder="Ahmed Benali"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newTrainer.email}
                  onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                  placeholder="ahmed@windevexpert.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={newTrainer.phone}
                  onChange={(e) => setNewTrainer({ ...newTrainer, phone: e.target.value })}
                  placeholder="+213 555 123 456"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialties">Spécialités (séparées par des virgules)</Label>
                <Input
                  id="specialties"
                  value={newTrainer.specialties}
                  onChange={(e) => setNewTrainer({ ...newTrainer, specialties: e.target.value })}
                  placeholder="WinDev, WebDev, WinDev Mobile"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  value={newTrainer.bio}
                  onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                  placeholder="Décrivez l'expérience et les compétences du formateur..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateTrainer}>Créer le formateur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un formateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Formateur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Spécialités</TableHead>
                <TableHead>Formations</TableHead>
                <TableHead>Étudiants</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainers.map((trainer) => (
                <TableRow key={trainer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${trainer.name}`} />
                        <AvatarFallback>
                          {trainer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{trainer.name}</div>
                        <div className="text-sm text-muted-foreground">Depuis {trainer.joinDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {trainer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3" />
                        {trainer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      {trainer.formations}
                    </div>
                  </TableCell>
                  <TableCell>{trainer.students}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {trainer.rating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={trainer.status === "active" ? "default" : "secondary"}>
                      {trainer.status === "active" ? "Actif" : "Inactif"}
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
                          <Link href={`/admin/formateurs/${trainer.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir le profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
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
        </CardContent>
      </Card>
    </div>
  )
}
