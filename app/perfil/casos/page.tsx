"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumbs } from "@/components/breadcrumbsPerfil"
import {
  FileText,
  Search,
  Filter,
  Calendar,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react"

interface CaseData {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  startDate: string
  lastUpdate: string
  lawyer: string
  category: string
  priority: "low" | "medium" | "high"
  caseNumber: string
}

const casesData: CaseData[] = [
  {
    id: "1",
    title: "Consulta sobre Contrato de Arrendamiento",
    description: "Revisión de cláusulas abusivas en contrato de alquiler",
    status: "completed",
    startDate: "2024-01-15",
    lastUpdate: "2024-01-28",
    lawyer: "Ana López Martínez",
    category: "Derecho Inmobiliario",
    priority: "medium",
    caseNumber: "CASE-2024-001",
  },
  {
    id: "2",
    title: "Despido Improcedente",
    description: "Demanda por despido sin causa justificada",
    status: "in_progress",
    startDate: "2024-02-01",
    lastUpdate: "2024-02-10",
    lawyer: "Carlos Rodríguez",
    category: "Derecho Laboral",
    priority: "high",
    caseNumber: "CASE-2024-002",
  },
  {
    id: "3",
    title: "Divorcio de Mutuo Acuerdo",
    description: "Proceso de divorcio consensual con custodia compartida",
    status: "in_progress",
    startDate: "2024-01-20",
    lastUpdate: "2024-02-08",
    lawyer: "María González Ruiz",
    category: "Derecho de Familia",
    priority: "medium",
    caseNumber: "CASE-2024-003",
  },
  {
    id: "4",
    title: "Reclamación de Daños por Accidente",
    description: "Indemnización por accidente de tráfico con lesiones",
    status: "pending",
    startDate: "2024-02-05",
    lastUpdate: "2024-02-05",
    lawyer: "Juan Pérez Sánchez",
    category: "Derecho Civil",
    priority: "high",
    caseNumber: "CASE-2024-004",
  },
  {
    id: "5",
    title: "Constitución de Sociedad Limitada",
    description: "Creación de empresa y redacción de estatutos",
    status: "completed",
    startDate: "2023-12-10",
    lastUpdate: "2024-01-05",
    lawyer: "Elena Martín Torres",
    category: "Derecho Empresarial",
    priority: "low",
    caseNumber: "CASE-2023-045",
  },
  {
    id: "6",
    title: "Defensa Penal por Delito Menor",
    description: "Representación en proceso penal por falta leve",
    status: "cancelled",
    startDate: "2024-01-08",
    lastUpdate: "2024-01-15",
    lawyer: "Roberto Silva Vega",
    category: "Derecho Penal",
    priority: "medium",
    caseNumber: "CASE-2024-005",
  },
  {
    id: "7",
    title: "Reclamación de Negligencia Médica",
    description: "Demanda por mala praxis en intervención quirúrgica",
    status: "in_progress",
    startDate: "2024-01-25",
    lastUpdate: "2024-02-12",
    lawyer: "Patricia Moreno Díaz",
    category: "Derecho Sanitario",
    priority: "high",
    caseNumber: "CASE-2024-006",
  },
  {
    id: "8",
    title: "Herencia y Testamento",
    description: "Gestión de herencia y reparto de bienes",
    status: "pending",
    startDate: "2024-02-08",
    lastUpdate: "2024-02-08",
    lawyer: "Fernando Castro López",
    category: "Derecho Civil",
    priority: "medium",
    caseNumber: "CASE-2024-007",
  },
]

const statusConfig = {
  pending: {
    label: "Pendiente",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: AlertCircle,
  },
  in_progress: {
    label: "En Curso",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    icon: Clock,
  },
  completed: {
    label: "Completado",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: XCircle,
  },
}

const priorityConfig = {
  low: { label: "Baja", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
  medium: { label: "Media", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  high: { label: "Alta", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
}

export default function CasosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "status" | "title">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredAndSortedCases = useMemo(() => {
    const filtered = casesData.filter((case_) => {
      const matchesSearch =
        case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.lawyer.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || case_.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Ordenar casos
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "date":
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [searchTerm, statusFilter, sortBy, sortOrder])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusStats = () => {
    const stats = {
      total: casesData.length,
      pending: casesData.filter((c) => c.status === "pending").length,
      in_progress: casesData.filter((c) => c.status === "in_progress").length,
      completed: casesData.filter((c) => c.status === "completed").length,
      cancelled: casesData.filter((c) => c.status === "cancelled").length,
    }
    return stats
  }

  const stats = getStatusStats()

  const StatusBadge = ({ status }: { status: CaseData["status"] }) => {
    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge variant="secondary" className={`${config.color} flex items-center gap-1 font-medium`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const PriorityBadge = ({ priority }: { priority: CaseData["priority"] }) => {
    const config = priorityConfig[priority]

    return (
      <Badge variant="outline" className={`${config.color} text-xs`}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <Breadcrumbs />

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mis Casos</h1>
        <p className="text-muted-foreground">
          Gestiona y revisa el estado de todos tus casos legales en un solo lugar.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.in_progress}</div>
            <p className="text-xs text-muted-foreground">En Curso</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Completados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <p className="text-xs text-muted-foreground">Cancelados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título, número de caso o abogado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in_progress">En Curso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [field, order] = value.split("-")
                setSortBy(field as typeof sortBy)
                setSortOrder(order as typeof sortOrder)
              }}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Fecha (más reciente)</SelectItem>
                <SelectItem value="date-asc">Fecha (más antiguo)</SelectItem>
                <SelectItem value="title-asc">Título (A-Z)</SelectItem>
                <SelectItem value="title-desc">Título (Z-A)</SelectItem>
                <SelectItem value="status-asc">Estado (A-Z)</SelectItem>
                <SelectItem value="status-desc">Estado (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vista de escritorio - Tabla */}
      <Card className="hidden md:block">
        <div className="relative">
          <div className="max-h-[600px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="w-[300px]">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSortBy("title")
                        setSortOrder(sortBy === "title" && sortOrder === "asc" ? "desc" : "asc")
                      }}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Caso
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSortBy("status")
                        setSortOrder(sortBy === "status" && sortOrder === "asc" ? "desc" : "asc")
                      }}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Estado
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSortBy("date")
                        setSortOrder(sortBy === "date" && sortOrder === "asc" ? "desc" : "asc")
                      }}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Fecha de Inicio
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Abogado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedCases.map((case_) => (
                  <TableRow key={case_.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{case_.title}</div>
                        <div className="text-sm text-muted-foreground">{case_.caseNumber}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{case_.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={case_.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(case_.startDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{case_.lawyer}</div>
                      <div className="text-xs text-muted-foreground">{case_.category}</div>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={case_.priority} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/perfil/casos/${case_.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Vista móvil - Cards */}
      <div className="md:hidden space-y-4">
        {filteredAndSortedCases.map((case_) => (
          <Card key={case_.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-base leading-tight">{case_.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{case_.caseNumber}</p>
                </div>
                <StatusBadge status={case_.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{case_.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Fecha de inicio:</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(case_.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Prioridad:</p>
                  <PriorityBadge priority={case_.priority} />
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Abogado asignado:</p>
                <p className="font-medium">{case_.lawyer}</p>
                <p className="text-xs text-muted-foreground">{case_.category}</p>
              </div>

              <Link href={`/perfil/casos/${case_.id}`} className="block">
                <Button className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles del Caso
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredAndSortedCases.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron casos</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Aún no tienes casos registrados"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Link href="/perfil/contratar">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Contratar Primer Servicio
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
