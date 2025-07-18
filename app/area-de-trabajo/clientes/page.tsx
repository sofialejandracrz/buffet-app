"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search,
  Phone,
  Mail,
  MapPin,
  FileText,
  MoreHorizontal,
  User,
  Building,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function ClientesAbogado() {
  const [searchTerm, setSearchTerm] = useState("");

  // Datos simulados de clientes del abogado
  const clientes = [
    {
      id: "1",
      nombre: "María González",
      apellido: "Rodríguez",
      email: "maria.gonzalez@email.com",
      telefono: "+504 9876-5432",
      ubicacion: "Tegucigalpa, Honduras",
      avatar: "",
      fechaRegistro: "2023-12-01",
      ultimoContacto: "2024-01-14",
      casosActivos: 1,
      casosCompletados: 0,
      montoTotal: 25000,
      estado: "activo",
      tipoCliente: "individual",
    },
    {
      id: "2",
      nombre: "Carlos",
      apellido: "Pérez",
      email: "carlos.perez@email.com",
      telefono: "+504 8765-4321",
      ubicacion: "San Pedro Sula, Honduras",
      avatar: "",
      fechaRegistro: "2024-01-05",
      ultimoContacto: "2024-01-13",
      casosActivos: 1,
      casosCompletados: 0,
      montoTotal: 15000,
      estado: "activo",
      tipoCliente: "individual",
    },
    {
      id: "3",
      nombre: "Tech Solutions",
      apellido: "S.A.",
      email: "contacto@techsolutions.hn",
      telefono: "+504 2234-5678",
      ubicacion: "Tegucigalpa, Honduras",
      avatar: "",
      fechaRegistro: "2023-12-15",
      ultimoContacto: "2024-01-12",
      casosActivos: 0,
      casosCompletados: 1,
      montoTotal: 35000,
      estado: "activo",
      tipoCliente: "empresa",
    },
    {
      id: "4",
      nombre: "Ana",
      apellido: "Rodríguez",
      email: "ana.rodriguez@email.com",
      telefono: "+504 9988-7766",
      ubicacion: "La Ceiba, Honduras",
      avatar: "",
      fechaRegistro: "2024-01-08",
      ultimoContacto: "2024-01-14",
      casosActivos: 1,
      casosCompletados: 0,
      montoTotal: 20000,
      estado: "activo",
      tipoCliente: "individual",
    },
  ];

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Activo</Badge>;
      case "inactivo":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactivo</Badge>;
      case "pendiente":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getTipoClienteBadge = (tipo: string) => {
    switch (tipo) {
      case "individual":
        return <Badge variant="outline" className="flex items-center gap-1">
          <User className="h-3 w-3" />
          Individual
        </Badge>;
      case "empresa":
        return <Badge variant="outline" className="flex items-center gap-1">
          <Building className="h-3 w-3" />
          Empresa
        </Badge>;
      default:
        return <Badge variant="outline">Otro</Badge>;
    }
  };

  const filteredClientes = clientes.filter(cliente => {
    const searchString = `${cliente.nombre} ${cliente.apellido} ${cliente.email}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mis Clientes</h1>
          <p className="text-muted-foreground">
            Gestiona tu cartera de clientes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Exportar lista
          </Button>
          <Button>
            Agregar cliente
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientes.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientes.filter(c => c.estado === "activo").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Con casos en progreso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientes.reduce((sum, c) => sum + c.casosActivos, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              En todos los clientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              L. {clientes.reduce((sum, c) => sum + c.montoTotal, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              En todos los casos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nombre, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid gap-6">
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={cliente.avatar} />
                    <AvatarFallback>
                      {getInitials(cliente.nombre, cliente.apellido)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">
                        {cliente.nombre} {cliente.apellido}
                      </CardTitle>
                      {getTipoClienteBadge(cliente.tipoCliente)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {cliente.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {cliente.telefono}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {cliente.ubicacion}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getEstadoBadge(cliente.estado)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/area-de-trabajo/clientes/${cliente.id}`}>
                          Ver perfil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Crear caso
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Enviar mensaje
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Editar información
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{cliente.casosActivos}</p>
                  <p className="text-sm text-muted-foreground">Casos Activos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{cliente.casosCompletados}</p>
                  <p className="text-sm text-muted-foreground">Completados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">L. {cliente.montoTotal.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{cliente.ultimoContacto}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Último Contacto</p>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/area-de-trabajo/clientes/${cliente.id}`}>
                    Ver perfil completo
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  Crear caso
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Contactar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron clientes</h3>
            <p className="text-muted-foreground mb-4">
              No hay clientes que coincidan con tu búsqueda.
            </p>
            <Button>
              Agregar primer cliente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
