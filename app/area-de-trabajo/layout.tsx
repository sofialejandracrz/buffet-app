"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function AreaDeTrabajoLayout({
  children,
}: {
  children: React.ReactNode;
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

  const lawyerNavItems = [
    {
      title: "Panel Principal",
      url: "/area-de-trabajo",
      icon: "LayoutDashboard",
    },
    {
      title: "Mis Casos",
      url: "/area-de-trabajo/casos",
      icon: "FolderOpen",
    },
    {
      title: "Mis Clientes",
      url: "/area-de-trabajo/clientes",
      icon: "Users",
    },
    {
      title: "Calendario",
      url: "/area-de-trabajo/calendario",
      icon: "Calendar",
    },
    {
      title: "Documentos",
      url: "/area-de-trabajo/documentos",
      icon: "FileText",
    },
    {
      title: "Configuración",
      url: "/area-de-trabajo/configuracion",
      icon: "Settings",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          navItems={lawyerNavItems}
          // user={{
          //   name: user.name || user.sub || "Usuario",
          //   email: user.email || user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "usuario@ejemplo.com",
          //   avatar: user.avatar
          // }}
          title="Área de Trabajo"
          subtitle="Panel del Abogado"
        />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
