"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

interface QuoteRequestFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: "general" | "wordpress"
}

export function QuoteRequestForm({ open, onOpenChange, type = "general" }: QuoteRequestFormProps) {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState<"DZD" | "EUR" | "USD">("EUR")

  const [formData, setFormData] = useState({
    projectType: "",
    services: [] as string[],
    budget: "",
    currency: "EUR" as "DZD" | "EUR" | "USD",
    timeline: "",
    features: [] as string[],
    name: "",
    email: "",
    phone: "",
    company: "",
    description: "",
  })

  const totalSteps = 4

  const projectTypes =
    type === "wordpress"
      ? [
          {
            value: "site-vitrine",
            label: t("quote.projectTypes.showcase"),
            description: t("quote.projectTypes.showcaseDesc"),
          },
          {
            value: "e-commerce",
            label: t("quote.projectTypes.ecommerce"),
            description: t("quote.projectTypes.ecommerceDesc"),
          },
          { value: "blog", label: t("quote.projectTypes.blog"), description: t("quote.projectTypes.blogDesc") },
          { value: "custom", label: t("quote.projectTypes.custom"), description: t("quote.projectTypes.customDesc") },
        ]
      : [
          { value: "web", label: t("quote.projectTypes.web"), description: t("quote.projectTypes.webDesc") },
          { value: "mobile", label: t("quote.projectTypes.mobile"), description: t("quote.projectTypes.mobileDesc") },
          {
            value: "desktop",
            label: t("quote.projectTypes.desktop"),
            description: t("quote.projectTypes.desktopDesc"),
          },
          { value: "saas", label: t("quote.projectTypes.saas"), description: t("quote.projectTypes.saasDesc") },
          {
            value: "ecommerce",
            label: t("quote.projectTypes.ecommerce"),
            description: t("quote.projectTypes.ecommerceDesc"),
          },
          {
            value: "wordpress",
            label: t("quote.projectTypes.wordpress"),
            description: t("quote.projectTypes.wordpressDesc"),
          },
        ]

  const services =
    type === "wordpress"
      ? [
          t("quote.services.customTheme"),
          t("quote.services.customPlugins"),
          t("quote.services.migration"),
          t("quote.services.seo"),
          t("quote.services.maintenance"),
          t("quote.services.training"),
          t("quote.services.hosting"),
          t("quote.services.security"),
        ]
      : [
          t("quote.services.development"),
          t("quote.services.design"),
          t("quote.services.apiIntegration"),
          t("quote.services.database"),
          t("quote.services.authentication"),
          t("quote.services.payment"),
          t("quote.services.hosting"),
          t("quote.services.maintenance"),
          t("quote.services.training"),
          t("quote.services.consulting"),
        ]

  const features =
    type === "wordpress"
      ? [
          t("quote.features.multilingual"),
          t("quote.features.woocommerce"),
          t("quote.features.memberArea"),
          t("quote.features.advancedForms"),
          t("quote.features.photoGallery"),
          t("quote.features.onlineBooking"),
          t("quote.features.newsletter"),
          t("quote.features.liveChat"),
        ]
      : [
          t("quote.features.adminDashboard"),
          t("quote.features.userManagement"),
          t("quote.features.pushNotifications"),
          t("quote.features.realtimeChat"),
          t("quote.features.securePayment"),
          t("quote.features.dataExport"),
          t("quote.features.restApi"),
          t("quote.features.ai"),
        ]

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        const countryCode = data.country_code

        if (countryCode === "DZ") {
          setCurrency("DZD")
          updateFormData("currency", "DZD")
        } else if (["FR", "DE", "IT", "ES", "BE", "NL"].includes(countryCode)) {
          setCurrency("EUR")
          updateFormData("currency", "EUR")
        } else {
          setCurrency("USD")
          updateFormData("currency", "USD")
        }
      } catch (error) {
        console.log("[v0] Currency detection failed, using EUR as default")
      }
    }

    if (open) {
      detectCurrency()
    }
  }, [open])

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    setStep(totalSteps)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: "services" | "features", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const getBudgetRanges = () => {
    const ranges = {
      DZD: [
        { value: "<500k", label: t("quote.budget.dzd.range1") },
        { value: "500k-1m", label: t("quote.budget.dzd.range2") },
        { value: "1m-2.5m", label: t("quote.budget.dzd.range3") },
        { value: "2.5m-5m", label: t("quote.budget.dzd.range4") },
        { value: ">5m", label: t("quote.budget.dzd.range5") },
        { value: "flexible", label: t("quote.budget.flexible") },
      ],
      EUR: [
        { value: "<5k", label: t("quote.budget.eur.range1") },
        { value: "5k-10k", label: t("quote.budget.eur.range2") },
        { value: "10k-25k", label: t("quote.budget.eur.range3") },
        { value: "25k-50k", label: t("quote.budget.eur.range4") },
        { value: ">50k", label: t("quote.budget.eur.range5") },
        { value: "flexible", label: t("quote.budget.flexible") },
      ],
      USD: [
        { value: "<5k", label: t("quote.budget.usd.range1") },
        { value: "5k-10k", label: t("quote.budget.usd.range2") },
        { value: "10k-25k", label: t("quote.budget.usd.range3") },
        { value: "25k-50k", label: t("quote.budget.usd.range4") },
        { value: ">50k", label: t("quote.budget.usd.range5") },
        { value: "flexible", label: t("quote.budget.flexible") },
      ],
    }
    return ranges[formData.currency]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {type === "wordpress" ? t("quote.titleWordpress") : t("quote.titleGeneral")}
          </DialogTitle>
          <DialogDescription>{t("quote.description")}</DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        {step < totalSteps && (
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps - 1 }).map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      i + 1 <= step ? "bg-cyan-600 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {i + 1 < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  {i < totalSteps - 2 && (
                    <div className={`h-1 flex-1 mx-2 ${i + 1 < step ? "bg-cyan-600" : "bg-slate-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>{t("quote.steps.projectType")}</span>
              <span>{t("quote.steps.details")}</span>
              <span>{t("quote.steps.info")}</span>
            </div>
          </div>
        )}

        {/* Step 1: Type de projet */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">{t("quote.step1.question")}</Label>
              <RadioGroup value={formData.projectType} onValueChange={(value) => updateFormData("projectType", value)}>
                <div className="grid gap-3">
                  {projectTypes.map((type) => (
                    <Label
                      key={type.value}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.projectType === type.value
                          ? "border-cyan-600 bg-cyan-50"
                          : "border-slate-200 hover:border-cyan-300"
                      }`}
                    >
                      <RadioGroupItem value={type.value} className="mt-1" />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">{type.label}</div>
                        <div className="text-sm text-slate-600">{type.description}</div>
                      </div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">{t("quote.step1.servicesQuestion")}</Label>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <Label
                    key={service}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.services.includes(service)
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-slate-200 hover:border-cyan-300"
                    }`}
                  >
                    <Checkbox
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => toggleArrayItem("services", service)}
                    />
                    <span className="text-sm">{service}</span>
                  </Label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Détails techniques */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">{t("quote.step2.currency")}</Label>
              <div className="flex gap-2">
                {(["DZD", "EUR", "USD"] as const).map((curr) => (
                  <Button
                    key={curr}
                    type="button"
                    variant={formData.currency === curr ? "default" : "outline"}
                    onClick={() => {
                      setCurrency(curr)
                      updateFormData("currency", curr)
                      updateFormData("budget", "")
                    }}
                    className={formData.currency === curr ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                  >
                    {curr}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">{t("quote.step2.budget")}</Label>
              <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("quote.step2.budgetPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {getBudgetRanges().map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">{t("quote.step2.timeline")}</Label>
              <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("quote.step2.timelinePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">{t("quote.timeline.urgent")}</SelectItem>
                  <SelectItem value="1-3months">{t("quote.timeline.oneToThree")}</SelectItem>
                  <SelectItem value="3-6months">{t("quote.timeline.threeToSix")}</SelectItem>
                  <SelectItem value=">6months">{t("quote.timeline.moreThanSix")}</SelectItem>
                  <SelectItem value="flexible">{t("quote.timeline.flexible")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">{t("quote.step2.features")}</Label>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                  <Label
                    key={feature}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.features.includes(feature)
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-slate-200 hover:border-cyan-300"
                    }`}
                  >
                    <Checkbox
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => toggleArrayItem("features", feature)}
                    />
                    <span className="text-sm">{feature}</span>
                  </Label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Informations client */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t("quote.step3.name")}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder={t("quote.step3.namePlaceholder")}
                />
              </div>
              <div>
                <Label htmlFor="company">{t("quote.step3.company")}</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData("company", e.target.value)}
                  placeholder={t("quote.step3.companyPlaceholder")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">{t("quote.step3.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder={t("quote.step3.emailPlaceholder")}
                />
              </div>
              <div>
                <Label htmlFor="phone">{t("quote.step3.phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder={t("quote.step3.phonePlaceholder")}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">{t("quote.step3.description")}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder={t("quote.step3.descriptionPlaceholder")}
                rows={6}
              />
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === totalSteps && (
          <div className="text-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("quote.success.title")}</h3>
            <p className="text-slate-600 mb-6">{t("quote.success.message")}</p>
            <Button onClick={() => onOpenChange(false)} className="bg-cyan-600 hover:bg-cyan-700">
              {t("quote.success.close")}
            </Button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < totalSteps && (
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("quote.navigation.previous")}
            </Button>
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.projectType) || (step === 2 && (!formData.budget || !formData.timeline))
                }
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {t("quote.navigation.next")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.phone || loading}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("quote.navigation.sending")}
                  </>
                ) : (
                  <>
                    {t("quote.navigation.submit")}
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
