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

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 w-full">
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
                  <span className="text-xl md:text-2xl font-bold text-slate-900">WindevExpert</span>
                  <p className="text-xs text-slate-500">Excellence en Développement</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 max-w-md">
                Leader français du développement d'applications sur mesure, de la formation technique avancée et du
                consulting IT. Nous accompagnons les entreprises dans leur transformation digitale depuis plus de 10
                ans.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
                    <Award className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-xs md:text-sm">Certifié</div>
                    <div className="text-xs text-slate-500">ISO 9001</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
                    <Shield className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-xs md:text-sm">Sécurisé</div>
                    <div className="text-xs text-slate-500">RGPD</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
                    <Clock className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-xs md:text-sm">Support</div>
                    <div className="text-xs text-slate-500">24/7</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 shrink-0">
                    <HeadphonesIcon className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-xs md:text-sm">Assistance</div>
                    <div className="text-xs text-slate-500">Réactive</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-3">Suivez-nous</p>
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
              <h3 className="font-bold text-slate-900 mb-4 text-sm md:text-base">Services</h3>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li>
                  <Link
                    href="/services"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Développement Web
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Applications Mobile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Solutions Desktop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    E-commerce
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Consulting IT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Maintenance & Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Audit Technique
                  </Link>
                </li>
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4 text-sm md:text-base">Technologies</h3>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    WinDev / WebDev
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    WinDev Mobile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    WordPress
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    React / Next.js
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Vue.js / Nuxt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Node.js / Python
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Intelligence Artificielle
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4 text-sm md:text-base">Entreprise</h3>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Formations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/boutique"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Boutique
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    className="text-slate-600 hover:text-cyan-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    Partenaires
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs md:text-sm text-slate-600">
              <p>&copy; {new Date().getFullYear()} WindevExpert SAS. Tous droits réservés.</p>
              <span className="hidden sm:inline text-slate-300">|</span>
              <p className="text-xs">SIRET: 123 456 789 00012 - RCS Paris</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <Link href="/mentions-legales" className="text-slate-600 hover:text-cyan-600 transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-slate-600 hover:text-cyan-600 transition-colors">
                Confidentialité
              </Link>
              <Link href="/cgv" className="text-slate-600 hover:text-cyan-600 transition-colors">
                CGV
              </Link>
              <Link href="/cgu" className="text-slate-600 hover:text-cyan-600 transition-colors">
                CGU
              </Link>
              <Link href="/cookies" className="text-slate-600 hover:text-cyan-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
