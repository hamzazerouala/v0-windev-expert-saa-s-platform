"use client"

import Link from "next/link"
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Github,
  Award,
  Shield,
  Clock,
  HeadphonesIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="bg-slate-900 border-t border-slate-800 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shrink-0">
                  <span className="text-2xl font-bold text-white">W</span>
                </div>
                <div>
                  <span className="text-xl md:text-2xl font-bold text-white">WindevExpert</span>
                  <p className="text-xs text-slate-400">{t("footer.tagline")}</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 max-w-md">
                {t("footer.description")}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
                    <Award className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs md:text-sm">{t("footer.certified")}</div>
                    <div className="text-xs text-slate-400">{t("footer.certified.iso")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
                    <Shield className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs md:text-sm">{t("footer.secured")}</div>
                    <div className="text-xs text-slate-400">{t("footer.secured.gdpr")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
                    <Clock className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs md:text-sm">{t("footer.support")}</div>
                    <div className="text-xs text-slate-400">{t("footer.support.247")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
                    <HeadphonesIcon className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs md:text-sm">{t("footer.assistance")}</div>
                    <div className="text-xs text-slate-400">{t("footer.assistance.reactive")}</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm font-semibold text-white mb-3">{t("nav.followUs")}</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 text-slate-600"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 text-slate-600"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 text-slate-600"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 text-slate-600"
                  >
                    <Youtube className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 text-slate-600"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 text-slate-600"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm md:text-base">{t("footer.services")}</h3>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.services.webDev")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.services.mobile")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.services.desktop")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.services.ecommerce")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.services.consulting")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.services.maintenance")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.services.audit")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm md:text-base">{t("footer.technologies")}</h3>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.technologies.windev")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.technologies.mobile")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.technologies.wordpress")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.technologies.react")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.technologies.vue")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.technologies.node")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.technologies.ai")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm md:text-base">{t("footer.company")}</h3>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.company.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.company.formations")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/boutique"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.company.shop")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.company.blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.company.contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.company.careers")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    className="text-slate-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {t("footer.company.partners")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs md:text-sm text-slate-400">
              <p>
                &copy; {new Date().getFullYear()} WindevExpert SAS. {t("footer.copyright")}.
              </p>
              <span className="hidden sm:inline text-slate-700">|</span>
              <p className="text-xs">{t("footer.siret")}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <Link href="/mentions-legales" className="text-slate-400 hover:text-cyan-400 transition-colors">
                {t("footer.legal")}
              </Link>
              <Link href="/confidentialite" className="text-slate-400 hover:text-cyan-400 transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="/cgv" className="text-slate-400 hover:text-cyan-400 transition-colors">
                {t("footer.cgv")}
              </Link>
              <Link href="/cgu" className="text-slate-400 hover:text-cyan-400 transition-colors">
                {t("footer.cgu")}
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-cyan-400 transition-colors">
                {t("footer.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
