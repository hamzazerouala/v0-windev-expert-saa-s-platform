import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserPlus, MoreHorizontal } from "lucide-react"

export default function AdminUsersPage() {
  // Mock data - in production this would come from a database
  const users = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@exemple.com",
      role: "Client",
      status: "Actif",
      joinDate: "15 Mars 2024",
      purchases: 5,
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie.martin@exemple.com",
      role: "Client",
      status: "Actif",
      joinDate: "10 Mars 2024",
      purchases: 3,
    },
    {
      id: 3,
      name: "Pierre Dubois",
      email: "pierre.dubois@exemple.com",
      role: "Admin",
      status: "Actif",
      joinDate: "1 Janvier 2024",
      purchases: 0,
    },
    {
      id: 4,
      name: "Sophie Bernard",
      email: "sophie.bernard@exemple.com",
      role: "Client",
      status: "Inactif",
      joinDate: "5 Février 2024",
      purchases: 1,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les utilisateurs de la plateforme</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des utilisateurs</CardTitle>
              <CardDescription>{users.length} utilisateurs enregistrés</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d&apos;inscription</TableHead>
                <TableHead>Achats</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Actif" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.purchases}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
