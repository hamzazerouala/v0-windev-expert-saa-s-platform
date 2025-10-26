"use client"

import * as React from "react"
import { translations, type Language } from "./translations"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const initialState: LanguageProviderState = {
  language: "fr",
  setLanguage: () => null,
  t: (key: string) => key,
}

const LanguageProviderContext = React.createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "fr",
  storageKey = "windevexpert-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = React.useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as Language) || defaultLanguage
    }
    return defaultLanguage
  })

  React.useEffect(() => {
    const root = window.document.documentElement

    root.setAttribute("lang", language)
    root.setAttribute("dir", language === "ar" ? "rtl" : "ltr")

    if (language === "ar") {
      root.classList.add("font-arabic")
    } else {
      root.classList.remove("font-arabic")
    }
  }, [language])

  const t = React.useCallback(
    (key: string): string => {
      return translations[language][key] || key
    },
    [language],
  )

  const value = {
    language,
    setLanguage: (lang: Language) => {
      localStorage.setItem(storageKey, lang)
      setLanguage(lang)
    },
    t,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = React.useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
