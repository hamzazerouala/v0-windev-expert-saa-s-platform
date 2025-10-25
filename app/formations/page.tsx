import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Users,
  Star,
  PlayCircle,
  Award,
  Video,
  BookOpen,
  CheckCircle,
  Code2,
  Globe,
  Smartphone,
  Database,
  Layers,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FormationsPage() {
  const formations = [
    {
      id: 1,
      title: "WinDev - Débutant à Expert",
      description:
        "Maîtrisez WinDev de A à Z avec cette formation complète couvrant tous les aspects du développement.",
      level: "Tous niveaux",
      duration: "40 heures",
      students: 245,
      rating: 4.8,
      price: 299,
      image: "/windev-development-course.jpg",
      icon: Code2,
      color: "cyan",
    },
    {
      id: 2,
      title: "WebDev - Développement Web Moderne",
      description: "Créez des applications web performantes et responsive avec WebDev et les dernières technologies.",
      level: "Intermédiaire",
      duration: "35 heures",
      students: 189,
      rating: 4.9,
      price: 279,
      image: "/web-development-course.png",
      icon: Globe,
      color: "blue",
    },
    {
      id: 3,
      title: "WinDev Mobile - Applications Mobiles",
      description: "Développez des applications mobiles natives pour iOS et Android avec WinDev Mobile.",
      level: "Intermédiaire",
      duration: "30 heures",
      students: 156,
      rating: 4.7,
      price: 259,
      image: "/mobile-app-development.png",
      icon: Smartphone,
      color: "purple",
    },
    {
      id: 4,
      title: "Base de données avec HyperFileSQL",
      description: "Maîtrisez la gestion de bases de données avec HyperFileSQL Classic et Client/Serveur.",
      level: "Débutant",
      duration: "25 heures",
      students: 312,
      rating: 4.6,
      price: 199,
      image: "/database-management-course.jpg",
      icon: Database,
      color: "emerald",
    },
    {
      id: 5,
      title: "Architecture Logicielle Avancée",
      description: "Concevez des architectures robustes et scalables pour vos applications d'entreprise.",
      level: "Avancé",
      duration: "20 heures",
      students: 98,
      rating: 4.9,
      price: 349,
      image: "/software-architecture-course.png",
      icon: Layers,
      color: "orange",
    },
    {
      id: 6,
      title: "Sécurité des Applications",
      description: "Apprenez à sécuriser vos applications contre les vulnérabilités courantes.",
      level: "Avancé",
      duration: "18 heures",
      students: 134,
      rating: 4.8,
      price: 229,
      image: "/application-security-shield-lock.jpg",
      icon: Shield,
      color: "red",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-border bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />

          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-cyan-600 hover:bg-cyan-700 text-white border-0">
                <Video className="mr-1 h-3 w-3" />
                Formations Certifiantes
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl text-slate-900">
                Formations Professionnelles
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Développez vos compétences avec nos formations certifiantes en ligne. Vidéos HD, exercices pratiques et
                support personnalisé.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                  <Award className="h-4 w-4 text-cyan-600" />
                  <span className="font-medium text-slate-700">Certifications reconnues</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                  <Video className="h-4 w-4 text-cyan-600" />
                  <span className="font-medium text-slate-700">Vidéos HD protégées</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                  <BookOpen className="h-4 w-4 text-cyan-600" />
                  <span className="font-medium text-slate-700">Accès à vie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formations Grid */}
        <section className="container py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {formations.map((formation, index) => {
              const Icon = formation.icon
              return (
                <Card
                  key={formation.id}
                  className="group relative overflow-hidden border-slate-200 bg-white hover:border-cyan-300 hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <Image
                      src={formation.image || "/placeholder.svg"}
                      alt={formation.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Level badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/95 backdrop-blur-sm shadow-lg border-0 font-semibold text-slate-900">
                        {formation.level}
                      </Badge>
                    </div>

                    {/* Icon */}
                    <div className="absolute top-3 left-3">
                      <div
                        className={`h-10 w-10 rounded-lg bg-${formation.color}-600 flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-slate-900 text-sm">{formation.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg">
                        <Users className="h-3.5 w-3.5 text-slate-700" />
                        <span className="font-semibold text-slate-900 text-xs">{formation.students}</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3 flex-1">
                    <CardTitle className="line-clamp-2 group-hover:text-cyan-600 transition-colors text-lg leading-tight">
                      {formation.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed text-sm mt-2">
                      {formation.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{formation.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="h-4 w-4 text-slate-400" />
                        <span>Vidéos HD</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between border-t border-slate-100 pt-4 bg-slate-50/50">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-slate-900">{formation.price}€</span>
                      <span className="text-xs text-muted-foreground">Accès à vie</span>
                    </div>
                    <Link href={`/formations/${formation.id}`}>
                      <Button className="bg-cyan-600 hover:bg-cyan-700 group-hover:shadow-lg transition-all">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Découvrir
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-slate-50 py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
                Pourquoi choisir nos formations ?
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Une expérience d&apos;apprentissage complète et professionnelle
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-slate-200 bg-white hover:border-cyan-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600 shadow-lg">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Vidéos HD</CardTitle>
                  <CardDescription className="leading-relaxed text-sm">
                    Contenu vidéo haute qualité avec protection DRM.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-slate-200 bg-white hover:border-cyan-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Accès à vie</CardTitle>
                  <CardDescription className="leading-relaxed text-sm">
                    Accédez à vos formations à tout moment.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-slate-200 bg-white hover:border-cyan-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 shadow-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Certification</CardTitle>
                  <CardDescription className="leading-relaxed text-sm">
                    Certificat de réussite à la fin.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-slate-200 bg-white hover:border-cyan-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Support 24/7</CardTitle>
                  <CardDescription className="leading-relaxed text-sm">
                    Assistance technique disponible.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
