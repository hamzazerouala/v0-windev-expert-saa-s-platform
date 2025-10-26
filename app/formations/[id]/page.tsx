"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, Users, Star, CheckCircle, Lock, FileText, BookOpen, Video } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FormationDetailPage({ params }: { params: { id: string } }) {
  const [enrolled, setEnrolled] = useState(false)
  const [progress, setProgress] = useState(35)

  const formation = {
    id: params.id,
    title: "WinDev - Débutant à Expert",
    subtitle: "Maîtrisez WinDev de A à Z avec cette formation complète",
    description: `
      <p>Cette formation complète vous permettra de maîtriser WinDev, l'un des outils de développement les plus puissants du marché.</p>
      <p>Vous apprendrez à créer des applications professionnelles, de la conception à la mise en production.</p>
    `,
    instructor: {
      name: "Ahmed Benali",
      title: "Expert WinDev - 15 ans d'expérience",
      avatar: "/placeholder.svg",
    },
    stats: {
      students: 245,
      rating: 4.8,
      reviews: 89,
      duration: "40 heures",
      lessons: 87,
      level: "Tous niveaux",
    },
    price: {
      dzd: 45000,
      eur: 299,
      usd: 329,
    },
    modules: [
      {
        id: 1,
        title: "Introduction à WinDev",
        duration: "2h 30min",
        lessons: [
          { id: 1, title: "Bienvenue dans la formation", type: "video", duration: "5:00", completed: true, free: true },
          { id: 2, title: "Installation de WinDev", type: "video", duration: "15:00", completed: true, free: true },
          {
            id: 3,
            title: "Interface et environnement",
            type: "video",
            duration: "20:00",
            completed: false,
            free: false,
          },
          { id: 4, title: "Quiz: Premiers pas", type: "quiz", duration: "10:00", completed: false, free: false },
        ],
      },
      {
        id: 2,
        title: "Les bases du développement",
        duration: "5h 45min",
        lessons: [
          {
            id: 5,
            title: "Variables et types de données",
            type: "video",
            duration: "25:00",
            completed: false,
            free: false,
          },
          { id: 6, title: "Structures de contrôle", type: "video", duration: "30:00", completed: false, free: false },
          { id: 7, title: "Fonctions et procédures", type: "video", duration: "35:00", completed: false, free: false },
          { id: 8, title: "Exercice pratique", type: "assignment", duration: "1h", completed: false, free: false },
        ],
      },
      {
        id: 3,
        title: "Interface utilisateur",
        duration: "6h 15min",
        lessons: [
          { id: 9, title: "Création de fenêtres", type: "video", duration: "40:00", completed: false, free: false },
          { id: 10, title: "Champs et contrôles", type: "video", duration: "45:00", completed: false, free: false },
          { id: 11, title: "Mise en page responsive", type: "video", duration: "30:00", completed: false, free: false },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <Badge className="bg-cyan-600">Formation Certifiante</Badge>
                <h1 className="text-4xl font-bold">{formation.title}</h1>
                <p className="text-xl text-slate-300">{formation.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{formation.stats.rating}</span>
                  <span className="text-slate-400">({formation.stats.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{formation.stats.students} étudiants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{formation.stats.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  <span>{formation.stats.lessons} leçons</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={formation.instructor.avatar || "/placeholder.svg"}
                  alt={formation.instructor.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{formation.instructor.name}</div>
                  <div className="text-sm text-slate-400">{formation.instructor.title}</div>
                </div>
              </div>

              {enrolled && (
                <div className="space-y-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span>Votre progression</span>
                    <span className="font-bold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6 space-y-4">
                  <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                    <Play className="h-16 w-16 text-slate-400" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-3xl font-bold">45 000 DZD</div>
                    <p className="text-sm text-muted-foreground">Accès à vie • Certificat inclus</p>
                  </div>

                  {enrolled ? (
                    <Link href={`/formations/${formation.id}/learn`} className="block">
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700" size="lg">
                        <Play className="mr-2 h-5 w-5" />
                        Continuer la formation
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => setEnrolled(true)}
                      className="w-full bg-cyan-600 hover:bg-cyan-700"
                      size="lg"
                    >
                      S'inscrire maintenant
                    </Button>
                  )}

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Accès à vie</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Certificat de complétion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Support 24/7</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Ressources téléchargeables</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container py-12">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="curriculum">Programme</TabsTrigger>
            <TabsTrigger value="instructor">Instructeur</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>À propos de cette formation</CardTitle>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: formation.description }} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ce que vous allez apprendre</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Maîtriser les fondamentaux de WinDev",
                    "Créer des interfaces utilisateur modernes",
                    "Gérer des bases de données HyperFileSQL",
                    "Développer des applications complètes",
                    "Déployer vos applications",
                    "Optimiser les performances",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle>Contenu de la formation</CardTitle>
                <CardDescription>
                  {formation.modules.length} modules • {formation.stats.lessons} leçons • {formation.stats.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {formation.modules.map((module) => (
                    <AccordionItem key={module.id} value={`module-${module.id}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between flex-1 pr-4">
                          <div className="text-left">
                            <div className="font-semibold">{module.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {module.lessons.length} leçons • {module.duration}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : lesson.free ? (
                                  <Play className="h-5 w-5 text-cyan-600" />
                                ) : (
                                  <Lock className="h-5 w-5 text-slate-400" />
                                )}
                                <div>
                                  <div className="font-medium">{lesson.title}</div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    {lesson.type === "video" && <Video className="h-3 w-3" />}
                                    {lesson.type === "quiz" && <FileText className="h-3 w-3" />}
                                    {lesson.type === "assignment" && <BookOpen className="h-3 w-3" />}
                                    <span>{lesson.duration}</span>
                                  </div>
                                </div>
                              </div>
                              {lesson.free && (
                                <Badge variant="outline" className="text-cyan-600 border-cyan-600">
                                  Aperçu gratuit
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor">
            <Card>
              <CardHeader>
                <CardTitle>Votre instructeur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <img
                    src={formation.instructor.avatar || "/placeholder.svg"}
                    alt={formation.instructor.name}
                    className="h-24 w-24 rounded-full"
                  />
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{formation.instructor.name}</h3>
                      <p className="text-muted-foreground">{formation.instructor.title}</p>
                    </div>
                    <p>
                      Expert WinDev avec plus de 15 ans d'expérience dans le développement d'applications d'entreprise.
                      Formateur certifié et auteur de plusieurs formations à succès.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Avis des étudiants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2 pb-6 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-semibold">Étudiant {i}</span>
                        <span className="text-sm text-muted-foreground">• Il y a 2 jours</span>
                      </div>
                      <p>
                        Excellente formation ! Les explications sont claires et les exercices pratiques permettent de
                        bien assimiler les concepts.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
