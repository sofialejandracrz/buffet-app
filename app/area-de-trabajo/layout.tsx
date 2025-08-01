"use client"

import type React from "react"

import { SidebarAbogado } from "@/components/sidebar-abogado"

export default function AreaDeTrabajoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { user, loading } = useAuth();

  // useEffect(() => {
  //   if (!loading && (!user || user.rol !== "Abogado")) {
  //     redirect("/auth/login");
  //   }
  // }, [user, loading]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  // if (!user || user.rol !== "Abogado") {
  //   return null;
  // }

  // Datos del abogado (cuando se implemente la autenticación)
  const userData = {
    name: "Dr. Juan Pérez",
    email: "juan.perez@bufete.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarAbogado user={userData} />

      {/* Contenido principal */}
      <div className="lg:pl-64">
        {/* Header móvil - espacio para el botón de menú */}
        <div className="lg:hidden h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-center h-full">
            <h1 className="font-semibold text-lg">Área de Trabajo</h1>
          </div>
        </div>

        {/* Área de contenido */}
        <main className="min-h-screen lg:min-h-screen">
          <div className="container mx-auto max-w-7xl p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
