import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { getBlogPosts } from "@/app/actions/blog"

export default async function BlogPage() {
  const result = await getBlogPosts({ status: "published" })
  const posts = result.success ? result.data : []

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
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun article publié pour le moment.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug || post.id}`}>
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <img
                        src={post.featured_image || "/placeholder.svg?height=200&width=400"}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <Badge>{post.category.name}</Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-balance">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3 leading-relaxed">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>
                              {post.author.first_name} {post.author.last_name}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.published_at || post.created_at).toLocaleDateString("fr-FR")}</span>
                        </div>
                        {post.read_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.read_time} min</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
