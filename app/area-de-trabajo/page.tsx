"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  FileText, 
  Plus, 
  TrendingUp, 
  Users,
  AlertCircle,
  CheckCircle2,
  Timer
} from "lucide-react";
import Link from "next/link";

export default function AreaDeTrabajo() {
  const { user } = useAuth();

  // Datos simulados para el dashboard del abogado
  const stats = {
    totalCases: 24,
    activeCases: 8,
    completedThisMonth: 5,
    clientsCount: 18,
    upcomingAppointments: 3,
    pendingDocuments: 7,
  };

  const recentCases = [
    {
      id: "1",
      title: "Divorcio consensual - María González",
      caseNumber: "CASE-2024-001",
      status: "in_progress",
      priority: "high",
      lastUpdate: "2024-01-14",
      client: "María González",
    },
    {
      id: "2", 
      title: "Demanda laboral - Carlos Pérez",
      caseNumber: "CASE-2024-002",
      status: "pending",
      priority: "medium",
      lastUpdate: "2024-01-13",
      client: "Carlos Pérez",
    },
    {
      id: "3",
      title: "Constitución de empresa - Tech Solutions",
      caseNumber: "CASE-2024-003", 
      status: "completed",
      priority: "low",
      lastUpdate: "2024-01-12",
      client: "Tech Solutions S.A.",
    },
  ];

  const upcomingAppointments = [
    {
      id: "1",
      title: "Reunión con María González",
      time: "10:00 AM",
      date: "Hoy",
      type: "Consulta",
    },
    {
      id: "2",
      title: "Audiencia Carlos Pérez",
      time: "2:00 PM", 
      date: "Mañana",
      type: "Audiencia",
    },
    {
      id: "3",
      title: "Firma de documentos Tech Solutions",
      time: "9:00 AM",
      date: "Miércoles",
      type: "Firma",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completado</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">En Progreso</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Media</Badge>;
      case "low":
        return <Badge variant="outline">Baja</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Área de Trabajo</h1>
          <p className="text-muted-foreground">
            Bienvenido de vuelta, {user?.nombre} {user?.apellido}
          </p>
        </div>
        <Button asChild>
          <Link href="/area-de-trabajo/casos?action=new">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Caso
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Totales</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCases}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCases}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mis Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clientsCount}</div>
            <p className="text-xs text-muted-foreground">
              Clientes activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas Citas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingDocuments}</div>
            <p className="text-xs text-muted-foreground">
              Pendientes revisión
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Casos Recientes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Casos Recientes</CardTitle>
                <CardDescription>
                  Últimos casos actualizados
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/area-de-trabajo/casos">Ver todos</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((caso) => (
                <div
                  key={caso.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{caso.title}</p>
                      {getPriorityBadge(caso.priority)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{caso.caseNumber}</span>
                      <span>•</span>
                      <span>{caso.client}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Actualizado: {caso.lastUpdate}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(caso.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximas Citas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Próximas Citas</CardTitle>
                <CardDescription>
                  Tu agenda para los próximos días
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/area-de-trabajo/calendario">Ver calendario</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{appointment.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{appointment.date}</span>
                      <span>•</span>
                      <span>{appointment.time}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accede rápidamente a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/area-de-trabajo/casos?action=new">
                <Plus className="h-6 w-6" />
                Crear Caso
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/area-de-trabajo/clientes">
                <Users className="h-6 w-6" />
                Ver Clientes
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/area-de-trabajo/documentos">
                <FileText className="h-6 w-6" />
                Documentos
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/area-de-trabajo/calendario">
                <Calendar className="h-6 w-6" />
                Calendario
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
