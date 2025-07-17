"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/breadcrumbsPerfil"
import {
  Scale,
  FileText,
  Home,
  Briefcase,
  Users,
  Shield,
  Building,
  Heart,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react"
import { toast } from "sonner"

interface LegalService {
  id: string
  name: string
  description: string
  detailedDescription: string
  basePrice: number
  duration: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  rating: number
  completedCases: number
  features: string[]
}

const legalServices: LegalService[] = [
  {
    id: "consulta-general",
    name: "Consulta Legal General",
    description: "Asesoría legal básica para resolver dudas y orientación jurídica inicial.",
    detailedDescription:
      "Consulta personalizada con abogado especializado para resolver dudas legales, análisis preliminar de documentos y orientación sobre procedimientos legales.",
    basePrice: 150,
    duration: "1-2 horas",
    icon: Scale,
    category: "Consultoría",
    rating: 4.8,
    completedCases: 245,
    features: ["Consulta personalizada", "Análisis de documentos", "Orientación jurídica", "Seguimiento por email"],
  },
  {
    id: "derecho-civil",
    name: "Derecho Civil",
    description: "Contratos, responsabilidad civil, daños y perjuicios, y disputas civiles.",
    detailedDescription:
      "Representación legal en casos civiles, redacción de contratos, demandas por daños y perjuicios, y resolución de conflictos entre particulares.",
    basePrice: 300,
    duration: "2-4 semanas",
    icon: FileText,
    category: "Litigio",
    rating: 4.9,
    completedCases: 189,
    features: ["Redacción de contratos", "Representación en juicios", "Mediación", "Asesoría especializada"],
  },
  {
    id: "derecho-inmobiliario",
    name: "Derecho Inmobiliario",
    description: "Compraventa, arrendamientos, hipotecas y disputas de propiedad.",
    detailedDescription:
      "Asesoría completa en transacciones inmobiliarias, revisión de contratos de compraventa, gestión de hipotecas y resolución de conflictos de propiedad.",
    basePrice: 250,
    duration: "1-3 semanas",
    icon: Home,
    category: "Inmobiliario",
    rating: 4.7,
    completedCases: 156,
    features: ["Revisión de contratos", "Due diligence", "Gestión de escrituras", "Resolución de conflictos"],
  },
  {
    id: "derecho-laboral",
    name: "Derecho Laboral",
    description: "Despidos, acoso laboral, contratos de trabajo y derechos del trabajador.",
    detailedDescription:
      "Defensa de derechos laborales, representación en despidos improcedentes, asesoría en contratos laborales y casos de acoso en el trabajo.",
    basePrice: 200,
    duration: "2-6 semanas",
    icon: Briefcase,
    category: "Laboral",
    rating: 4.6,
    completedCases: 203,
    features: ["Defensa en despidos", "Contratos laborales", "Mediación laboral", "Cálculo de indemnizaciones"],
  },
  {
    id: "derecho-familiar",
    name: "Derecho de Familia",
    description: "Divorcios, custodia, pensión alimenticia y adopciones.",
    detailedDescription:
      "Asesoría integral en derecho de familia, procesos de divorcio, custodia de menores, pensiones alimenticias y procedimientos de adopción.",
    basePrice: 350,
    duration: "1-6 meses",
    icon: Users,
    category: "Familia",
    rating: 4.9,
    completedCases: 134,
    features: ["Procesos de divorcio", "Custodia de menores", "Pensiones alimenticias", "Mediación familiar"],
  },
  {
    id: "derecho-penal",
    name: "Derecho Penal",
    description: "Defensa penal, delitos menores y mayores, y representación en juicios.",
    detailedDescription:
      "Defensa penal especializada, representación en delitos menores y mayores, asesoría en procedimientos penales y protección de derechos del imputado.",
    basePrice: 500,
    duration: "2-12 meses",
    icon: Shield,
    category: "Penal",
    rating: 4.8,
    completedCases: 98,
    features: ["Defensa penal", "Representación en juicios", "Asesoría procesal", "Protección de derechos"],
  },
  {
    id: "derecho-empresarial",
    name: "Derecho Empresarial",
    description: "Constitución de empresas, contratos comerciales y asesoría corporativa.",
    detailedDescription:
      "Asesoría integral para empresas, constitución de sociedades, redacción de contratos comerciales, compliance y restructuración empresarial.",
    basePrice: 400,
    duration: "1-8 semanas",
    icon: Building,
    category: "Empresarial",
    rating: 4.7,
    completedCases: 167,
    features: ["Constitución de empresas", "Contratos comerciales", "Compliance", "Asesoría corporativa"],
  },
  {
    id: "derecho-salud",
    name: "Derecho Sanitario",
    description: "Negligencia médica, derechos del paciente y responsabilidad sanitaria.",
    detailedDescription:
      "Especialización en casos de negligencia médica, defensa de derechos del paciente, responsabilidad sanitaria y mala praxis profesional.",
    basePrice: 450,
    duration: "3-18 meses",
    icon: Heart,
    category: "Sanitario",
    rating: 4.5,
    completedCases: 76,
    features: ["Casos de negligencia", "Derechos del paciente", "Peritajes médicos", "Indemnizaciones"],
  },
]

export default function ContratarPage() {
  const [selectedService, setSelectedService] = useState<LegalService | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    caseDescription: "",
    urgency: "normal",
    contactPreference: "email",
    additionalNotes: "",
  })

  const handleContractService = (service: LegalService) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.caseDescription.trim()) {
      toast.error("Error", {
        description: "Por favor, describe tu caso antes de enviar la solicitud.",
      })
      return
    }

    setIsSubmitting(true)

    // Simular envío de solicitud
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("¡Solicitud enviada exitosamente!", {
      description: `Tu solicitud para ${selectedService?.name} ha sido recibida. Te contactaremos pronto.`,
    })

    setIsSubmitting(false)
    setIsModalOpen(false)
    setFormData({
      caseDescription: "",
      urgency: "normal",
      contactPreference: "email",
      additionalNotes: "",
    })
    setSelectedService(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
    setFormData({
      caseDescription: "",
      urgency: "normal",
      contactPreference: "email",
      additionalNotes: "",
    })
  }

  return (
    <div className="space-y-8 p-6">
      <Breadcrumbs />

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contratar Servicios Legales</h1>
        <p className="text-muted-foreground">
          Selecciona el servicio legal que necesitas y describe tu caso para recibir asesoría especializada.
        </p>
      </div>

      {/* Servicios disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legalServices.map((service) => {
          const IconComponent = service.icon

          return (
            <Card key={service.id} className="flex flex-col hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-xs mb-2">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Precio base:</span>
                    <span className="font-semibold text-lg">${service.basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duración:</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {service.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Valoración:</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {service.rating} ({service.completedCases} casos)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Incluye:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Button onClick={() => handleContractService(service)} className="w-full" size="lg">
                  Contratar Servicio
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Modal para descripción del caso */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedService && <selectedService.icon className="h-5 w-5" />}
              Contratar: {selectedService?.name}
            </DialogTitle>
            <DialogDescription className="text-left">{selectedService?.detailedDescription}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitRequest} className="space-y-6">
            <div className="space-y-4">
              {/* Descripción del caso */}
              <div className="space-y-2">
                <Label htmlFor="caseDescription" className="text-sm font-medium">
                  Describe tu caso <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="caseDescription"
                  placeholder="Proporciona todos los detalles relevantes sobre tu situación legal. Incluye fechas, personas involucradas, documentos disponibles y cualquier información que consideres importante..."
                  value={formData.caseDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, caseDescription: e.target.value }))}
                  className="min-h-[120px] resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Mínimo 50 caracteres. Cuanta más información proporciones, mejor podremos ayudarte.
                </p>
              </div>

              {/* Urgencia */}
              <div className="space-y-2">
                <Label htmlFor="urgency" className="text-sm font-medium">
                  Nivel de urgencia
                </Label>
                <select
                  id="urgency"
                  value={formData.urgency}
                  onChange={(e) => setFormData((prev) => ({ ...prev, urgency: e.target.value }))}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="low">Baja - Puedo esperar varias semanas</option>
                  <option value="normal">Normal - Necesito respuesta en días</option>
                  <option value="high">Alta - Es urgente, necesito ayuda pronto</option>
                  <option value="critical">Crítica - Es una emergencia legal</option>
                </select>
              </div>

              {/* Preferencia de contacto */}
              <div className="space-y-2">
                <Label htmlFor="contactPreference" className="text-sm font-medium">
                  Preferencia de contacto
                </Label>
                <select
                  id="contactPreference"
                  value={formData.contactPreference}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactPreference: e.target.value }))}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="email">Email</option>
                  <option value="phone">Teléfono</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="videocall">Videollamada</option>
                </select>
              </div>

              {/* Notas adicionales */}
              <div className="space-y-2">
                <Label htmlFor="additionalNotes" className="text-sm font-medium">
                  Notas adicionales (opcional)
                </Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="¿Hay algo más que debamos saber? Horarios preferidos, restricciones, documentos que tienes disponibles, etc."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>

            {/* Resumen del servicio */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Resumen del servicio:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Precio base:</span>
                  <span className="ml-2 font-medium">${selectedService?.basePrice}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duración estimada:</span>
                  <span className="ml-2 font-medium">{selectedService?.duration}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                * El precio final puede variar según la complejidad del caso. Te proporcionaremos un presupuesto
                detallado después de la evaluación inicial.
              </p>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-transparent"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.caseDescription.trim()}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Enviando solicitud...
                  </>
                ) : (
                  "Enviar Solicitud"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
