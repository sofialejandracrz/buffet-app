"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Breadcrumbs } from "@/components/breadcrumbsPerfil"
import {
  CreditCard,
  Search,
  Filter,
  Calendar,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
} from "lucide-react"
import { toast } from "sonner"

interface PaymentHistory {
  id: string
  date: string
  amount: number
  method: string
  reference: string
  status: "completed" | "pending" | "failed"
}

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface Invoice {
  id: string
  invoiceNumber: string
  caseId: string
  caseTitle: string
  issueDate: string
  dueDate: string
  totalAmount: number
  paidAmount: number
  status: "paid" | "pending" | "overdue" | "partial"
  lawyerName: string
  items: InvoiceItem[]
  paymentHistory: PaymentHistory[]
  notes: string
  attachments: string[]
}

const invoicesData: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2024-001",
    caseId: "1",
    caseTitle: "Consulta sobre Contrato de Arrendamiento",
    issueDate: "2024-01-28",
    dueDate: "2024-02-28",
    totalAmount: 350,
    paidAmount: 0,
    status: "pending",
    lawyerName: "Ana López Martínez",
    items: [
      {
        id: "item-1",
        description: "Consulta legal especializada",
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
      {
        id: "item-2",
        description: "Análisis de contrato de arrendamiento",
        quantity: 2,
        unitPrice: 75,
        total: 150,
      },
      {
        id: "item-3",
        description: "Informe legal detallado",
        quantity: 1,
        unitPrice: 50,
        total: 50,
      },
    ],
    paymentHistory: [],
    notes: "Pago a realizar tras la finalización satisfactoria del caso.",
    attachments: ["informe-legal-final.pdf", "contrato-analizado.pdf"],
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2024-002",
    caseId: "2",
    caseTitle: "Despido Improcedente",
    issueDate: "2024-02-01",
    dueDate: "2024-02-15",
    totalAmount: 500,
    paidAmount: 200,
    status: "partial",
    lawyerName: "Carlos Rodríguez Sánchez",
    items: [
      {
        id: "item-1",
        description: "Consulta inicial y análisis del caso",
        quantity: 1,
        unitPrice: 200,
        total: 200,
      },
      {
        id: "item-2",
        description: "Preparación de demanda",
        quantity: 1,
        unitPrice: 300,
        total: 300,
      },
    ],
    paymentHistory: [
      {
        id: "pay-1",
        date: "2024-02-05",
        amount: 200,
        method: "Tarjeta de crédito",
        reference: "TXN-20240205-001",
        status: "completed",
      },
    ],
    notes: "Pago parcial realizado. Pendiente el resto tras la vista judicial.",
    attachments: ["demanda-laboral.pdf"],
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2023-045",
    caseId: "5",
    caseTitle: "Constitución de Sociedad Limitada",
    issueDate: "2024-01-05",
    dueDate: "2024-01-20",
    totalAmount: 400,
    paidAmount: 400,
    status: "paid",
    lawyerName: "Elena Martín Torres",
    items: [
      {
        id: "item-1",
        description: "Constitución de sociedad",
        quantity: 1,
        unitPrice: 300,
        total: 300,
      },
      {
        id: "item-2",
        description: "Redacción de estatutos",
        quantity: 1,
        unitPrice: 100,
        total: 100,
      },
    ],
    paymentHistory: [
      {
        id: "pay-1",
        date: "2024-01-10",
        amount: 400,
        method: "Transferencia bancaria",
        reference: "TXN-20240110-002",
        status: "completed",
      },
    ],
    notes: "Pago completado. Servicio finalizado satisfactoriamente.",
    attachments: ["escritura-constitucion.pdf", "estatutos-sociales.pdf"],
  },
  {
    id: "inv-004",
    invoiceNumber: "INV-2024-003",
    caseId: "3",
    caseTitle: "Divorcio de Mutuo Acuerdo",
    issueDate: "2024-01-15",
    dueDate: "2024-01-30",
    totalAmount: 600,
    paidAmount: 0,
    status: "overdue",
    lawyerName: "María González Ruiz",
    items: [
      {
        id: "item-1",
        description: "Proceso de divorcio consensual",
        quantity: 1,
        unitPrice: 400,
        total: 400,
      },
      {
        id: "item-2",
        description: "Acuerdo de custodia compartida",
        quantity: 1,
        unitPrice: 200,
        total: 200,
      },
    ],
    paymentHistory: [],
    notes: "URGENTE: Factura vencida. Contactar para regularizar el pago.",
    attachments: ["convenio-regulador.pdf"],
  },
  {
    id: "inv-005",
    invoiceNumber: "INV-2024-004",
    caseId: "4",
    caseTitle: "Reclamación de Daños por Accidente",
    issueDate: "2024-02-10",
    dueDate: "2024-03-10",
    totalAmount: 750,
    paidAmount: 250,
    status: "partial",
    lawyerName: "Juan Pérez Sánchez",
    items: [
      {
        id: "item-1",
        description: "Consulta inicial y evaluación del caso",
        quantity: 1,
        unitPrice: 250,
        total: 250,
      },
      {
        id: "item-2",
        description: "Preparación de reclamación",
        quantity: 1,
        unitPrice: 300,
        total: 300,
      },
      {
        id: "item-3",
        description: "Representación legal",
        quantity: 1,
        unitPrice: 200,
        total: 200,
      },
    ],
    paymentHistory: [
      {
        id: "pay-1",
        date: "2024-02-12",
        amount: 250,
        method: "PayPal",
        reference: "PP-20240212-003",
        status: "completed",
      },
    ],
    notes: "Pago inicial realizado. Resto pendiente según avance del caso.",
    attachments: ["informe-medico.pdf", "parte-accidente.pdf"],
  },
]

const statusConfig = {
  paid: {
    label: "Pagada",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle,
  },
  pending: {
    label: "Pendiente",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: Clock,
  },
  overdue: {
    label: "Vencida",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: AlertTriangle,
  },
  partial: {
    label: "Parcial",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    icon: Clock,
  },
}

export default function PagosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "amount" | "status">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const filteredAndSortedInvoices = useMemo(() => {
    const filtered = invoicesData.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.lawyerName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "date":
          comparison = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime()
          break
        case "amount":
          comparison = a.totalAmount - b.totalAmount
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [searchTerm, statusFilter, sortBy, sortOrder])

  const getPaymentStats = () => {
    const stats = {
      total: invoicesData.reduce((sum, inv) => sum + inv.totalAmount, 0),
      paid: invoicesData.reduce((sum, inv) => sum + inv.paidAmount, 0),
      pending: invoicesData
        .filter((inv) => inv.status === "pending" || inv.status === "partial")
        .reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0),
      overdue: invoicesData
        .filter((inv) => inv.status === "overdue")
        .reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0),
    }
    return stats
  }

  const stats = getPaymentStats()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const handlePayment = (invoice: Invoice) => {
    toast.info("Procesando pago", {
      description: `Redirigiendo al sistema de pagos para la factura ${invoice.invoiceNumber}...`,
    })
    // Aquí iría la integración con el sistema de pagos real
  }

  const handleDownload = (invoiceNumber: string) => {
    toast.success("Descarga iniciada", {
      description: `Descargando factura ${invoiceNumber}...`,
    })
    // Aquí iría la lógica de descarga real
  }

  const StatusBadge = ({ status }: { status: Invoice["status"] }) => {
    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge variant="secondary" className={`${config.color} flex items-center gap-1 font-medium`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const InvoiceDetailModal = ({ invoice }: { invoice: Invoice }) => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Factura {invoice.invoiceNumber}
        </DialogTitle>
        <DialogDescription>Detalles completos de la factura</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Información general */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número:</span>
                <span className="font-medium">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Caso:</span>
                <span className="font-medium">{invoice.caseTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Abogado:</span>
                <span className="font-medium">{invoice.lawyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <StatusBadge status={invoice.status} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fechas e Importes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha emisión:</span>
                <span className="font-medium">{formatDate(invoice.issueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha vencimiento:</span>
                <span className="font-medium">{formatDate(invoice.dueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Importe total:</span>
                <span className="font-medium">{formatCurrency(invoice.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pagado:</span>
                <span className="font-medium text-green-600">{formatCurrency(invoice.paidAmount)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Pendiente:</span>
                <span className="text-red-600">{formatCurrency(invoice.totalAmount - invoice.paidAmount)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desglose de servicios */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Desglose de Servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Unitario</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Total:
                  </TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(invoice.totalAmount)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Historial de pagos */}
        {invoice.paymentHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historial de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoice.paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{formatCurrency(payment.amount)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(payment.date)} • {payment.method}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={payment.status === "completed" ? "default" : "secondary"}
                        className={
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : ""
                        }
                      >
                        {payment.status === "completed" ? "Completado" : "Pendiente"}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">{payment.reference}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notas y archivos adjuntos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invoice.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{invoice.notes}</p>
              </CardContent>
            </Card>
          )}

          {invoice.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Archivos Adjuntos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {invoice.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{attachment}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={() => handleDownload(invoice.invoiceNumber)} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </Button>
          {(invoice.status === "pending" || invoice.status === "partial" || invoice.status === "overdue") && (
            <Button onClick={() => handlePayment(invoice)} className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Pagar {formatCurrency(invoice.totalAmount - invoice.paidAmount)}
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  )

  return (
    <div className="space-y-6 p-6">
      <Breadcrumbs />

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pagos y Facturas</h1>
        <p className="text-muted-foreground">
          Gestiona tus facturas, realiza pagos y consulta el historial de transacciones.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">Total Facturado</div>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(stats.total)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="text-sm text-muted-foreground">Pagado</div>
            </div>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.paid)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div className="text-sm text-muted-foreground">Pendiente</div>
            </div>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(stats.pending)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div className="text-sm text-muted-foreground">Vencido</div>
            </div>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(stats.overdue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
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
                  placeholder="Buscar por número de factura, caso o abogado..."
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
                <SelectItem value="paid">Pagada</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="partial">Parcial</SelectItem>
                <SelectItem value="overdue">Vencida</SelectItem>
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
                <SelectItem value="amount-desc">Importe (mayor)</SelectItem>
                <SelectItem value="amount-asc">Importe (menor)</SelectItem>
                <SelectItem value="status-asc">Estado (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de facturas - Desktop */}
      <Card className="hidden md:block">
        <div className="relative">
          <div className="max-h-[600px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Factura</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Emisión</TableHead>
                  <TableHead>Fecha Vencimiento</TableHead>
                  <TableHead className="text-right">Importe</TableHead>
                  <TableHead className="text-right">Pendiente</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{invoice.invoiceNumber}</div>
                        <div className="text-sm text-muted-foreground">{invoice.caseTitle}</div>
                        <div className="text-xs text-muted-foreground">{invoice.lawyerName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(invoice.issueDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(invoice.dueDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(invoice.totalAmount)}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          invoice.totalAmount - invoice.paidAmount > 0 ? "text-red-600 font-medium" : "text-green-600"
                        }
                      >
                        {formatCurrency(invoice.totalAmount - invoice.paidAmount)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </Button>
                          </DialogTrigger>
                          {selectedInvoice && <InvoiceDetailModal invoice={selectedInvoice} />}
                        </Dialog>
                        {(invoice.status === "pending" ||
                          invoice.status === "partial" ||
                          invoice.status === "overdue") && (
                          <Button size="sm" onClick={() => handlePayment(invoice)}>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pagar Ahora
                          </Button>
                        )}
                      </div>
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
        {filteredAndSortedInvoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-base">{invoice.invoiceNumber}</CardTitle>
                  <p className="text-sm text-muted-foreground">{invoice.caseTitle}</p>
                  <p className="text-xs text-muted-foreground">{invoice.lawyerName}</p>
                </div>
                <StatusBadge status={invoice.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Emisión:</p>
                  <p className="font-medium">{formatDate(invoice.issueDate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Vencimiento:</p>
                  <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total:</p>
                  <p className="font-medium">{formatCurrency(invoice.totalAmount)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pendiente:</p>
                  <p
                    className={`font-medium ${
                      invoice.totalAmount - invoice.paidAmount > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {formatCurrency(invoice.totalAmount - invoice.paidAmount)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </DialogTrigger>
                  {selectedInvoice && <InvoiceDetailModal invoice={selectedInvoice} />}
                </Dialog>
                {(invoice.status === "pending" || invoice.status === "partial" || invoice.status === "overdue") && (
                  <Button className="w-full" onClick={() => handlePayment(invoice)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pagar Ahora ({formatCurrency(invoice.totalAmount - invoice.paidAmount)})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredAndSortedInvoices.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron facturas</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Aún no tienes facturas registradas"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
