import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
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
import { getFormations } from "@/app/actions/formations"

export default async function FormationsPage() {
  const result = await getFormations()
  const formations = result.success ? result.formations : []

  const iconMap: Record<string, any> = {
    Code2,
    Globe,
    Smartphone,
    Database,
    Layers,
    Shield,
  }

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
            {formations.map((formation: any, index: number) => {
              const Icon = iconMap[formation.icon] || Code2 // Default icon
              const priceEur = (formation.price_cents || 0) / 100

              return (
                <Card
                  key={formation.id}
                  className="group relative overflow-hidden border-slate-200 bg-white hover:border-cyan-300 hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <Image
                      src={formation.image_url || "/placeholder.svg?height=200&width=400"}
                      alt={formation.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Level badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/95 backdrop-blur-sm shadow-lg border-0 font-semibold text-slate-900">
                        {formation.level || "Tous niveaux"}
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

                    {/* Duration */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg">
                        <Clock className="h-3.5 w-3.5 text-slate-700" />
                        <span className="font-semibold text-slate-900 text-xs">
                          {formation.duration_hours ? `${formation.duration_hours}h` : "N/A"}
                        </span>
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
                        <span>{formation.duration_hours ? `${formation.duration_hours}h` : "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="h-4 w-4 text-slate-400" />
                        <span>Vidéos HD</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between border-t border-slate-100 pt-4 bg-slate-50/50">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-slate-900">{priceEur.toFixed(0)}€</span>
                      <span className="text-xs text-muted-foreground">
                        {formation.price_type === "lifetime" ? "Accès à vie" : "Abonnement"}
                      </span>
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
