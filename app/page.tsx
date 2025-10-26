"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  GraduationCap,
  Headphones,
  Lightbulb,
  CheckCircle2,
  Smartphone,
  Globe,
  Database,
  Users,
  TrendingUp,
  Search,
  Lock,
  Zap,
  Cloud,
  Shield,
  MessageSquare,
  Brain,
  Cpu,
  Sparkles,
  Layout,
  Palette,
  Puzzle,
} from "lucide-react"
import Link from "next/link"
import { QuoteRequestForm } from "@/components/quote-request-form"
import { useLanguage } from "@/lib/language-provider"

export default function HomePage() {
  const [quoteFormOpen, setQuoteFormOpen] = useState(false)
  const [quoteFormType, setQuoteFormType] = useState<"general" | "wordpress">("general")
  const { t } = useLanguage()

  const openQuoteForm = (type: "general" | "wordpress" = "general") => {
    setQuoteFormType(type) // Fixed: changed setQuoteFormFormType to setQuoteFormType
    setQuoteFormOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50 dark:from-slate-900 dark:via-cyan-950/30 dark:to-blue-950 text-slate-900 dark:text-slate-100 py-24 md:py-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.12),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-down">
              {t("hero.title")}
              <br />
              <span className="text-cyan-600 dark:text-cyan-400">{t("hero.subtitle")}</span>
            </h1>
            <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 text-balance leading-relaxed md:text-xl animate-fade-in-up animation-delay-200">
              {t("hero.description")}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in-up animation-delay-400">
              <Link href="#services">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  {t("hero.cta.discover")}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => openQuoteForm("general")}
                className="w-full sm:w-auto border-cyan-600 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950 bg-transparent transition-all duration-300 hover:scale-105"
              >
                {t("hero.cta.quote")}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4 max-w-4xl mx-auto">
            <div className="text-center animate-scale-in animation-delay-500">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 animate-count-up">
                500+
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("hero.stats.clients")}</div>
            </div>
            <div className="text-center animate-scale-in animation-delay-600">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 animate-count-up">
                1000+
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("hero.stats.projects")}</div>
            </div>
            <div className="text-center animate-scale-in animation-delay-700">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 animate-count-up">
                4.9/5
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("hero.stats.rating")}</div>
            </div>
            <div className="text-center animate-scale-in animation-delay-800">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 animate-count-up">
                99.9%
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("hero.stats.uptime")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
              {t("services.title")}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{t("services.subtitle")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110">
                  <Code className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">{t("services.development.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("services.development.description")}
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.development.features.0")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.development.features.1")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.development.features.2")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.development.features.3")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110">
                  <GraduationCap className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">{t("services.training.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("services.training.description")}
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.training.features.0")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.training.features.1")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.training.features.2")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.training.features.3")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110">
                  <Headphones className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">{t("services.support.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("services.support.description")}
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.support.features.0")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.support.features.1")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.support.features.2")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.support.features.3")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-400">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110">
                  <Lightbulb className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">{t("services.consulting.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("services.consulting.description")}
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.consulting.features.0")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.consulting.features.1")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.consulting.features.2")}
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    {t("services.consulting.features.3")}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section 1 */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white animate-fade-in">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">{t("cta.title")}</h2>
            <p className="mt-4 text-lg text-cyan-50 leading-relaxed">{t("cta.description")}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={() => openQuoteForm("general")}
                className="w-full sm:w-auto bg-white text-cyan-600 hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t("cta.button")}
              </Button>
              <Link href="/boutique">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent transition-all duration-300 hover:scale-105"
                >
                  {t("cta.products")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WinDev/PC SOFT Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
              {t("windev.title")}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{t("windev.subtitle")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="border-slate-200 dark:border-slate-700 text-center hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  {t("windev.products.windev.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{t("windev.products.windev.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 text-center hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 mb-4 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Globe className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  {t("windev.products.webdev.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{t("windev.products.webdev.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 text-center hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Smartphone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  {t("windev.products.mobile.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{t("windev.products.mobile.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 text-center hover-lift animate-fade-in-up animation-delay-400">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 mb-4 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Database className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">{t("windev.products.hfsql.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{t("windev.products.hfsql.description")}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover-lift animate-fade-in animation-delay-500">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  <Users className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {t("windev.training.title")}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t("windev.training.description")}
                  </p>
                </div>
                <Link href="/formations">
                  <Button
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-700 shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {t("windev.training.button")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WordPress Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
              {t("wordpress.title")}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{t("wordpress.subtitle")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110 hover:rotate-3">
                  <Layout className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  {t("wordpress.services.sites.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("wordpress.services.sites.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.sites.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.sites.tags.1")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.sites.tags.2")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110 hover:rotate-3">
                  <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  {t("wordpress.services.themes.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("wordpress.services.themes.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.themes.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.themes.tags.1")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.themes.tags.2")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110 hover:rotate-3">
                  <Puzzle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  {t("wordpress.services.plugins.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("wordpress.services.plugins.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.plugins.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.plugins.tags.1")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("wordpress.services.plugins.tags.2")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 dark:border-slate-700 bg-gradient-to-br from-cyan-50/80 to-blue-50/80 dark:from-cyan-950/80 dark:to-blue-950/80 backdrop-blur-sm hover-lift animate-fade-in animation-delay-400">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900 dark:text-slate-100 text-center">
                {t("wordpress.why.title")}
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400 text-center">{t("wordpress.why.subtitle")}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="transition-transform duration-300 hover:translate-x-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 transition-transform duration-300 hover:scale-110">
                      <TrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("wordpress.why.features.0.title")}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t("wordpress.why.features.0.description")}
                  </p>
                </div>
                <div className="transition-transform duration-300 hover:translate-x-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 transition-transform duration-300 hover:scale-110">
                      <Search className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("wordpress.why.features.1.title")}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t("wordpress.why.features.1.description")}
                  </p>
                </div>
                <div className="transition-transform duration-300 hover:translate-x-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 transition-transform duration-300 hover:scale-110">
                      <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("wordpress.why.features.2.title")}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t("wordpress.why.features.2.description")}
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  onClick={() => openQuoteForm("wordpress")}
                  className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {t("wordpress.why.button")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modern Web & Mobile Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
              {t("modern.title")}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{t("modern.subtitle")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">{t("modern.services.web.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("modern.services.web.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("modern.services.web.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("modern.services.web.tags.1")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110">
                  <Smartphone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  {t("modern.services.mobile.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("modern.services.mobile.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("modern.services.mobile.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("modern.services.mobile.tags.1")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110">
                  <Database className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">
                  {t("modern.services.backend.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("modern.services.backend.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("modern.services.backend.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("modern.services.backend.tags.1")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 hover-lift animate-fade-in-up animation-delay-400">
              <CardHeader className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 mb-4 mx-auto transition-transform duration-300 hover:scale-110">
                  <Cloud className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-slate-900 dark:text-slate-100">{t("modern.services.cloud.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t("modern.services.cloud.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("modern.services.cloud.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-transform duration-200 hover:scale-110"
                  >
                    {t("modern.services.cloud.tags.1")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover-lift animate-fade-in animation-delay-500">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">{t("modern.why.title")}</CardTitle>
              <p className="text-slate-600 dark:text-slate-400">{t("modern.why.subtitle")}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 transition-transform duration-300 hover:scale-110">
                      <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("modern.why.features.0.title")}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t("modern.why.features.0.description")}</p>
                </div>
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 transition-transform duration-300 hover:scale-110">
                      <Lock className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("modern.why.features.1.title")}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t("modern.why.features.1.description")}</p>
                </div>
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 transition-transform duration-300 hover:scale-110">
                      <TrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("modern.why.features.2.title")}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t("modern.why.features.2.description")}</p>
                </div>
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 transition-transform duration-300 hover:scale-110">
                      <Shield className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("modern.why.features.3.title")}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t("modern.why.features.3.description")}</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {t("modern.why.button")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI & Innovation Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900/95 via-cyan-900/90 to-slate-900/95 dark:from-slate-950/95 dark:via-cyan-950/90 dark:to-slate-950/95 backdrop-blur-sm text-white dark:text-slate-100 animate-fade-in">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("ai.title")}</h2>
            <p className="mt-4 text-slate-300 dark:text-slate-300 leading-relaxed">{t("ai.subtitle")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-slate-800 dark:bg-slate-900 border-slate-700 hover-lift animate-fade-in-up animation-delay-100">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20 mb-4 transition-all duration-300 hover:scale-110 hover:bg-cyan-500/30">
                  <MessageSquare className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">{t("ai.services.web.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 dark:text-slate-300 leading-relaxed mb-4">
                  {t("ai.services.web.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    {t("ai.services.web.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    {t("ai.services.web.tags.1")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 dark:bg-slate-900 border-slate-700 hover-lift animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 mb-4 transition-all duration-300 hover:scale-110 hover:bg-purple-500/30">
                  <Cpu className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">{t("ai.services.desktop.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 dark:text-slate-300 leading-relaxed mb-4">
                  {t("ai.services.desktop.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    {t("ai.services.desktop.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    {t("ai.services.desktop.tags.1")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 dark:bg-slate-900 border-slate-700 hover-lift animate-fade-in-up animation-delay-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/20 mb-4 transition-all duration-300 hover:scale-110 hover:bg-pink-500/30">
                  <Brain className="h-6 w-6 text-pink-400" />
                </div>
                <CardTitle className="text-white">{t("ai.services.custom.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 dark:text-slate-300 leading-relaxed mb-4">
                  {t("ai.services.custom.description")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-pink-500/20 text-pink-300 border-pink-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    {t("ai.services.custom.tags.0")}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-pink-500/20 text-pink-300 border-pink-500/30 transition-transform duration-200 hover:scale-110"
                  >
                    {t("ai.services.custom.tags.1")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center animate-fade-in animation-delay-400">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {t("ai.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <QuoteRequestForm open={quoteFormOpen} onOpenChange={setQuoteFormOpen} type={quoteFormType} />
    </div>
  )
}
