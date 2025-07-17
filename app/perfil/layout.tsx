import type React from "react"
import { Sidebar } from "@/components/sidebarPerfil"

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="lg:pl-64">
        {/* Header móvil - espacio para el botón de menú */}
        <div className="lg:hidden h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-center h-full">
            <h1 className="font-semibold text-lg">Panel Legal</h1>
          </div>
        </div>

        {/* Área de contenido */}
        <main className="min-h-screen lg:min-h-screen">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
