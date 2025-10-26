import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { AuthProvider } from "@/lib/auth/auth-context"
import { ConditionalLayout } from "@/components/conditional-layout"
import { ThemeProvider } from "@/lib/theme-provider"
import { LanguageProvider } from "@/lib/language-provider"

import { Inter, Geist_Mono, Cairo, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "WindevExpert - Solutions Logicielles & Formation",
  description: "Plateforme SaaS pour services de développement, formations en ligne et produits numériques",
  generator: "WindevExpert",
  keywords: ["développement logiciel", "formation", "windev", "webdev", "windev mobile"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} ${cairo.variable} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="windevexpert-theme">
          <LanguageProvider defaultLanguage="fr" storageKey="windevexpert-language">
            <AuthProvider>
              <ConditionalLayout>{children}</ConditionalLayout>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
