import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, ArrowRight, Search, Clock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Nuevas Regulaciones en Derecho Corporativo 2024",
      excerpt:
        "Análisis completo de las últimas modificaciones en la legislación corporativa y su impacto en las empresas.",
      author: "Dra. María Elena Rodríguez",
      date: "15 de Marzo, 2024",
      readTime: "8 min lectura",
      category: "Derecho Corporativo",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      id: 2,
      title: "Guía Completa para Divorcios Consensuales",
      excerpt:
        "Todo lo que necesita saber sobre el proceso de divorcio consensual, requisitos y beneficios para las familias.",
      author: "Dra. Ana Sofía López",
      date: "10 de Marzo, 2024",
      readTime: "6 min lectura",
      category: "Derecho de Familia",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Derechos Laborales: Cambios en la Legislación",
      excerpt: "Actualización sobre las nuevas normativas laborales y cómo afectan tanto a empleadores como empleados.",
      author: "Lic. Roberto Jiménez",
      date: "5 de Marzo, 2024",
      readTime: "10 min lectura",
      category: "Derecho Laboral",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Contratos Inmobiliarios: Errores Comunes a Evitar",
      excerpt: "Los errores más frecuentes en contratos de compraventa inmobiliaria y cómo prevenirlos.",
      author: "Lic. Fernando Castro",
      date: "28 de Febrero, 2024",
      readTime: "7 min lectura",
      category: "Derecho Inmobiliario",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Defensa Penal: Sus Derechos Durante una Investigación",
      excerpt: "Conozca sus derechos fundamentales durante un proceso de investigación penal y cómo protegerse.",
      author: "Dra. Patricia Herrera",
      date: "22 de Febrero, 2024",
      readTime: "9 min lectura",
      category: "Derecho Penal",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Mediación Familiar: Una Alternativa Efectiva",
      excerpt:
        "Cómo la mediación familiar puede resolver conflictos de manera más rápida y menos costosa que los litigios.",
      author: "Dra. Ana Sofía López",
      date: "18 de Febrero, 2024",
      readTime: "5 min lectura",
      category: "Derecho de Familia",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const categories = [
    "Todos",
    "Derecho Corporativo",
    "Derecho de Familia",
    "Derecho Laboral",
    "Derecho Penal",
    "Derecho Inmobiliario",
    "Litigios Civiles",
  ]

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
              Blog Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Noticias y Análisis Legal</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Manténgase informado con las últimas noticias legales, análisis de casos y consejos prácticos de nuestros
              expertos.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar artículos..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Badge className="bg-blue-600 dark:bg-blue-700 text-white mb-4">Artículo Destacado</Badge>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lo Más Reciente</h2>
            </div>

            <Card className="border-0 shadow-xl overflow-hidden dark:bg-gray-800 dark:shadow-gray-700 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">{featuredPost.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-fit text-white">
                    Leer Artículo Completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Todos los Artículos</h2>
            <p className="text-gray-600 dark:text-gray-300">Explore nuestro archivo completo de artículos legales</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden dark:bg-gray-800 dark:shadow-gray-700"
              >
                <div className="relative">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">{post.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 dark:hover:text-white">
                      Leer más
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
            >
              Cargar Más Artículos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Suscríbase a Nuestro Newsletter</h2>
            <p className="text-xl mb-8">Reciba las últimas noticias legales y análisis directamente en su correo</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Su correo electrónico" className="flex-1 bg-white text-gray-900" />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Suscribirse</Button>
            </div>
            <p className="text-sm text-blue-100 mt-4">Sin spam. Puede cancelar su suscripción en cualquier momento.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
