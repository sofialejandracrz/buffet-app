import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Heart,
  Gavel,
  Briefcase,
  Shield,
  Home,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  Scale,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      title: "Derecho Corporativo",
      description: "Asesoría integral para empresas de todos los tamaños",
      features: [
        "Constitución de sociedades",
        "Contratos comerciales",
        "Fusiones y adquisiciones",
        "Gobierno corporativo",
        "Compliance empresarial",
        "Reestructuraciones",
      ],
      price: "Desde $500/hora",
      popular: true,
    },
    {
      icon: Heart,
      title: "Derecho de Familia",
      description: "Soluciones sensibles para asuntos familiares",
      features: [
        "Divorcios y separaciones",
        "Custodia de menores",
        "Pensión alimenticia",
        "Adopciones",
        "Mediación familiar",
        "Acuerdos prenupciales",
      ],
      price: "Desde $300/hora",
    },
    {
      icon: Gavel,
      title: "Litigios Civiles",
      description: "Representación experta en disputas civiles",
      features: [
        "Disputas contractuales",
        "Responsabilidad civil",
        "Daños y perjuicios",
        "Disputas comerciales",
        "Mediación y arbitraje",
        "Apelaciones",
      ],
      price: "Desde $400/hora",
    },
    {
      icon: Briefcase,
      title: "Derecho Laboral",
      description: "Protección de derechos laborales",
      features: [
        "Despidos injustificados",
        "Discriminación laboral",
        "Acoso en el trabajo",
        "Negociación colectiva",
        "Contratos laborales",
        "Seguridad social",
      ],
      price: "Desde $350/hora",
    },
    {
      icon: Shield,
      title: "Derecho Penal",
      description: "Defensa criminal especializada",
      features: [
        "Delitos económicos",
        "Defensa penal",
        "Delitos contra la propiedad",
        "Violencia doméstica",
        "Tráfico de drogas",
        "Apelaciones penales",
      ],
      price: "Desde $450/hora",
    },
    {
      icon: Home,
      title: "Derecho Inmobiliario",
      description: "Transacciones y disputas inmobiliarias",
      features: [
        "Compraventa de propiedades",
        "Arrendamientos",
        "Desarrollo inmobiliario",
        "Disputas de propiedad",
        "Zonificación",
        "Títulos de propiedad",
      ],
      price: "Desde $300/hora",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
              Servicios Legales
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Servicios</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Ofrecemos servicios legales especializados en múltiples áreas del derecho, adaptados a las necesidades
              específicas de cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 dark:bg-gray-800 ${service.popular ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""}`}
              >
                {service.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium rounded-t-lg">
                    Más Popular
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                    >
                      {service.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">{service.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-3">
                    <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Link href="/contact">
                        Consultar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Más Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestro Proceso</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Un enfoque estructurado para garantizar los mejores resultados
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consulta Inicial",
                description: "Evaluamos su caso y definimos la estrategia legal más adecuada.",
                icon: Clock,
              },
              {
                step: "02",
                title: "Análisis Detallado",
                description: "Investigamos a fondo todos los aspectos legales relevantes.",
                icon: Scale,
              },
              {
                step: "03",
                title: "Estrategia Legal",
                description: "Desarrollamos un plan de acción personalizado para su caso.",
                icon: Briefcase,
              },
              {
                step: "04",
                title: "Ejecución",
                description: "Implementamos la estrategia con seguimiento constante.",
                icon: Award,
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <process.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{process.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Preguntas Frecuentes</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "¿Ofrecen consultas gratuitas?",
                answer:
                  "Sí, ofrecemos una consulta inicial gratuita de 30 minutos para evaluar su caso y determinar cómo podemos ayudarle.",
              },
              {
                question: "¿Cuáles son sus tarifas?",
                answer:
                  "Nuestras tarifas varían según el área de práctica y la complejidad del caso. Ofrecemos tarifas por hora, tarifas fijas y acuerdos de contingencia según corresponda.",
              },
              {
                question: "¿Manejan casos fuera de la ciudad?",
                answer:
                  "Sí, manejamos casos en toda la región y tenemos experiencia trabajando con clientes de diferentes ubicaciones geográficas.",
              },
              {
                question: "¿Qué documentos necesito para la consulta?",
                answer:
                  "Traiga todos los documentos relevantes a su caso, como contratos, correspondencia, documentos legales previos y cualquier evidencia relacionada.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg dark:bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Necesita Asesoría Legal Especializada?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contáctenos hoy para una consulta gratuita y descubra cómo podemos ayudarle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">Consulta Gratuita</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="tel:+1234567890">Llamar Ahora</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
