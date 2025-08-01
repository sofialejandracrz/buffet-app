"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import api from "@/lib/axios"
import { useCaseDetails } from "@/hooks/useCaseDetails"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/breadcrumbsPerfil"
import {
  FileText,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Upload,
  User,
  CreditCard,
  ArrowLeft,
  Star,
  Award,
} from "lucide-react"
import { toast } from "sonner"

interface TimelineEvent {
  id: string
  type: "status_change" | "comment" | "document" | "payment" | "meeting"
  title: string
  description: string
  date: string
  time: string
  author: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  downloadUrl: string
  icon: React.ComponentType<{ className?: string }>
}

interface LawyerInfo {
  id: string
  name: string
  specialization: string
  email: string
  phone: string
  avatar: string
  rating: number
  experience: string
  cases: number
  location: string
  bio: string
}

interface CaseDetail {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  startDate: string
  lastUpdate: string
  caseNumber: string
  category: string
  priority: "low" | "medium" | "high"
  totalAmount: number
  paidAmount: number
  lawyer: LawyerInfo
  timeline: TimelineEvent[]
  documents: Document[]
}

// Interfaces para datos de la API
interface CaseDto {
  id: number
  caseNumber: string
  title: string
  description: string
  clientId: number
  clientName: string
  lawyerId?: number
  lawyerName?: string
  serviceTypeId: number
  serviceTypeName: string
  statusId: number
  statusName: string
  priority: string
  estimatedValue: number
  actualValue: number
  startDate: string
  endDate?: string
  dueDate?: string
  notes?: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
  totalActivities: number
  totalDocuments: number
  lastActivity?: string
  recentActivities: CaseActivityDto[]
  documents: CaseDocumentDto[]
}

interface CaseActivityDto {
  id: number
  caseId: number
  lawyerId: number
  lawyerName: string
  activityType: string
  description: string
  hoursWorked?: number
  billableAmount?: number
  activityDate: string
  createdAt: string
}

interface CaseDocumentDto {
  id: number
  caseId: number
  fileName: string
  originalFileName: string
  filePath: string
  fileType: string
  fileSize: number
  documentType: string
  description?: string
  uploadedById: string
  uploadedByName: string
  uploadedAt: string
  isPublic: boolean
}

// Funciones de mapeo de datos API a UI
const mapStatusFromAPI = (statusName: string): CaseDetail["status"] => {
  const statusMap: Record<string, CaseDetail["status"]> = {
    'Nuevo': 'pending',
    'Pendiente': 'pending',
    'En Progreso': 'in_progress',
    'En Curso': 'in_progress',
    'En Revisión': 'in_progress',
    'Pausado': 'pending',
    'Completado': 'completed',
    'Cerrado': 'completed',
    'Cancelado': 'cancelled',
  }
  
  return statusMap[statusName] || 'pending'
}

const mapPriorityFromAPI = (priority: string): CaseDetail["priority"] => {
  const priorityMap: Record<string, CaseDetail["priority"]> = {
    'Baja': 'low',
    'Media': 'medium',
    'Alta': 'high',
    'Urgente': 'high',
  }
  
  return priorityMap[priority] || 'medium'
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const mapActivitiesToTimeline = (activities: CaseActivityDto[]): TimelineEvent[] => {
  return activities.map(activity => ({
    id: activity.id.toString(),
    type: 'comment' as const,
    title: activity.activityType,
    description: activity.description,
    date: activity.activityDate,
    time: new Date(activity.activityDate).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    author: activity.lawyerName,
    icon: MessageSquare,
    color: 'text-blue-600'
  }))
}

const mapDocumentsToUI = (apiDocs: CaseDocumentDto[]): Document[] => {
  return apiDocs.map(doc => ({
    id: doc.id.toString(),
    name: doc.originalFileName,
    type: doc.fileType.toUpperCase(),
    size: formatFileSize(doc.fileSize),
    uploadDate: doc.uploadedAt,
    downloadUrl: `/api/Cases/documents/${doc.id}/download`,
    icon: FileText
  }))
}

const mapApiDataToUI = (apiData: CaseDto, activities: CaseActivityDto[] = [], documents: CaseDocumentDto[] = []): CaseDetail => {
  return {
    id: apiData.id.toString(),
    title: apiData.title,
    description: apiData.description,
    status: mapStatusFromAPI(apiData.statusName),
    startDate: apiData.startDate,
    lastUpdate: apiData.updatedAt || apiData.createdAt,
    caseNumber: apiData.caseNumber,
    category: apiData.serviceTypeName,
    priority: mapPriorityFromAPI(apiData.priority),
    totalAmount: apiData.estimatedValue,
    paidAmount: apiData.actualValue,
    lawyer: {
      id: apiData.lawyerId?.toString() || 'unassigned',
      name: apiData.lawyerName || 'Sin asignar',
      specialization: apiData.serviceTypeName,
      email: 'contacto@bufete.com',
      phone: '+34 900 000 000',
      avatar: '/placeholder.svg?height=100&width=100',
      rating: 4.5,
      experience: '10 años',
      cases: 150,
      location: 'España',
      bio: `Abogado especialista en ${apiData.serviceTypeName} con amplia experiencia en casos similares.`,
    },
    timeline: mapActivitiesToTimeline(activities),
    documents: mapDocumentsToUI(documents)
  }
}

// Datos simulados - en una aplicación real vendrían de una API
const getCaseDetail = (id: string): CaseDetail | null => {
  const casesData: Record<string, CaseDetail> = {
    "1": {
      id: "1",
      title: "Consulta sobre Contrato de Arrendamiento",
      description:
        "Revisión exhaustiva de cláusulas abusivas en contrato de alquiler de vivienda habitual. El cliente requiere asesoramiento sobre la legalidad de ciertas condiciones impuestas por el arrendador y posibles acciones legales a tomar.",
      status: "completed",
      startDate: "2024-01-15",
      lastUpdate: "2024-01-28",
      caseNumber: "CASE-2024-001",
      category: "Derecho Inmobiliario",
      priority: "medium",
      totalAmount: 350,
      paidAmount: 0,
      lawyer: {
        id: "lawyer-1",
        name: "Ana López Martínez",
        specialization: "Derecho Inmobiliario y Civil",
        email: "ana.lopez@bufete.com",
        phone: "+34 912 345 678",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
        experience: "12 años",
        cases: 245,
        location: "Madrid, España",
        bio: "Especialista en derecho inmobiliario con más de una década de experiencia. Experta en contratos de arrendamiento, compraventa y resolución de conflictos de propiedad.",
      },
      timeline: [
        {
          id: "1",
          type: "status_change",
          title: "Caso completado",
          description: "El caso ha sido resuelto satisfactoriamente. Se ha emitido el informe final.",
          date: "2024-01-28",
          time: "14:30",
          author: "Ana López Martínez",
          icon: CheckCircle,
          color: "text-green-600",
        },
        {
          id: "2",
          type: "document",
          title: "Informe legal final",
          description: "Se ha subido el informe final con las conclusiones y recomendaciones.",
          date: "2024-01-28",
          time: "14:15",
          author: "Ana López Martínez",
          icon: FileText,
          color: "text-blue-600",
        },
        {
          id: "3",
          type: "comment",
          title: "Análisis completado",
          description:
            "He completado el análisis del contrato. Las cláusulas 5 y 12 son efectivamente abusivas según la normativa vigente.",
          date: "2024-01-25",
          time: "11:20",
          author: "Ana López Martínez",
          icon: MessageSquare,
          color: "text-purple-600",
        },
        {
          id: "4",
          type: "meeting",
          title: "Reunión de seguimiento",
          description: "Reunión telefónica para revisar el progreso del análisis contractual.",
          date: "2024-01-22",
          time: "16:00",
          author: "Ana López Martínez",
          icon: Phone,
          color: "text-orange-600",
        },
        {
          id: "5",
          type: "document",
          title: "Documentos recibidos",
          description: "Se han recibido todos los documentos necesarios para el análisis.",
          date: "2024-01-18",
          time: "09:45",
          author: "Sistema",
          icon: Upload,
          color: "text-blue-600",
        },
        {
          id: "6",
          type: "status_change",
          title: "Caso en progreso",
          description: "El caso ha sido asignado y se ha iniciado el análisis legal.",
          date: "2024-01-16",
          time: "10:30",
          author: "Ana López Martínez",
          icon: Clock,
          color: "text-blue-600",
        },
        {
          id: "7",
          type: "status_change",
          title: "Caso creado",
          description: "Se ha creado el caso y asignado al abogado especialista.",
          date: "2024-01-15",
          time: "14:20",
          author: "Sistema",
          icon: FileText,
          color: "text-gray-600",
        },
      ],
      documents: [
        {
          id: "doc-1",
          name: "Informe Legal Final - Análisis Contractual",
          type: "PDF",
          size: "2.4 MB",
          uploadDate: "2024-01-28",
          downloadUrl: "#",
          icon: FileText,
        },
        {
          id: "doc-2",
          name: "Contrato de Arrendamiento Original",
          type: "PDF",
          size: "1.8 MB",
          uploadDate: "2024-01-18",
          downloadUrl: "#",
          icon: FileText,
        },
        {
          id: "doc-3",
          name: "Documentación Adicional del Cliente",
          type: "ZIP",
          size: "3.2 MB",
          uploadDate: "2024-01-18",
          downloadUrl: "#",
          icon: FileText,
        },
        {
          id: "doc-4",
          name: "Normativa Legal Aplicable",
          type: "PDF",
          size: "1.1 MB",
          uploadDate: "2024-01-20",
          downloadUrl: "#",
          icon: FileText,
        },
      ],
    },
    "2": {
      id: "2",
      title: "Despido Improcedente",
      description:
        "Demanda por despido sin causa justificada. El cliente fue despedido de manera improcedente y busca la reincorporación o indemnización correspondiente.",
      status: "in_progress",
      startDate: "2024-02-01",
      lastUpdate: "2024-02-10",
      caseNumber: "CASE-2024-002",
      category: "Derecho Laboral",
      priority: "high",
      totalAmount: 500,
      paidAmount: 200,
      lawyer: {
        id: "lawyer-2",
        name: "Carlos Rodríguez Sánchez",
        specialization: "Derecho Laboral",
        email: "carlos.rodriguez@bufete.com",
        phone: "+34 913 456 789",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        experience: "15 años",
        cases: 189,
        location: "Barcelona, España",
        bio: "Abogado laboralista con amplia experiencia en despidos improcedentes, negociación colectiva y derechos de los trabajadores.",
      },
      timeline: [
        {
          id: "1",
          type: "comment",
          title: "Preparación de alegaciones",
          description: "Estoy preparando las alegaciones finales para la vista judicial del próximo martes.",
          date: "2024-02-10",
          time: "16:45",
          author: "Carlos Rodríguez Sánchez",
          icon: MessageSquare,
          color: "text-purple-600",
        },
        {
          id: "2",
          type: "document",
          title: "Pruebas documentales",
          description: "Se han incorporado las pruebas documentales adicionales solicitadas por el juzgado.",
          date: "2024-02-08",
          time: "12:30",
          author: "Carlos Rodríguez Sánchez",
          icon: FileText,
          color: "text-blue-600",
        },
        {
          id: "3",
          type: "meeting",
          title: "Vista judicial programada",
          description: "Se ha fijado la fecha para la vista judicial. Fecha: 13 de febrero a las 10:00h.",
          date: "2024-02-05",
          time: "14:20",
          author: "Juzgado de lo Social",
          icon: Calendar,
          color: "text-orange-600",
        },
        {
          id: "4",
          type: "status_change",
          title: "Demanda presentada",
          description: "La demanda ha sido presentada ante el Juzgado de lo Social correspondiente.",
          date: "2024-02-03",
          time: "11:15",
          author: "Carlos Rodríguez Sánchez",
          icon: FileText,
          color: "text-blue-600",
        },
        {
          id: "5",
          type: "status_change",
          title: "Caso iniciado",
          description: "Se ha iniciado el proceso legal y recopilado la documentación necesaria.",
          date: "2024-02-01",
          time: "09:30",
          author: "Carlos Rodríguez Sánchez",
          icon: Clock,
          color: "text-blue-600",
        },
      ],
      documents: [
        {
          id: "doc-1",
          name: "Demanda por Despido Improcedente",
          type: "PDF",
          size: "3.1 MB",
          uploadDate: "2024-02-03",
          downloadUrl: "#",
          icon: FileText,
        },
        {
          id: "doc-2",
          name: "Contrato de Trabajo",
          type: "PDF",
          size: "1.5 MB",
          uploadDate: "2024-02-01",
          downloadUrl: "#",
          icon: FileText,
        },
        {
          id: "doc-3",
          name: "Carta de Despido",
          type: "PDF",
          size: "0.8 MB",
          uploadDate: "2024-02-01",
          downloadUrl: "#",
          icon: FileText,
        },
      ],
    },
  }

  return casesData[id] || null
}

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

export default function CaseDetailPage() {
  const params = useParams()
  const { caseData: apiCaseData, activities, documents, loading, error, refetch } = useCaseDetails()
  const [caseData, setCaseData] = useState<CaseDetail | null>(null)

  useEffect(() => {
    if (params.id) {
      refetch(params.id as string)
    }
  }, [params.id, refetch])

  useEffect(() => {
    if (apiCaseData) {
      const mappedCase = mapApiDataToUI(apiCaseData, activities, documents)
      setCaseData(mappedCase)
    }
  }, [apiCaseData, activities, documents])

  const handleDownload = (document: Document) => {
    toast.success("Descarga iniciada", {
      description: `Descargando ${document.name}...`,
    })
    // Implementar lógica real de descarga
    if (document.downloadUrl) {
      window.open(document.downloadUrl, '_blank')
    }
  }

  const handlePayment = () => {
    toast.info("Redirigiendo al pago", {
      description: "Te estamos redirigiendo a la página de pagos...",
    })
    // Aquí iría la redirección al sistema de pagos
  }

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Breadcrumbs />
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <Breadcrumbs />
        <Card>
          <CardContent className="text-center py-12">
            <XCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error al cargar el caso</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Link href="/perfil/casos">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a Mis Casos
                </Button>
              </Link>
              <Button onClick={() => refetch(params.id as string)}>
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="space-y-6 p-6">
        <Breadcrumbs />
        <Card>
          <CardContent className="text-center py-12">
            <XCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Caso no encontrado</h3>
            <p className="text-muted-foreground mb-4">El caso que buscas no existe o no tienes permisos para verlo.</p>
            <Link href="/perfil/casos">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Mis Casos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="space-y-6 p-6">
        <Breadcrumbs />
        <Card>
          <CardContent className="text-center py-12">
            <XCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Caso no encontrado</h3>
            <p className="text-muted-foreground mb-4">El caso que buscas no existe o no tienes permisos para verlo.</p>
            <Link href="/perfil/casos">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Mis Casos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const StatusBadge = ({ status }: { status: CaseDetail["status"] }) => {
    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge variant="secondary" className={`${config.color} flex items-center gap-2 text-sm px-3 py-1`}>
        <Icon className="h-4 w-4" />
        {config.label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      }),
      time: timeString,
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Breadcrumbs />

      {/* Botón de regreso */}
      <Link href="/perfil/casos">
        <Button variant="outline" className="mb-4 bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Mis Casos
        </Button>
      </Link>

      {/* Header del caso */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{caseData.caseNumber}</span>
                <Separator orientation="vertical" className="h-4" />
                <span>{caseData.category}</span>
              </div>
              <CardTitle className="text-2xl">{caseData.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">{caseData.description}</CardDescription>
            </div>
            <div className="flex flex-col gap-2">
              <StatusBadge status={caseData.status} />
              <div className="text-sm text-muted-foreground">Iniciado: {formatDate(caseData.startDate)}</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Cronología del Caso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Línea vertical */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

                <div className="space-y-6">
                  {caseData.timeline.map((event) => {
                    const Icon = event.icon
                    const datetime = formatDateTime(event.date, event.time)

                    return (
                      <div key={event.id} className="relative flex gap-4">
                        {/* Icono del evento */}
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-border">
                          <Icon className={`h-5 w-5 ${event.color}`} />
                        </div>

                        {/* Contenido del evento */}
                        <div className="flex-1 min-w-0 pb-6">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="text-xs text-muted-foreground text-right">
                              <div>{datetime.date}</div>
                              <div>{datetime.time}</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{event.author}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentos del Caso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseData.documents.map((document) => {
                  const Icon = document.icon

                  return (
                    <div
                      key={document.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{document.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{document.type}</span>
                            <Separator orientation="vertical" className="h-3" />
                            <span>{document.size}</span>
                            <Separator orientation="vertical" className="h-3" />
                            <span>Subido: {formatDate(document.uploadDate)}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(document)}>
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Información del abogado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Abogado Asignado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={caseData.lawyer.avatar || "/placeholder.svg"} alt={caseData.lawyer.name} />
                  <AvatarFallback className="text-lg">
                    {caseData.lawyer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{caseData.lawyer.name}</h3>
                  <p className="text-sm text-muted-foreground">{caseData.lawyer.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{caseData.lawyer.rating}</span>
                    <span className="text-xs text-muted-foreground">({caseData.lawyer.cases} casos)</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{caseData.lawyer.bio}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.lawyer.experience} de experiencia</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.lawyer.location}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Información de Contacto</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${caseData.lawyer.email}`} className="text-blue-600 hover:underline">
                      {caseData.lawyer.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${caseData.lawyer.phone}`} className="text-blue-600 hover:underline">
                      {caseData.lawyer.phone}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información financiera */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Información de Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Importe total:</span>
                  <span className="font-medium">${caseData.totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pagado:</span>
                  <span className="font-medium text-green-600">${caseData.paidAmount}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Pendiente:</span>
                  <span className="text-red-600">${caseData.totalAmount - caseData.paidAmount}</span>
                </div>
              </div>

              {/* Botón de pago condicional */}
              {caseData.status === "completed" && caseData.paidAmount < caseData.totalAmount && (
                <>
                  <Separator />
                  <Button onClick={handlePayment} className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pagar Factura (${caseData.totalAmount - caseData.paidAmount})
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

