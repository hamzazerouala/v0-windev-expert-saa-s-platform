export function PrivateFooter() {
  return (
    <footer className="border-t bg-background py-6 mt-auto">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} WindevExpert. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
