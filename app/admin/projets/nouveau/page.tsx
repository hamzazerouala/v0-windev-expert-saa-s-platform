"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    currency: "DZD",
    status: "planifie",
  })

  const [milestones, setMilestones] = useState([{ id: "1", name: "", amount: "", dueDate: "", description: "" }])

  const [tasks, setTasks] = useState([
    { id: "1", name: "", description: "", assignee: "", dueDate: "", priority: "medium" },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating project:", { formData, milestones, tasks })
    // TODO: Save project to database
    router.push("/admin/projets")
  }

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now().toString(), name: "", amount: "", dueDate: "", description: "" }])
  }

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  const updateMilestone = (id: string, field: string, value: string) => {
    setMilestones(milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), name: "", description: "", assignee: "", dueDate: "", priority: "medium" },
    ])
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const updateTask = (id: string, field: string, value: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projets">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nouveau projet</h1>
          <p className="text-muted-foreground">Créez un nouveau projet de développement ou de formation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Informations générales</TabsTrigger>
            <TabsTrigger value="milestones">Tranches de paiement</TabsTrigger>
            <TabsTrigger value="tasks">Tâches</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du projet</CardTitle>
                <CardDescription>Détails de base du projet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du projet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Application Mobile E-commerce"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client *</Label>
                    <Select
                      value={formData.client}
                      onValueChange={(value) => setFormData({ ...formData, client: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">TechStore Algeria</SelectItem>
                        <SelectItem value="2">Digital Solutions</SelectItem>
                        <SelectItem value="3">Innovation Hub</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de projet *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developpement">Développement</SelectItem>
                        <SelectItem value="formation">Formation</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planifie">Planifié</SelectItem>
                        <SelectItem value="en_cours">En cours</SelectItem>
                        <SelectItem value="en_attente">En attente</SelectItem>
                        <SelectItem value="termine">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description détaillée du projet..."
                    rows={4}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise *</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DZD">DZD - Dinar Algérien</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="USD">USD - Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget total *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="150000"
                      required
                      className="flex-1"
                    />
                    <div className="flex h-10 w-20 items-center justify-center rounded-md border bg-muted px-3 text-sm font-medium">
                      {formData.currency}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formData.currency === "DZD" && "Paiement via Chargily ou virement CCP/Banque"}
                    {formData.currency === "EUR" && "Paiement via Stripe ou virement IBAN"}
                    {formData.currency === "USD" && "Paiement via Stripe ou virement IBAN"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tranches de paiement</CardTitle>
                    <CardDescription>Définissez les étapes de paiement du projet</CardDescription>
                  </div>
                  <Button type="button" onClick={addMilestone} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une tranche
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {milestones.map((milestone, index) => (
                  <Card key={milestone.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Tranche {index + 1}</h4>
                          {milestones.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMilestone(milestone.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Nom de la tranche</Label>
                            <Input
                              value={milestone.name}
                              onChange={(e) => updateMilestone(milestone.id, "name", e.target.value)}
                              placeholder="Ex: Paiement initial"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Montant ({formData.currency})</Label>
                            <Input
                              type="number"
                              value={milestone.amount}
                              onChange={(e) => updateMilestone(milestone.id, "amount", e.target.value)}
                              placeholder="50000"
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Date d'échéance</Label>
                            <Input
                              type="date"
                              value={milestone.dueDate}
                              onChange={(e) => updateMilestone(milestone.id, "dueDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Input
                              value={milestone.description}
                              onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                              placeholder="Description de la tranche"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tâches du projet</CardTitle>
                    <CardDescription>Définissez les tâches à réaliser</CardDescription>
                  </div>
                  <Button type="button" onClick={addTask} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une tâche
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task, index) => (
                  <Card key={task.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Tâche {index + 1}</h4>
                          {tasks.length > 1 && (
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeTask(task.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Nom de la tâche</Label>
                            <Input
                              value={task.name}
                              onChange={(e) => updateTask(task.id, "name", e.target.value)}
                              placeholder="Ex: Développement de l'interface"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Assigné à</Label>
                            <Select
                              value={task.assignee}
                              onValueChange={(value) => updateTask(task.id, "assignee", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="dev1">Développeur 1</SelectItem>
                                <SelectItem value="dev2">Développeur 2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={task.description}
                            onChange={(e) => updateTask(task.id, "description", e.target.value)}
                            placeholder="Description de la tâche..."
                            rows={2}
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Date d'échéance</Label>
                            <Input
                              type="date"
                              value={task.dueDate}
                              onChange={(e) => updateTask(task.id, "dueDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Priorité</Label>
                            <Select
                              value={task.priority}
                              onValueChange={(value) => updateTask(task.id, "priority", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Basse</SelectItem>
                                <SelectItem value="medium">Moyenne</SelectItem>
                                <SelectItem value="high">Haute</SelectItem>
                                <SelectItem value="urgent">Urgente</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Link href="/admin/projets">
            <Button type="button" variant="outline">
              Annuler
            </Button>
          </Link>
          <Button type="submit">Créer le projet</Button>
        </div>
      </form>
    </div>
  )
}
