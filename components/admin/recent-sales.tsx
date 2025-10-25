import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  const sales = [
    {
      name: "Jean Dupont",
      email: "jean.dupont@exemple.com",
      amount: 299,
    },
    {
      name: "Marie Martin",
      email: "marie.martin@exemple.com",
      amount: 149,
    },
    {
      name: "Pierre Dubois",
      email: "pierre.dubois@exemple.com",
      amount: 750,
    },
    {
      name: "Sophie Bernard",
      email: "sophie.bernard@exemple.com",
      amount: 199,
    },
    {
      name: "Luc Petit",
      email: "luc.petit@exemple.com",
      amount: 399,
    },
  ]

  return (
    <div className="space-y-8">
      {sales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt={sale.name} />
            <AvatarFallback>
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">+{sale.amount}€</div>
        </div>
      ))}
    </div>
  )
}
