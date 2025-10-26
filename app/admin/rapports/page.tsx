import { Calendar } from "@/components/ui/calendar"
import {
  DollarSign,
  Users,
  FolderKanban,
  GraduationCap,
  TrendingUp,
  CreditCard,
  FileText,
  Receipt,
  RefreshCw,
  UserPlus,
  Target,
  Activity,
  Star,
  Package,
  Database,
  Download,
  ShoppingCart,
  CheckCircle,
  BarChart,
  Award,
  AlertTriangle,
  CheckSquare,
  Zap,
  AlertCircle,
  Gauge,
  Shield,
  HardDrive,
  FileDown,
  Settings,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function RapportsPage() {
  return (
    <div className="max-w-full overflow-hidden p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rapports & Analyses</h1>
          <p className="text-muted-foreground">Générez et consultez tous les rapports de la plateforme</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CA Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450,000 DZD</div>
            <p className="text-xs text-muted-foreground">+12% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+23 ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets en Cours</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">12 en retard</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formations Actives</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">89% taux complétion</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <Tabs defaultValue="financier" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="financier">Financier</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="produits">Produits</TabsTrigger>
          <TabsTrigger value="formations">Formations</TabsTrigger>
          <TabsTrigger value="projets">Projets</TabsTrigger>
          <TabsTrigger value="technique">Technique</TabsTrigger>
        </TabsList>

        {/* Financial Reports */}
        <TabsContent value="financier" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports Financiers</CardTitle>
              <CardDescription>Analyses des ventes, revenus et paiements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ReportCard
                  icon={TrendingUp}
                  title="Chiffre d'Affaires"
                  description="CA par période, produit, région"
                  metrics={["Mensuel", "Trimestriel", "Annuel"]}
                />
                <ReportCard
                  icon={DollarSign}
                  title="Revenus Récurrents"
                  description="MRR, ARR, abonnements"
                  metrics={["MRR", "ARR", "Croissance"]}
                />
                <ReportCard
                  icon={CreditCard}
                  title="Paiements"
                  description="Statut des paiements par méthode"
                  metrics={["Payés", "En attente", "Échoués"]}
                />
                <ReportCard
                  icon={FileText}
                  title="Factures"
                  description="Facturation et encaissements"
                  metrics={["Émises", "Payées", "Impayées"]}
                />
                <ReportCard
                  icon={Receipt}
                  title="Taxes & TVA"
                  description="Déclarations fiscales par région"
                  metrics={["DZD", "EUR", "USD"]}
                />
                <ReportCard
                  icon={RefreshCw}
                  title="Remboursements"
                  description="Demandes et traitements"
                  metrics={["En cours", "Traités", "Refusés"]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Reports */}
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports Clients</CardTitle>
              <CardDescription>Analyses d'acquisition, rétention et satisfaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ReportCard
                  icon={UserPlus}
                  title="Acquisition"
                  description="Nouveaux clients par source"
                  metrics={["Par mois", "Par source", "Coût"]}
                />
                <ReportCard
                  icon={Users}
                  title="Rétention & Churn"
                  description="Taux de fidélisation"
                  metrics={["Rétention", "Churn", "Tendances"]}
                />
                <ReportCard
                  icon={TrendingUp}
                  title="Valeur Client (LTV)"
                  description="Lifetime value par segment"
                  metrics={["LTV", "CAC", "Ratio"]}
                />
                <ReportCard
                  icon={Target}
                  title="Segmentation"
                  description="Clients par catégorie"
                  metrics={["Segments", "Comportement", "Valeur"]}
                />
                <ReportCard
                  icon={Activity}
                  title="Utilisateurs Actifs"
                  description="DAU, WAU, MAU"
                  metrics={["Quotidien", "Hebdo", "Mensuel"]}
                />
                <ReportCard
                  icon={Star}
                  title="Satisfaction"
                  description="NPS, avis et feedback"
                  metrics={["NPS", "Avis", "Support"]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Reports */}
        <TabsContent value="produits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports Produits</CardTitle>
              <CardDescription>Performance et statistiques des produits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ReportCard
                  icon={Package}
                  title="Performance Produits"
                  description="Meilleures ventes et tendances"
                  metrics={["Top ventes", "Revenus", "Marges"]}
                />
                <ReportCard
                  icon={Database}
                  title="Inventaire & Licences"
                  description="Stock et licences disponibles"
                  metrics={["Stock", "Licences", "Alertes"]}
                />
                <ReportCard
                  icon={Download}
                  title="Téléchargements"
                  description="Statistiques de téléchargement"
                  metrics={["Total", "Par produit", "Tendances"]}
                />
                <ReportCard
                  icon={Star}
                  title="Avis & Notes"
                  description="Évaluations clients"
                  metrics={["Moyenne", "Distribution", "Commentaires"]}
                />
                <ReportCard
                  icon={ShoppingCart}
                  title="Paniers Abandonnés"
                  description="Analyse des abandons"
                  metrics={["Taux", "Valeur", "Récupération"]}
                />
                <ReportCard
                  icon={TrendingUp}
                  title="Cross-sell & Up-sell"
                  description="Ventes additionnelles"
                  metrics={["Taux", "Revenus", "Produits"]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formation Reports */}
        <TabsContent value="formations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports Formations</CardTitle>
              <CardDescription>Analyses LMS et performance pédagogique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ReportCard
                  icon={GraduationCap}
                  title="Inscriptions"
                  description="Nouvelles inscriptions par formation"
                  metrics={["Total", "Par formation", "Tendances"]}
                />
                <ReportCard
                  icon={CheckCircle}
                  title="Taux de Complétion"
                  description="Progression et achèvement"
                  metrics={["Complétion", "Abandon", "Durée"]}
                />
                <ReportCard
                  icon={BarChart}
                  title="Progression Étudiants"
                  description="Suivi individuel et collectif"
                  metrics={["Avancement", "Temps", "Résultats"]}
                />
                <ReportCard
                  icon={Award}
                  title="Certificats"
                  description="Délivrance et validation"
                  metrics={["Émis", "Par formation", "Taux"]}
                />
                <ReportCard
                  icon={TrendingUp}
                  title="Performance Cours"
                  description="Cours les plus populaires"
                  metrics={["Inscriptions", "Revenus", "Notes"]}
                />
                <ReportCard
                  icon={Users}
                  title="Performance Formateurs"
                  description="Évaluation des instructeurs"
                  metrics={["Étudiants", "Satisfaction", "Revenus"]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Reports */}
        <TabsContent value="projets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports Projets</CardTitle>
              <CardDescription>Suivi et performance des projets clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ReportCard
                  icon={FolderKanban}
                  title="Vue d'Ensemble"
                  description="Statut global des projets"
                  metrics={["Actifs", "Terminés", "En retard"]}
                />
                <ReportCard
                  icon={AlertTriangle}
                  title="Retards & Alertes"
                  description="Projets en difficulté"
                  metrics={["Retards", "Risques", "Bloqués"]}
                />
                <ReportCard
                  icon={CheckSquare}
                  title="Tâches"
                  description="Complétion et productivité"
                  metrics={["Terminées", "En cours", "Taux"]}
                />
                <ReportCard
                  icon={DollarSign}
                  title="Rentabilité"
                  description="Marges et profitabilité"
                  metrics={["Budget", "Coûts", "Marge"]}
                />
                <ReportCard
                  icon={Users}
                  title="Ressources"
                  description="Allocation et charge"
                  metrics={["Équipe", "Charge", "Disponibilité"]}
                />
                <ReportCard
                  icon={Star}
                  title="Satisfaction Client"
                  description="Feedback et validations"
                  metrics={["NPS", "Validations", "Retours"]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Reports */}
        <TabsContent value="technique" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports Techniques</CardTitle>
              <CardDescription>Métriques système et performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ReportCard
                  icon={Activity}
                  title="Utilisation Système"
                  description="Trafic et sessions"
                  metrics={["Visites", "Sessions", "Pages vues"]}
                />
                <ReportCard
                  icon={Zap}
                  title="Utilisation API"
                  description="Appels et quotas"
                  metrics={["Appels", "Quotas", "Erreurs"]}
                />
                <ReportCard
                  icon={AlertCircle}
                  title="Logs d'Erreurs"
                  description="Erreurs et incidents"
                  metrics={["Erreurs", "Critiques", "Résolues"]}
                />
                <ReportCard
                  icon={Gauge}
                  title="Performance"
                  description="Temps de réponse et uptime"
                  metrics={["Uptime", "Latence", "Vitesse"]}
                />
                <ReportCard
                  icon={Shield}
                  title="Sécurité"
                  description="Tentatives et menaces"
                  metrics={["Connexions", "Blocages", "Alertes"]}
                />
                <ReportCard
                  icon={HardDrive}
                  title="Stockage"
                  description="Utilisation espace et bande passante"
                  metrics={["Espace", "Bande passante", "Coûts"]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Generation Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Outils de Génération</CardTitle>
          <CardDescription>Créez des rapports personnalisés et planifiez des exports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto flex-col items-start p-4 bg-transparent">
              <FileDown className="h-5 w-5 mb-2" />
              <div className="text-left">
                <div className="font-semibold">Export Personnalisé</div>
                <div className="text-sm text-muted-foreground">Créez un rapport sur mesure</div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start p-4 bg-transparent">
              <Calendar className="h-5 w-5 mb-2" />
              <div className="text-left">
                <div className="font-semibold">Rapports Planifiés</div>
                <div className="text-sm text-muted-foreground">Automatisez vos exports</div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start p-4 bg-transparent">
              <Settings className="h-5 w-5 mb-2" />
              <div className="text-left">
                <div className="font-semibold">Constructeur</div>
                <div className="text-sm text-muted-foreground">Créez vos propres rapports</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ReportCard({
  icon: Icon,
  title,
  description,
  metrics,
}: {
  icon: any
  title: string
  description: string
  metrics: string[]
}) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Icon className="h-5 w-5 text-cyan-600" />
          <Button size="sm" variant="ghost">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {metrics.map((metric) => (
            <Badge key={metric} variant="secondary" className="text-xs">
              {metric}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
