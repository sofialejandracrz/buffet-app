import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, CheckCircle, CreditCard, Clock, MessageSquare, User, TrendingUp, Calendar } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbsPerfil"
import Link from "next/link"

export default function PerfilPage() {
  // Datos simulados - en una aplicación real vendrían de una API
  const userData = {
    name: "María González",
    initials: "MG",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const metrics = {
    activeCases: 3,
    completedCases: 12,
    pendingPayments: 2,
  }

  const recentActivity = [
    {
      id: 1,
      type: "status_update",
      title: "Actualización en Caso #2024-001",
      description: "El abogado Juan Pérez actualizó el estado a 'En revisión'",
      timestamp: "Hace 2 horas",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "comment",
      title: "Nuevo comentario",
      description: "Comentario añadido en Caso #2024-003: 'Documentos recibidos correctamente'",
      timestamp: "Hace 5 horas",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "payment",
      title: "Pago procesado",
      description: "Factura #INV-2024-045 pagada exitosamente",
      timestamp: "Hace 1 día",
      icon: CreditCard,
      color: "text-emerald-600",
    },
    {
      id: 4,
      type: "case_completed",
      title: "Caso completado",
      description: "Caso #2024-002 - Consulta legal finalizada",
      timestamp: "Hace 2 días",
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      id: 5,
      type: "appointment",
      title: "Cita programada",
      description: "Reunión con Abg. Ana López para el 15 de enero",
      timestamp: "Hace 3 días",
      icon: Calendar,
      color: "text-orange-600",
    },
  ]

  const motivationalQuotes = [
    "La justicia es la verdad en acción.",
    "El derecho es el conjunto de condiciones que permiten a la libertad de cada uno acomodarse a la libertad de todos.",
    "La ley es la razón libre de pasión.",
    "Donde no hay justicia es peligroso tener razón.",
    "La justicia sin fuerza es impotente; la fuerza sin justicia es tiránica.",
  ]

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  return (
    <div className="space-y-8 p-6">
      <Breadcrumbs />

      {/* Sección de bienvenida */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-white/20">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback className="bg-white/20 text-white font-semibold">{userData.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">¡Bienvenido, {userData.name}!</h1>
            <p className="text-blue-100">Aquí tienes un resumen de tu actividad legal</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-blue-100 mb-1">Frase del día:</p>
          <p className="font-medium italic">&ldquo;{randomQuote}&rdquo;</p>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Casos Activos</CardTitle>
            <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{metrics.activeCases}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              En progreso
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Casos Completados</CardTitle>
            <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{metrics.completedCases}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3" />
              Finalizados exitosamente
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pagos Pendientes</CardTitle>
            <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{metrics.pendingPayments}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              Requieren atención
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {activity.timestamp}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/perfil/contratar">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-sm">Contratar Servicio</h3>
              <p className="text-xs text-muted-foreground mt-1">Solicita nueva consulta</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/perfil/casos">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-sm">Ver Casos</h3>
              <p className="text-xs text-muted-foreground mt-1">Revisa tus casos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/perfil/pagos">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-sm">Pagos</h3>
              <p className="text-xs text-muted-foreground mt-1">Gestiona facturas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/perfil/configuracion">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                <User className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-sm">Configuración</h3>
              <p className="text-xs text-muted-foreground mt-1">Actualiza tu perfil</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
