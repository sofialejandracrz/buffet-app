'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, Target, Heart, Linkedin, Mail } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import api from "@/lib/axios"

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  useEffect(() => {
    api.get("/api/Empleado")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [res.data]
        setTeamMembers(data)
        console.log("Team members loaded:", data)
      })
      .catch(() => setTeamMembers([]))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
              Nuestra Historia
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Más de 25 años construyendo confianza y brindando excelencia legal a individuos y empresas en toda la
              región.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Fundado en 1999 por la Dra. María Elena Rodríguez, LexFirm nació con la visión de brindar servicios
                  legales de la más alta calidad con un enfoque personalizado y comprometido con la justicia.
                </p>
                <p>
                  Durante más de dos décadas, hemos crecido de ser un pequeño despacho a convertirnos en uno de los
                  bufetes más respetados de la región, manteniendo siempre nuestros valores fundamentales de integridad,
                  excelencia y compromiso.
                </p>
                <p>
                  Hoy, nuestro equipo de 15 abogados especializados continúa la tradición de excelencia, adaptándose a
                  los desafíos legales modernos mientras preservamos el trato personal y la atención detallada que nos
                  caracteriza.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Historia del bufete"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Misión y Valores</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nuestros principios guían cada decisión y acción que tomamos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center dark:bg-gray-800 dark:shadow-gray-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Misión</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Brindar soluciones legales integrales y personalizadas que protejan los derechos e intereses de
                  nuestros clientes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center dark:bg-gray-800 dark:shadow-gray-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Integridad</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Actuamos con honestidad, transparencia y ética en todas nuestras relaciones profesionales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center dark:bg-gray-800 dark:shadow-gray-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Excelencia</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mantenemos los más altos estándares de calidad y profesionalismo en cada caso.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center dark:bg-gray-800 dark:shadow-gray-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Compromiso</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Nos dedicamos completamente a cada cliente, construyendo relaciones duraderas basadas en la confianza.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestro Equipo Legal</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Profesionales altamente calificados con experiencia comprobada en diversas áreas del derecho
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl dark:shadow-gray-700 dark:bg-gray-800 transition-all hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={member.Imagen || "/placeholder.svg"}
                      alt={member.Nombre + " " + member.Apellido}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600 dark:bg-blue-700 dark:text-white">{member.Experiencia}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.Nombre + " " + member.Apellido}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.Cargo}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{member.Especializacion}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{member.Educacion}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.Biografia}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Link href={`mailto:${member.Correo}`} passHref className="flex items-center justify-center w-full">
                          <Mail className="h-4 w-4 mr-2" />
                          Contactar
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={member.LinkedinUrl || "#"} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Trabajar con Nosotros?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo está preparado para brindarle la mejor asesoría legal
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Agendar Consulta</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

