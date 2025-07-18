# API Documentation - Buffet Legal System

## Resumen de Controllers y Endpoints

### 1. **CasesController** (`/api/cases`)
**Gestión completa de casos legales**

#### Endpoints principales:
- `GET /api/cases` - Obtener lista de casos con filtros y paginación
- `GET /api/cases/{id}` - Obtener detalles completos de un caso
- `POST /api/cases` - Crear nuevo caso
- `PUT /api/cases/{id}` - Actualizar caso existente
- `DELETE /api/cases/{id}` - Eliminar caso (soft delete)
- `POST /api/cases/{id}/timeline` - Agregar evento al timeline
- `PUT /api/cases/{id}/status` - Cambiar estado del caso
- `PUT /api/cases/{id}/assign` - Asignar abogado al caso

**Características avanzadas:**
- Filtros por estado, tipo, abogado, cliente, fecha
- Búsqueda por texto completo
- Paginación y ordenamiento
- Timeline de eventos
- Manejo de permisos por rol
- Auditoría completa

---

### 2. **PaymentsController** (`/api/payments`)
**Sistema completo de pagos y facturación**

#### Endpoints principales:
- `GET /api/payments` - Lista de pagos con filtros
- `GET /api/payments/{id}` - Detalles de pago específico
- `POST /api/payments` - Crear nuevo pago
- `PUT /api/payments/{id}/process` - Procesar pago
- `GET /api/payments/overdue` - Pagos vencidos
- `POST /api/payments/{id}/send-reminder` - Enviar recordatorio
- `GET /api/payments/stats` - Estadísticas de pagos

**Características avanzadas:**
- Multiple métodos de pago
- Gestión de pagos vencidos
- Recordatorios automáticos
- Reportes financieros
- Integración con sistema de contratos

---

### 3. **ProfileController** (`/api/profile`)
**Gestión de perfiles de usuario**

#### Endpoints principales:
- `GET /api/profile` - Obtener perfil del usuario actual
- `PUT /api/profile` - Actualizar perfil
- `PUT /api/profile/password` - Cambiar contraseña
- `POST /api/profile/avatar` - Subir avatar
- `GET /api/profile/activity` - Actividad reciente
- `GET /api/profile/notifications` - Configuración de notificaciones

**Características avanzadas:**
- Manejo seguro de contraseñas
- Upload de avatares
- Historial de actividad
- Configuración personalizada

---

### 4. **ServicesController** (`/api/services`)
**Catálogo de servicios legales**

#### Endpoints principales:
- `GET /api/services` - Lista de servicios disponibles
- `GET /api/services/{id}` - Detalles de servicio
- `POST /api/services/{id}/request` - Solicitar servicio
- `GET /api/services/categories` - Categorías de servicios
- `GET /api/services/popular` - Servicios más populares

**Características avanzadas:**
- Categorización de servicios
- Pricing dinámico
- Sistema de solicitudes
- Métricas de popularidad

---

### 5. **DashboardController** (`/api/dashboard`)
**Dashboard principal para administradores**

#### Endpoints principales:
- `GET /api/dashboard/stats` - Estadísticas generales
- `GET /api/dashboard/recent-activity` - Actividad reciente
- `GET /api/dashboard/charts/cases` - Gráficos de casos
- `GET /api/dashboard/charts/revenue` - Gráficos de ingresos
- `GET /api/dashboard/alerts` - Alertas del sistema
- `GET /api/dashboard/performance` - Métricas de rendimiento

**Características avanzadas:**
- Métricas en tiempo real
- Gráficos dinámicos
- Sistema de alertas
- Análisis de tendencias

---

### 6. **AreaTrabajoController** (`/api/area-trabajo`)
**Área de trabajo especializada para abogados**

#### Endpoints principales:
- `GET /api/area-trabajo/dashboard` - Dashboard del abogado
- `GET /api/area-trabajo/casos` - Casos asignados al abogado
- `GET /api/area-trabajo/clientes` - Clientes del abogado
- `GET /api/area-trabajo/calendario` - Calendario de citas
- `GET /api/area-trabajo/productivity` - Métricas de productividad

**Características avanzadas:**
- Vista especializada para abogados
- Gestión de carga de trabajo
- Métricas de productividad
- Calendario integrado

---

### 7. **AdminController** (`/api/admin`)
**Panel de administración del sistema**

#### Endpoints principales:
- `GET /api/admin/dashboard` - Dashboard administrativo
- `GET /api/admin/users` - Gestión de usuarios
- `POST /api/admin/users` - Crear usuario
- `PUT /api/admin/users/{id}` - Actualizar usuario
- `DELETE /api/admin/users/{id}` - Eliminar usuario
- `GET /api/admin/system/config` - Configuración del sistema
- `GET /api/admin/audit-logs` - Logs de auditoría

**Características avanzadas:**
- Gestión completa de usuarios
- Configuración del sistema
- Auditoría y logs
- Métricas del sistema

---

### 8. **DocumentsController** (`/api/documents`)
**Gestión de documentos del sistema**

#### Endpoints principales:
- `GET /api/documents` - Lista de documentos
- `GET /api/documents/{id}` - Detalles de documento
- `POST /api/documents/upload` - Subir documento
- `GET /api/documents/{id}/download` - Descargar documento
- `GET /api/documents/case/{caseId}` - Documentos de un caso

**Características avanzadas:**
- Upload seguro de archivos
- Control de acceso por permisos
- Versionado de documentos
- Preview de documentos
- Gestión de metadatos

---

### 9. **CommunicationsController** (`/api/communications`)
**Sistema de mensajería y notificaciones**

#### Endpoints principales:
- `GET /api/communications/conversations` - Lista de conversaciones
- `GET /api/communications/conversations/{id}/messages` - Mensajes
- `POST /api/communications/conversations/{id}/messages` - Enviar mensaje
- `GET /api/communications/notifications` - Notificaciones
- `PUT /api/communications/notifications/{id}/read` - Marcar como leída

**Características avanzadas:**
- Chat en tiempo real
- Notificaciones push
- Historial de conversaciones
- Adjuntos en mensajes

---

### 10. **ReportsController** (`/api/reports`)
**Sistema de reportes y analytics**

#### Endpoints principales:
- `GET /api/reports/dashboard` - Métricas del dashboard
- `GET /api/reports/cases/by-status` - Casos por estado
- `GET /api/reports/revenue` - Reportes de ingresos
- `GET /api/reports/lawyer-productivity` - Productividad de abogados
- `POST /api/reports/custom` - Reportes personalizados

**Características avanzadas:**
- Reportes dinámicos
- Exportación a múltiples formatos
- Análisis de tendencias
- Métricas personalizables

---

## Características Generales del Sistema

### 🔐 **Seguridad y Autenticación**
- JWT Token-based authentication
- Autorización basada en roles (Cliente, Abogado, Administrador)
- Validación de permisos en cada endpoint
- Auditoría completa de acciones

### 📊 **Paginación y Filtros**
- Paginación estándar en todos los listados
- Filtros avanzados por múltiples criterios
- Búsqueda por texto completo
- Ordenamiento flexible

### 🎯 **Respuestas Estandarizadas**
- Formato de respuesta consistente
- Manejo de errores centralizado
- Códigos de estado HTTP apropiados
- Mensajes descriptivos

### 📝 **Auditoría y Logs**
- Registro completo de acciones
- Tracking de cambios
- Logs de seguridad
- Métricas de uso

### 🔄 **Integración y Extensibilidad**
- Arquitectura modular
- DTOs bien definidos
- Separación de responsabilidades
- Fácil extensión para nuevas funcionalidades

---

## Patrones de Desarrollo Implementados

### ✅ **Clean Architecture**
- Separación clara entre capas
- Dependencias bien definidas
- Fácil testing y mantenimiento

### ✅ **Repository Pattern**
- Abstracción de acceso a datos
- Facilita testing con mocks
- Consistencia en operaciones CRUD

### ✅ **DTO Pattern**
- Transferencia segura de datos
- Validación en el boundary
- Versionado de API facilitado

### ✅ **SOLID Principles**
- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

---

## Tecnologías y Herramientas

### Backend
- **ASP.NET Web API 2** - Framework principal
- **Entity Framework 6** - ORM
- **SQL Server** - Base de datos
- **JWT** - Autenticación
- **AutoMapper** - Mapeo de objetos

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Shadcn/ui** - Componentes UI
- **Lucide React** - Iconografía

### Herramientas de Desarrollo
- **Visual Studio Code** - Editor
- **Git** - Control de versiones
- **Postman** - Testing de API
- **Azure DevOps** - CI/CD (recomendado)

---

## Estado del Proyecto

### ✅ **Completado**
- Estructura completa de controllers
- Sistema de autenticación y autorización
- Dashboard para los 3 tipos de usuarios
- Gestión completa de casos
- Sistema de pagos
- Gestión de documentos
- Comunicaciones y notificaciones
- Reportes y analytics
- Frontend completo para área de trabajo

### 🚧 **En Desarrollo/Pendiente**
- Integración con pasarelas de pago reales
- Sistema de notificaciones push
- Testing unitario e integración
- Documentación completa de API
- Deployment y CI/CD

### 🎯 **Próximos Pasos**
1. Testing exhaustivo de todos los endpoints
2. Integración completa frontend-backend
3. Optimización de performance
4. Documentación técnica completa
5. Deployment a producción

---

**Nota**: Este sistema está diseñado siguiendo las mejores prácticas de la industria y estándares de empresas Big Tech. Cada controller implementa patrones robustos, manejo de errores, seguridad, y escalabilidad.
