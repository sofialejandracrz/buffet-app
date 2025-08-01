"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, DollarSign, Star, Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"

// Datos mock para el dashboard (en producción vendrían de la API)
const dashboardStats = {
  totalClientes: 247,
  casosActivos: 89,
  ingresosMensual: 125000,
  calificacionPromedio: 4.8,
  crecimientoClientes: 12,
  crecimientoCasos: 8,
  crecimientoIngresos: 15,
  crecimientoCalificacion: 2,
}

const casosRecientes = [
  {
    id: 1,
    titulo: "Divorcio Contencioso - García vs. García",
    cliente: "María García",
    abogado: "Dr. Carlos Mendoza",
    estado: "En Proceso",
    prioridad: "Alta",
    fechaVencimiento: "2024-01-25",
    valor: 15000,
    progreso: 65,
  },
  {
    id: 2,
    titulo: "Demanda Laboral - Constructora ABC",
    cliente: "Juan Pérez",
    abogado: "Dra. Ana López",
    estado: "Urgente",
    prioridad: "Crítica",
    fechaVencimiento: "2024-01-20",
    valor: 25000,
    progreso: 30,
  },
  {
    id: 3,
    titulo: "Constitución de Empresa - TechStart SRL",
    cliente: "TechStart SRL",
    abogado: "Dr. Roberto Silva",
    estado: "Finalizado",
    prioridad: "Media",
    fechaVencimiento: "2024-01-15",
    valor: 8000,
    progreso: 100,
  },
  {
    id: 4,
    titulo: "Recuperación de Deudas - Comercial Norte",
    cliente: "Comercial Norte SA",
    abogado: "Dra. Patricia Ruiz",
    estado: "En Proceso",
    prioridad: "Alta",
    fechaVencimiento: "2024-01-30",
    valor: 12000,
    progreso: 45,
  },
]

const citasHoy = [
  {
    id: 1,
    hora: "09:00",
    cliente: "Carlos Rodríguez",
    abogado: "Dr. Carlos Mendoza",
    tipo: "Consulta Inicial",
    estado: "Confirmada",
  },
  {
    id: 2,
    hora: "11:30",
    cliente: "Empresa XYZ",
    abogado: "Dra. Ana López",
    tipo: "Seguimiento",
    estado: "Pendiente",
  },
  {
    id: 3,
    hora: "14:00",
    cliente: "María Fernández",
    abogado: "Dr. Roberto Silva",
    tipo: "Firma de Documentos",
    estado: "Confirmada",
  },
  {
    id: 4,
    hora: "16:30",
    cliente: "Inversiones del Sur",
    abogado: "Dra. Patricia Ruiz",
    tipo: "Revisión Contractual",
    estado: "Reprogramada",
  },
]

const alertas = [
  {
    id: 1,
    tipo: "urgente",
    mensaje: "3 casos con vencimiento en las próximas 48 horas",
    tiempo: "Hace 5 min",
  },
  {
    id: 2,
    tipo: "info",
    mensaje: "Nueva consulta recibida de cliente potencial",
    tiempo: "Hace 15 min",
  },
  {
    id: 3,
    tipo: "warning",
    mensaje: "Pago pendiente de Cliente ABC por $5,000",
    tiempo: "Hace 1 hora",
  },
]

export default function DashboardPage() {
  const getEstadoBadge = (estado: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "En Proceso": "default",
      Urgente: "destructive",
      Finalizado: "secondary",
      Pendiente: "outline",
    }
    return variants[estado] || "default"
  }

  const getPrioridadColor = (prioridad: string) => {
    const colors: Record<string, string> = {
      Crítica: "text-red-600",
      Alta: "text-orange-600",
      Media: "text-yellow-600",
      Baja: "text-green-600",
    }
    return colors[prioridad] || "text-gray-600"
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Panel de Control</h2>
        <div className="flex items-center space-x-2">
          <Button>Generar Reporte</Button>
        </div>
      </div>

      {/* Alertas */}
      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertas Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertas.map((alerta) => (
                <div key={alerta.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {alerta.tipo === "urgente" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {alerta.tipo === "info" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                    {alerta.tipo === "warning" && <Clock className="h-4 w-4 text-yellow-500" />}
                    <span className="text-sm">{alerta.mensaje}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{alerta.tiempo}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalClientes}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{dashboardStats.crecimientoClientes}%</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.casosActivos}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{dashboardStats.crecimientoCasos}%</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardStats.ingresosMensual.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{dashboardStats.crecimientoIngresos}%</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.calificacionPromedio}/5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{dashboardStats.crecimientoCalificacion}%</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Casos Recientes */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Casos Recientes</CardTitle>
            <CardDescription>Últimos casos registrados en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {casosRecientes.map((caso) => (
                <div key={caso.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{caso.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      Cliente: {caso.cliente} | Abogado: {caso.abogado}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={getEstadoBadge(caso.estado)}>{caso.estado}</Badge>
                      <span className={`text-xs font-medium ${getPrioridadColor(caso.prioridad)}`}>
                        {caso.prioridad}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Vence: {new Date(caso.fechaVencimiento).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${caso.valor.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{caso.progreso}% completado</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Citas de Hoy */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Citas de Hoy
            </CardTitle>
            <CardDescription>Agenda del día actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {citasHoy.map((cita) => (
                <div key={cita.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{cita.hora}</p>
                    <p className="text-sm text-muted-foreground">{cita.cliente}</p>
                    <p className="text-xs text-muted-foreground">{cita.abogado}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={cita.estado === "Confirmada" ? "default" : "outline"}>{cita.estado}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{cita.tipo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
