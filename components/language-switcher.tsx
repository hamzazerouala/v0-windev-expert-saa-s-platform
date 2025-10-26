"use client"

import { useLanguage } from "@/lib/language-provider"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "ar" as const, label: "AR" },
    { code: "en" as const, label: "EN" },
    { code: "fr" as const, label: "FR" },
  ]

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "ghost"}
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setLanguage(lang.code)}
        >
          <span className="text-xs font-medium">{lang.label}</span>
        </Button>
      ))}
    </div>
  )
}
