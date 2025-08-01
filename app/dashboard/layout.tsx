import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SidebarAdmin } from "@/components/sidebar-admin"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <SidebarAdmin />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
