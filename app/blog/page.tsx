import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Les nouveautés de WinDev 2024",
      excerpt: "Découvrez les nouvelles fonctionnalités et améliorations apportées par la dernière version de WinDev.",
      category: "WinDev",
      author: "Jean Dupont",
      date: "15 Mars 2024",
      readTime: "5 min",
      image: "/windev-2024-features.jpg",
    },
    {
      id: 2,
      title: "Optimiser les performances de vos applications",
      excerpt: "Guide complet pour améliorer les performances et la réactivité de vos applications WinDev.",
      category: "Performance",
      author: "Marie Martin",
      date: "10 Mars 2024",
      readTime: "8 min",
      image: "/application-performance-optimization.jpg",
    },
    {
      id: 3,
      title: "Sécuriser vos applications web avec WebDev",
      excerpt: "Les meilleures pratiques pour protéger vos applications web contre les vulnérabilités courantes.",
      category: "Sécurité",
      author: "Pierre Dubois",
      date: "5 Mars 2024",
      readTime: "10 min",
      image: "/web-application-security.png",
    },
    {
      id: 4,
      title: "Architecture microservices avec WinDev",
      excerpt: "Comment concevoir et implémenter une architecture microservices moderne avec WinDev.",
      category: "Architecture",
      author: "Sophie Bernard",
      date: "1 Mars 2024",
      readTime: "12 min",
      image: "/microservices-architecture.png",
    },
    {
      id: 5,
      title: "Développement mobile cross-platform",
      excerpt: "Créez des applications mobiles performantes pour iOS et Android avec WinDev Mobile.",
      category: "Mobile",
      author: "Luc Petit",
      date: "25 Février 2024",
      readTime: "7 min",
      image: "/cross-platform-mobile-development.png",
    },
    {
      id: 6,
      title: "Tests automatisés pour applications WinDev",
      excerpt: "Mise en place d'une stratégie de tests automatisés complète pour garantir la qualité.",
      category: "Tests",
      author: "Anne Moreau",
      date: "20 Février 2024",
      readTime: "9 min",
      image: "/automated-testing-software.jpg",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/50 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">Blog</h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Actualités, tutoriels et conseils d&apos;experts pour maîtriser le développement logiciel.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge>{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-balance">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3 leading-relaxed">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
