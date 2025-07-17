"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Plus,
  FileText,
  Clock,
  User,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function CasosAbogado() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Datos simulados de casos del abogado
  const casos = [
    {
      id: "1",
      title: "Divorcio consensual - María González",
      caseNumber: "CASE-2024-001",
      client: "María González",
      status: "in_progress",
      priority: "high",
      category: "Derecho Familiar",
      startDate: "2024-01-01",
      lastUpdate: "2024-01-14",
      amount: 25000,
      description: "Proceso de divorcio consensual con distribución de bienes",
    },
    {
      id: "2",
      title: "Demanda laboral - Carlos Pérez",
      caseNumber: "CASE-2024-002", 
      client: "Carlos Pérez",
      status: "pending",
      priority: "medium",
      category: "Derecho Laboral",
      startDate: "2024-01-05",
      lastUpdate: "2024-01-13",
      amount: 15000,
      description: "Demanda por despido injustificado y compensaciones",
    },
    {
      id: "3",
      title: "Constitución de empresa - Tech Solutions",
      caseNumber: "CASE-2024-003",
      client: "Tech Solutions S.A.",
      status: "completed",
      priority: "low",
      category: "Derecho Corporativo",
      startDate: "2023-12-15",
      lastUpdate: "2024-01-12",
      amount: 35000,
      description: "Constitución legal de empresa tecnológica",
    },
    {
      id: "4",
      title: "Sucesión testamentaria - Familia Rodríguez",
      caseNumber: "CASE-2024-004",
      client: "Ana Rodríguez",
      status: "in_progress",
      priority: "medium",
      category: "Derecho Sucesorio",
      startDate: "2024-01-08",
      lastUpdate: "2024-01-14",
      amount: 20000,
      description: "Proceso de sucesión y distribución de herencia",
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
      case "cancelled":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Cancelado</Badge>;
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

  const filteredCases = casos.filter(caso => {
    const matchesSearch = caso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || caso.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mis Casos</h1>
          <p className="text-muted-foreground">
            Gestiona todos tus casos legales
          </p>
        </div>
        <Button asChild>
          <Link href="/area-de-trabajo/casos/nuevo">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Caso
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar casos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Grid */}
      <div className="grid gap-6">
        {filteredCases.map((caso) => (
          <Card key={caso.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{caso.title}</CardTitle>
                    {getPriorityBadge(caso.priority)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {caso.caseNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {caso.client}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Inicio: {caso.startDate}
                    </span>
                  </div>
                  <CardDescription>
                    {caso.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(caso.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/area-de-trabajo/casos/${caso.id}`}>
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/area-de-trabajo/casos/${caso.id}/editar`}>
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Cambiar estado
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Archivar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{caso.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Última actualización: {caso.lastUpdate}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">L. {caso.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Valor del caso</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron casos</h3>
            <p className="text-muted-foreground mb-4">
              No hay casos que coincidan con tu búsqueda.
            </p>
            <Button asChild>
              <Link href="/area-de-trabajo/casos/nuevo">
                <Plus className="w-4 h-4 mr-2" />
                Crear primer caso
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
