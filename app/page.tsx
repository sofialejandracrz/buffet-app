import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Users, Award, ArrowRight, Star, Building2, Heart, Gavel, Briefcase, Shield, Home } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
 
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Más de 25 años de experiencia
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Defendemos Sus Derechos con
              <span className="text-blue-300"> Excelencia Legal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Bufete de abogados líder especializado en brindar soluciones legales integrales con un enfoque
              personalizado y resultados excepcionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white text-lg px-8 py-3">
                <Link href="/contact">Consulta Gratuita</Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-400 text-white hover:bg-white hover:border-white hover:text-slate-900 dark:border-slate-600 dark:hover:bg-slate-600 text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/services">Nuestros Servicios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Casos Exitosos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-300">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">15</div>
              <div className="text-gray-600 dark:text-gray-300">Abogados Expertos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-300">Satisfacción Cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestros Valores Fundamentales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Construimos relaciones duraderas basadas en la confianza, integridad y resultados excepcionales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Justicia</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Luchamos incansablemente por la justicia y los derechos de nuestros clientes, asegurando que cada caso
                  reciba la atención y dedicación que merece.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Compromiso</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nuestro compromiso va más allá del servicio legal; construimos relaciones duraderas basadas en la
                  confianza mutua y el respeto.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Excelencia</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Mantenemos los más altos estándares de excelencia profesional, actualizándonos constantemente para
                  ofrecer las mejores soluciones legales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Áreas de Práctica</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ofrecemos servicios legales especializados en múltiples áreas del derecho
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Derecho Corporativo",
                description: "Asesoría integral para empresas, contratos comerciales y fusiones.",
                icon: Building2,
              },
              {
                title: "Derecho de Familia",
                description: "Divorcios, custodia, adopciones y mediación familiar.",
                icon: Heart,
              },
              {
                title: "Litigios Civiles",
                description: "Representación en disputas civiles y comerciales complejas.",
                icon: Gavel,
              },
              {
                title: "Derecho Laboral",
                description: "Protección de derechos laborales y resolución de conflictos.",
                icon: Briefcase,
              },
              {
                title: "Derecho Penal",
                description: "Defensa criminal con experiencia y dedicación completa.",
                icon: Shield,
              },
              {
                title: "Derecho Inmobiliario",
                description: "Transacciones inmobiliarias y resolución de disputas de propiedad.",
                icon: Home,
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 dark:bg-gray-800 dark:shadow-gray-700"
              >
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  <Link
                    href="/services"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center"
                  >
                    Saber más <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white">
              <Link href="/services">Ver Todos los Servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Empresaria",
                content:
                  "Excelente servicio y profesionalismo. Me ayudaron a resolver un caso complejo de manera eficiente.",
                rating: 5,
              },
              {
                name: "Carlos Rodríguez",
                role: "Director Ejecutivo",
                content:
                  "Su experiencia en derecho corporativo fue fundamental para el éxito de nuestra fusión empresarial.",
                rating: 5,
              },
              {
                name: "Ana Martínez",
                role: "Madre de Familia",
                content:
                  "Muy agradecida por su apoyo durante mi proceso de divorcio. Siempre fueron comprensivos y profesionales.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg dark:bg-gray-800 dark:shadow-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Necesita Asesoría Legal?</h2>
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
               className="border-white text-white hover:bg-white hover:text-blue-600 dark:border-white dark:hover:bg-white bg-transparent"
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
