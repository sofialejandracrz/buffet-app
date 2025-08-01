"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Star,
  Briefcase,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos mock de abogados (en producción vendrían de la API)
const abogados = [
  {
    id: 1,
    nombre: "Dr. Carlos Mendoza",
    especialidad: "Derecho Civil",
    email: "carlos.mendoza@bufete.com",
    telefono: "+1 234-567-8901",
    ubicacion: "Ciudad de México",
    casosActivos: 15,
    casosResueltos: 89,
    calificacion: 4.9,
    experiencia: 12,
    estado: "Activo",
    fechaIngreso: "2020-03-15",
    avatar: "/avatars/carlos.jpg",
    especialidades: ["Derecho Civil", "Derecho Familiar", "Mediación"],
  },
  {
    id: 2,
    nombre: "Dra. Ana López",
    especialidad: "Derecho Laboral",
    email: "ana.lopez@bufete.com",
    telefono: "+1 234-567-8902",
    ubicacion: "Guadalajara",
    casosActivos: 12,
    casosResueltos: 67,
    calificacion: 4.8,
    experiencia: 8,
    estado: "Activo",
    fechaIngreso: "2021-07-20",
    avatar: "/avatars/ana.jpg",
    especialidades: ["Derecho Laboral", "Derecho Sindical", "Seguridad Social"],
  },
  {
    id: 3,
    nombre: "Dr. Roberto Silva",
    especialidad: "Derecho Corporativo",
    email: "roberto.silva@bufete.com",
    telefono: "+1 234-567-8903",
    ubicacion: "Monterrey",
    casosActivos: 8,
    casosResueltos: 134,
    calificacion: 4.7,
    experiencia: 15,
    estado: "Vacaciones",
    fechaIngreso: "2018-01-10",
    avatar: "/avatars/roberto.jpg",
    especialidades: ["Derecho Corporativo", "Fusiones y Adquisiciones", "Compliance"],
  },
  {
    id: 4,
    nombre: "Dra. Patricia Ruiz",
    especialidad: "Derecho Penal",
    email: "patricia.ruiz@bufete.com",
    telefono: "+1 234-567-8904",
    ubicacion: "Ciudad de México",
    casosActivos: 18,
    casosResueltos: 92,
    calificacion: 4.9,
    experiencia: 10,
    estado: "Activo",
    fechaIngreso: "2019-09-05",
    avatar: "/avatars/patricia.jpg",
    especialidades: ["Derecho Penal", "Derecho Procesal Penal", "Defensa Criminal"],
  },
  {
    id: 5,
    nombre: "Dr. Miguel Torres",
    especialidad: "Derecho Fiscal",
    email: "miguel.torres@bufete.com",
    telefono: "+1 234-567-8905",
    ubicacion: "Puebla",
    casosActivos: 10,
    casosResueltos: 78,
    calificacion: 4.6,
    experiencia: 9,
    estado: "Activo",
    fechaIngreso: "2020-11-12",
    avatar: "/avatars/miguel.jpg",
    especialidades: ["Derecho Fiscal", "Derecho Tributario", "Auditorías Fiscales"],
  },
  {
    id: 6,
    nombre: "Dra. Carmen Vega",
    especialidad: "Derecho Inmobiliario",
    email: "carmen.vega@bufete.com",
    telefono: "+1 234-567-8906",
    ubicacion: "Tijuana",
    casosActivos: 14,
    casosResueltos: 56,
    calificacion: 4.8,
    experiencia: 7,
    estado: "Activo",
    fechaIngreso: "2022-02-28",
    avatar: "/avatars/carmen.jpg",
    especialidades: ["Derecho Inmobiliario", "Derecho Urbanístico", "Contratos"],
  },
]

export default function AbogadosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEspecialidad, setFilterEspecialidad] = useState("todas")
  const [filterEstado, setFilterEstado] = useState("todos")

  const especialidades = Array.from(new Set(abogados.map((a) => a.especialidad)))

  const abogadosFiltrados = abogados.filter((abogado) => {
    const matchesSearch =
      abogado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      abogado.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEspecialidad = filterEspecialidad === "todas" || abogado.especialidad === filterEspecialidad
    const matchesEstado = filterEstado === "todos" || abogado.estado === filterEstado

    return matchesSearch && matchesEspecialidad && matchesEstado
  })

  const getEstadoBadge = (estado: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Activo: "default",
      Vacaciones: "secondary",
      Inactivo: "destructive",
      Licencia: "outline",
    }
    return variants[estado] || "default"
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Abogados</h2>
          <p className="text-muted-foreground">Administra el equipo legal del bufete</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Abogado
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Abogados</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{abogados.length}</div>
            <p className="text-xs text-muted-foreground">
              {abogados.filter((a) => a.estado === "Activo").length} activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{abogados.reduce((sum, a) => sum + a.casosActivos, 0)}</div>
            <p className="text-xs text-muted-foreground">En todos los abogados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Resueltos</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{abogados.reduce((sum, a) => sum + a.casosResueltos, 0)}</div>
            <p className="text-xs text-muted-foreground">Total histórico</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(abogados.reduce((sum, a) => sum + a.calificacion, 0) / abogados.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">De 5.0 estrellas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar abogados..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={filterEspecialidad} onValueChange={setFilterEspecialidad}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las especialidades</SelectItem>
                {especialidades.map((esp) => (
                  <SelectItem key={esp} value={esp}>
                    {esp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Vacaciones">Vacaciones</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de abogados */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {abogadosFiltrados.map((abogado) => (
          <Card key={abogado.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={abogado.avatar || "/placeholder.svg"} alt={abogado.nombre} />
                    <AvatarFallback>
                      {abogado.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{abogado.nombre}</CardTitle>
                    <CardDescription>{abogado.especialidad}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={getEstadoBadge(abogado.estado)}>{abogado.estado}</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{abogado.calificacion}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{abogado.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{abogado.telefono}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{abogado.ubicacion}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{abogado.casosActivos}</div>
                  <div className="text-xs text-muted-foreground">Casos Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{abogado.casosResueltos}</div>
                  <div className="text-xs text-muted-foreground">Casos Resueltos</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Especialidades:</div>
                <div className="flex flex-wrap gap-1">
                  {abogado.especialidades.map((esp, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {esp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                <span>{abogado.experiencia} años de experiencia</span>
                <span>Desde {new Date(abogado.fechaIngreso).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {abogadosFiltrados.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron abogados</h3>
            <p className="text-muted-foreground text-center">
              Intenta ajustar los filtros de búsqueda para encontrar lo que buscas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
