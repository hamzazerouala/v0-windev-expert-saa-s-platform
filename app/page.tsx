import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  GraduationCap,
  Headphones,
  Lightbulb,
  CheckCircle2,
  Smartphone,
  Globe,
  Database,
  Users,
  TrendingUp,
  Search,
  Lock,
  Zap,
  Cloud,
  Shield,
  MessageSquare,
  Brain,
  Cpu,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Layout,
  Palette,
  Puzzle,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50 text-slate-900 py-24 md:py-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.12),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-down">
              Votre Partenaire
              <br />
              <span className="text-cyan-600">Développement Digital</span>
            </h1>
            <p className="mt-6 text-lg text-slate-700 text-balance leading-relaxed md:text-xl animate-fade-in-up animation-delay-200">
              Développement d&apos;applications, formations techniques et accompagnement personnalisé pour réussir vos
              projets digitaux.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in-up animation-delay-400">
              <Link href="#services">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  Découvrir nos Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-cyan-600 text-cyan-700 hover:bg-cyan-50 bg-transparent transition-all duration-300 hover:scale-105"
                >
                  Demander un Devis
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4 max-w-4xl mx-auto">
            <div className="text-center animate-scale-in animation-delay-500">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 animate-count-up">500+</div>
              <div className="mt-2 text-sm text-slate-600">Clients Satisfaits</div>
            </div>
            <div className="text-center animate-scale-in animation-delay-600">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 animate-count-up">1000+</div>
              <div className="mt-2 text-sm text-slate-600">Projets Réalisés</div>
            </div>
            <div className="text-center animate-scale-in animation-delay-700">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 animate-count-up">4.9/5</div>
              <div className="mt-2 text-sm text-slate-600">Note Moyenne</div>
            </div>
            <div className="text-center animate-scale-in animation-delay-800">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 animate-count-up">99.9%</div>
              <div className="mt-2 text-sm text-slate-600">Disponibilité</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">Nos Services</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Une gamme complète de services pour accompagner votre transformation digitale
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 mb-4 transition-transform duration-300 hover:scale-110">
                  <Code className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-slate-900">Développement sur Mesure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Applications web, mobile et desktop adaptées à vos besoins spécifiques.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Sites web vitrine
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Applications métier
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    E-commerce
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Plateformes SaaS
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 mb-4 transition-transform duration-300 hover:scale-110">
                  <GraduationCap className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-slate-900">Formations Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Formations complètes pour maîtriser les technologies modernes.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Cours en ligne
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Projets pratiques
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />À votre rythme
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Support 24/7
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 mb-4 transition-transform duration-300 hover:scale-110">
                  <Headphones className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-slate-900">Assistance Technique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Support et maintenance pour vos applications existantes.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Support réactif
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Maintenance
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Optimisation
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Debugging
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-400">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 mb-4 transition-transform duration-300 hover:scale-110">
                  <Lightbulb className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-slate-900">Consulting IT</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Conseils stratégiques pour vos projets de transformation digitale.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Audit technique
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Architecture
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Stratégie
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    Accompagnement
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section 1 */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white animate-fade-in">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="mt-4 text-lg text-cyan-50 leading-relaxed">
              Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-cyan-600 hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Parlez nous de votre projet
                </Button>
              </Link>
              <Link href="/boutique">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent transition-all duration-300 hover:scale-105"
                >
                  Nos produits
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WinDev/PC SOFT Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
              Spécialistes WinDev & Technologies PC SOFT
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Experts reconnus dans l&apos;écosystème PC SOFT, nous développons et formons sur toutes les technologies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="border-slate-200 text-center hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 mb-4 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-slate-900">WinDev</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Développement d&apos;applications Windows natives performantes et modernes avec l&apos;environnement
                  WinDev.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 text-center hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-100 mb-4 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-slate-900">WebDev</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Création de sites web et applications web dynamiques avec WebDev et les dernières technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 text-center hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-100 mb-4 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-slate-900">WinDev Mobile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Applications mobiles natives iOS et Android avec WinDev Mobile pour une expérience optimale.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 text-center hover-lift animate-fade-in-up animation-delay-400">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-100 mb-4 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Database className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-slate-900">HFSQL & WLangage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Maîtrise complète de HFSQL et du WLangage pour des solutions robustes et performantes.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 bg-white hover-lift animate-fade-in animation-delay-500">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-cyan-100 shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  <Users className="h-10 w-10 text-cyan-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Formation & Accompagnement</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Nous formons vos équipes de développeurs aux technologies PC SOFT et les accompagnons dans leurs
                    projets pour garantir leur succès.
                  </p>
                </div>
                <Link href="/formations">
                  <Button
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-700 shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Nos formations
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WordPress Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
              Développement WordPress Sur Mesure
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Création de sites WordPress personnalisés, thèmes et plugins développés selon vos besoins spécifiques
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-3">
                  <Layout className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-slate-900">Sites WordPress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Création de sites WordPress performants et optimisés, adaptés à vos besoins métier avec une interface
                  d&apos;administration intuitive.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    E-commerce
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    Corporate
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    Blog
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-3">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-slate-900">Thèmes Sur Mesure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Développement de thèmes WordPress personnalisés avec des fonctionnalités spécifiques, design unique et
                  optimisation SEO.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    Responsive
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    SEO
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    Performance
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-3">
                  <Puzzle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-slate-900">Plugins Spécifiques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Création de plugins WordPress sur mesure pour étendre les fonctionnalités de votre site selon vos
                  besoins métier précis.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    API
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    Intégrations
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 transition-transform duration-200 hover:scale-110"
                  >
                    Automatisation
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-white hover-lift animate-fade-in animation-delay-400">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">Pourquoi Choisir WordPress ?</CardTitle>
              <p className="text-slate-600">
                WordPress allie flexibilité, performance et facilité d&apos;utilisation pour créer des sites web
                professionnels et évolutifs.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="transition-transform duration-300 hover:translate-x-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 transition-transform duration-300 hover:scale-110">
                      <TrendingUp className="h-5 w-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Facilité de gestion</h4>
                  </div>
                  <p className="text-sm text-slate-600">Interface intuitive pour gérer votre contenu</p>
                </div>
                <div className="transition-transform duration-300 hover:translate-x-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 transition-transform duration-300 hover:scale-110">
                      <Search className="h-5 w-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">SEO Optimisé</h4>
                  </div>
                  <p className="text-sm text-slate-600">Structure optimisée pour les moteurs de recherche</p>
                </div>
                <div className="transition-transform duration-300 hover:translate-x-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 transition-transform duration-300 hover:scale-110">
                      <Users className="h-5 w-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Communauté Active</h4>
                  </div>
                  <p className="text-sm text-slate-600">Écosystème riche et support communautaire</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Demander un devis WordPress
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modern Web & Mobile Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
              Développement Web & Mobile Moderne
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Solutions sur mesure avec les technologies les plus performantes du marché
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4 transition-transform duration-300 hover:scale-110">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-slate-900">Applications Web</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Sites vitrine, e-commerce, plateformes SaaS et applications métier avec React et Vue.js.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 transition-transform duration-200 hover:scale-110"
                  >
                    React
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 transition-transform duration-200 hover:scale-110"
                  >
                    Vue.js
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 mb-4 transition-transform duration-300 hover:scale-110">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-slate-900">Applications Mobiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Apps iOS et Android natives ou hybrides pour tous vos besoins métier et grand public.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 transition-transform duration-200 hover:scale-110"
                  >
                    React Native
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 transition-transform duration-200 hover:scale-110"
                  >
                    Flutter
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 mb-4 transition-transform duration-300 hover:scale-110">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-slate-900">APIs & Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Systèmes robustes, APIs REST, intégrations tierces et architectures scalables.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 transition-transform duration-200 hover:scale-110"
                  >
                    Node.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 transition-transform duration-200 hover:scale-110"
                  >
                    Python
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover-lift animate-fade-in-up animation-delay-400">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 mb-4 transition-transform duration-300 hover:scale-110">
                  <Cloud className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-slate-900">Solutions Cloud</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Déploiement, hébergement, monitoring et maintenance de vos applications.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 transition-transform duration-200 hover:scale-110"
                  >
                    AWS
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 transition-transform duration-200 hover:scale-110"
                  >
                    Docker
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 bg-white hover-lift animate-fade-in animation-delay-500">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">Pourquoi Choisir Nos Technologies ?</CardTitle>
              <p className="text-slate-600">
                Des solutions modernes, performantes et évolutives pour accompagner votre croissance.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 transition-transform duration-300 hover:scale-110">
                      <Zap className="h-5 w-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Performance</h4>
                  </div>
                  <p className="text-sm text-slate-600">Applications rapides et optimisées</p>
                </div>
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 transition-transform duration-300 hover:scale-110">
                      <Lock className="h-5 w-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Sécurité</h4>
                  </div>
                  <p className="text-sm text-slate-600">Protection avancée des données</p>
                </div>
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 transition-transform duration-300 hover:scale-110">
                      <TrendingUp className="h-5 w-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Évolutivité</h4>
                  </div>
                  <p className="text-sm text-slate-600">Solutions qui grandissent avec vous</p>
                </div>
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 transition-transform duration-300 hover:scale-110">
                      <Shield className="h-5 w-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Support</h4>
                  </div>
                  <p className="text-sm text-slate-600">Accompagnement personnalisé</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Discuter de votre projet
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI & Innovation Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white animate-fade-in">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Intelligence Artificielle & Innovation</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Intégration de l&apos;IA dans vos applications pour des solutions intelligentes et performantes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-slate-800 border-slate-700 hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20 mb-4 transition-all duration-300 hover:scale-110 hover:bg-cyan-500/30">
                  <MessageSquare className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Applications Web IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Chatbots intelligents, recommandations personnalisées, analyse prédictive et traitement automatique
                  des données.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    Chatbots
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    ML
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 mb-4 transition-all duration-300 hover:scale-110 hover:bg-purple-500/30">
                  <Cpu className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Applications Desktop IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Automatisation intelligente, reconnaissance d&apos;images, traitement du langage naturel et assistants
                  virtuels.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    NLP
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    Vision
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/20 mb-4 transition-all duration-300 hover:scale-110 hover:bg-pink-500/30">
                  <Brain className="h-6 w-6 text-pink-400" />
                </div>
                <CardTitle className="text-white">Solutions IA Personnalisées</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Modèles d&apos;IA sur mesure, intégration d&apos;APIs IA, optimisation de processus et formation de
                  modèles.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-pink-500/20 text-pink-300 border-pink-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    Custom AI
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-pink-500/20 text-pink-300 border-pink-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    Training
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center animate-fade-in animation-delay-400">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Explorer les possibilités IA
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.05),transparent_50%)]" />

        <div className="container relative">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500 shrink-0">
                    <span className="text-xl font-bold text-white">W</span>
                  </div>
                  <span className="text-xl font-bold text-slate-900">WindevExpert</span>
                </div>
                <p className="text-sm leading-relaxed mb-6 text-slate-600">
                  Votre partenaire de confiance pour le développement d'applications, la formation technique et
                  l'accompagnement personnalisé dans vos projets digitaux.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-cyan-500 hover:border-cyan-500 text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-cyan-500 hover:border-cyan-500 text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-cyan-500 hover:border-cyan-500 text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-cyan-500 hover:border-cyan-500 text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <Youtube className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-semibold text-slate-900 mb-4 text-base">Services & Solutions</h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link href="/services" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      Développement sur Mesure
                    </Link>
                  </li>
                  <li>
                    <Link href="/formations" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      Formations Techniques
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      Assistance Technique
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      Consulting IT
                    </Link>
                  </li>
                  <li>
                    <Link href="/boutique" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      Boutique
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      Blog & Actualités
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-semibold text-slate-900 mb-4 text-base">Technologies</h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link href="/formations" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      WinDev
                    </Link>
                  </li>
                  <li>
                    <Link href="/formations" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      WebDev
                    </Link>
                  </li>
                  <li>
                    <Link href="/formations" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      WinDev Mobile
                    </Link>
                  </li>
                  <li>
                    <Link href="/formations" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      WordPress
                    </Link>
                  </li>
                  <li>
                    <Link href="/formations" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      React & Vue.js
                    </Link>
                  </li>
                  <li>
                    <Link href="/formations" className="text-slate-600 hover:text-cyan-600 transition-colors block">
                      Intelligence Artificielle
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-semibold text-slate-900 mb-4 text-base">Contact</h3>
                <ul className="space-y-2.5 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-0.5 text-cyan-600 shrink-0" />
                    <a
                      href="mailto:contact@windevexpert.com"
                      className="text-slate-600 hover:text-cyan-600 transition-colors break-all"
                    >
                      contact@windevexpert.com
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 text-cyan-600 shrink-0" />
                    <a href="tel:+33123456789" className="text-slate-600 hover:text-cyan-600 transition-colors">
                      +33 1 23 45 67 89
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-cyan-600 shrink-0" />
                    <span className="text-slate-600">Paris, France</span>
                  </li>
                </ul>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">Newsletter</h4>
                  <p className="text-xs mb-3 text-slate-600">Restez informé</p>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-white/60 backdrop-blur-sm border-slate-200 text-slate-900 placeholder:text-slate-400 h-9 text-sm"
                    />
                    <Button
                      size="sm"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-105 shrink-0"
                    >
                      OK
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
