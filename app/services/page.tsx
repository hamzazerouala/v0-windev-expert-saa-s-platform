import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Wrench, Search, FileCheck, Rocket, HeadphonesIcon } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Code2,
      title: "Développement sur mesure",
      description:
        "Applications desktop, web et mobile développées avec WinDev, WebDev et WinDev Mobile selon vos besoins spécifiques.",
      features: ["Analyse des besoins", "Architecture logicielle", "Développement agile", "Tests et validation"],
    },
    {
      icon: Wrench,
      title: "Maintenance et support",
      description: "Maintenance corrective et évolutive de vos applications existantes avec support technique réactif.",
      features: ["Support technique 24/7", "Corrections de bugs", "Mises à jour", "Optimisation"],
    },
    {
      icon: Search,
      title: "Audit de code",
      description:
        "Analyse approfondie de votre code source pour identifier les problèmes de performance, sécurité et maintenabilité.",
      features: ["Analyse statique", "Revue de code", "Recommandations", "Plan d'action"],
    },
    {
      icon: FileCheck,
      title: "Consulting technique",
      description: "Accompagnement et conseil pour vos projets de développement, choix technologiques et architecture.",
      features: ["Expertise technique", "Choix d'architecture", "Formation équipe", "Best practices"],
    },
    {
      icon: Rocket,
      title: "Migration et modernisation",
      description: "Migration de vos applications legacy vers des technologies modernes et performantes.",
      features: ["Analyse existant", "Plan de migration", "Refactoring", "Tests de régression"],
    },
    {
      icon: HeadphonesIcon,
      title: "Accompagnement projet",
      description: "Suivi et accompagnement de vos projets de A à Z avec méthodologie agile.",
      features: ["Gestion de projet", "Suivi régulier", "Reporting", "Livraison continue"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/50 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Nos Services de Développement
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Des solutions logicielles sur mesure pour accompagner votre transformation digitale avec expertise et
                professionnalisme.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-muted/50 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Discutons de votre projet</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Contactez-nous pour un devis gratuit et personnalisé adapté à vos besoins.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg">Demander un devis</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
