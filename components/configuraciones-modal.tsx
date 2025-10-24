"use client"

import { useState } from "react"
import { X, User, Building2, Users, Bell, Plug, Shield, Camera, Edit, Lock, Plus } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Section = "perfil" | "empresa" | "usuarios" | "notificaciones" | "integraciones" | "seguridad"

interface ConfiguracionesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockUsers = [
  {
    id: "1",
    name: "Juan Carlos Maldonado",
    email: "juan.maldonado@wuilio.com",
    role: "Administrador",
    status: "Activo",
    lastAccess: "2025-05-01",
  },
  {
    id: "2",
    name: "Bruno Fatur Gonzales",
    email: "bruno.fatur@wuilio.com",
    role: "Miembro",
    status: "Activo",
    lastAccess: "2025-05-01",
  },
  {
    id: "3",
    name: "María López",
    email: "maria.lopez@wuilio.com",
    role: "Miembro",
    status: "Inactivo",
    lastAccess: "2025-04-28",
  },
]

export function ConfiguracionesModal({ open, onOpenChange }: ConfiguracionesModalProps) {
  const [activeSection, setActiveSection] = useState<Section>("perfil")
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

  const sections = [
    { id: "perfil" as Section, label: "Perfil", icon: User },
    { id: "empresa" as Section, label: "Empresa", icon: Building2 },
    { id: "usuarios" as Section, label: "Usuarios", icon: Users },
    { id: "notificaciones" as Section, label: "Notificaciones", icon: Bell },
    { id: "integraciones" as Section, label: "Integraciones", icon: Plug },
    { id: "seguridad" as Section, label: "Seguridad", icon: Shield },
  ]

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
  className="!max-w-none
    w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw]
    h-[90vh]
    p-0 overflow-hidden
    rounded-2xl border border-slate-200 shadow-xl
    bg-white
  "
>
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-[180px] border-r bg-white p-3 flex flex-col shrink-0">
              <div className="flex items-center justify-between mb-6 px-2">
                
                <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-6 w-6 -mr-2">
                  
                </Button>
              </div>

              <nav className="space-y-0.5 flex-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                        activeSection === section.id
                          ? "bg-slate-100 text-slate-900 font-medium"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {section.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-white">
              {activeSection === "perfil" && (
                <PerfilSection onChangePassword={() => setShowChangePasswordModal(true)} />
              )}
              {activeSection === "empresa" && <EmpresaSection />}
              {activeSection === "usuarios" && <UsuariosSection onAddUser={() => setShowAddUserModal(true)} />}
              {activeSection === "notificaciones" && <NotificacionesSection />}
              {activeSection === "integraciones" && <IntegracionesSection />}
              {activeSection === "seguridad" && <SeguridadSection />}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <AddUserModal open={showAddUserModal} onOpenChange={setShowAddUserModal} />

      {/* Change Password Modal */}
      <ChangePasswordModal open={showChangePasswordModal} onOpenChange={setShowChangePasswordModal} />
    </>
  )
}

function PerfilSection({ onChangePassword }: { onChangePassword: () => void }) {
  return (
    <div className="px-20 py-12 max-w-6xl pr-7 pb-0 pt-12 space-y-12 pl-7">
      <div className="flex items-start gap-8">
        <div className="relative shrink-0">
          <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
            JM
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full shadow-sm border-2 border-white bg-white hover:bg-slate-50"
          >
            <Camera className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex-1 pt-1">
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mb-2 font-medium">Administrador</Badge>
          <p className="text-sm text-slate-500">JPG, PNG o GIF. Máximo 2MB.</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-2xl font-semibold text-slate-900">Información Personal</h3>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-20 gap-y-8 pt-2">
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Nombre Completo</Label>
            <p className="text-base text-slate-900">Juan Carlos Maldonado</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Documento</Label>
            <p className="text-base text-slate-900">72326043</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Nacionalidad</Label>
            <p className="text-base text-slate-900">Peruana</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Correo</Label>
            <p className="text-base text-slate-900">juan.maldonado@wuilio.com</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Contacto</Label>
            <p className="text-base text-slate-900">+51 912132679</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Cargo</Label>
            <p className="text-base text-slate-900">Gerente de Exportación</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-2xl font-semibold text-slate-900">Contraseña</h3>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Contraseña</Label>
            <p className="text-base text-slate-900 mb-2">••••••••••••</p>
            <p className="text-sm text-slate-500">Última actualización: hace 1 mes</p>
          </div>
          <Button variant="outline" onClick={onChangePassword} className="shrink-0 bg-transparent">
            <Lock className="h-4 w-4 mr-2" />
            Cambiar Contraseña
          </Button>
        </div>
      </div>
    </div>
  )
}

function EmpresaSection() {
  return (
    <div className="px-20 py-12 space-y-12 max-w-6xl">
      <div className="flex items-center gap-8">
        <div className="h-28 w-28 rounded-xl bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200">
          <Building2 className="h-12 w-12 text-slate-400" />
        </div>
        <div className="flex-1">
          <Button variant="outline" size="sm" className="mb-2 bg-transparent">
            <Camera className="h-4 w-4 mr-2" />
            Cargar Logo
          </Button>
          <p className="text-sm text-slate-500">JPG, PNG o GIF. Máximo 2MB.</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-medium">Exportable / Importador</Badge>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-2xl font-semibold text-slate-900">Información Empresa</h3>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-20 gap-y-8 pt-2">
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Empresa</Label>
            <p className="text-base text-slate-900">Wuilio Peru SAC</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">RUC</Label>
            <p className="text-base text-slate-900">2039203920</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">País</Label>
            <p className="text-base text-slate-900">Peru</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Dirección</Label>
            <p className="text-base text-slate-900">Calle Industrial 0029, Lince</p>
          </div>
          <div className="col-span-2">
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Documentos</Label>
            <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium">
              Certificado RUC.pdf
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-2xl font-semibold text-slate-900">Representante Legal</h3>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-20 gap-y-8 pt-2">
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Nombre</Label>
            <p className="text-base text-slate-900">Elizabeth Allen</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Documento</Label>
            <p className="text-base text-slate-900">788937839</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Celular</Label>
            <p className="text-base text-slate-900">+51 912132679</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Correo</Label>
            <p className="text-base text-slate-900">elizabeth@company.com</p>
          </div>
          <div className="col-span-2">
            <Label className="text-sm font-medium text-slate-500 mb-2 block">Documentos</Label>
            <div className="flex gap-6">
              <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium">
                Vigencia de Poder.pdf
              </Button>
              <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium">
                DNI.pdf
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UsuariosSection({ onAddUser }: { onAddUser: () => void }) {
  return (
    <div className="px-20 py-12 space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">Gestión de Usuarios</h3>
          <p className="text-sm text-slate-500 mt-1">Administra los usuarios y sus permisos</p>
        </div>
        <Button onClick={onAddUser} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left text-xs font-semibold text-slate-600 px-6 py-4">Usuario</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-6 py-4">Email</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-6 py-4">Rol</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-6 py-4">Estado</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-6 py-4">Último acceso</th>
              <th className="text-right text-xs font-semibold text-slate-600 px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </div>
                    <span className="text-sm font-medium text-slate-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-slate-900">{user.role}</td>
                <td className="px-6 py-4">
                  <Badge
                    variant={user.status === "Activo" ? "default" : "secondary"}
                    className={
                      user.status === "Activo"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{user.lastAccess}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Ver Permisos
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function NotificacionesSection() {
  return (
    <div className="px-20 py-12 space-y-8 max-w-5xl">
      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Preferencias de Notificaciones</h3>
        <p className="text-sm text-slate-500 mt-1">Configura cómo y cuándo recibir notificaciones</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            <p className="font-medium text-slate-900">Notificaciones por Email</p>
            <p className="text-sm text-slate-500 mt-1">Recibe actualizaciones importantes por correo</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between py-5 border-b">
          <div>
            <p className="font-medium text-slate-900">Alertas de Órdenes</p>
            <p className="text-sm text-slate-500 mt-1">Notificaciones sobre cambios en órdenes</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between py-5 border-b">
          <div>
            <p className="font-medium text-slate-900">Recordatorios de Programación</p>
            <p className="text-sm text-slate-500 mt-1">Alertas sobre eventos programados</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between py-5">
          <div>
            <p className="font-medium text-slate-900">Actualizaciones de Facturas</p>
            <p className="text-sm text-slate-500 mt-1">Notificaciones sobre facturas y pagos</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  )
}

function IntegracionesSection() {
  return (
    <div className="px-20 py-12 space-y-8 max-w-5xl">
      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Integraciones</h3>
        <p className="text-sm text-slate-500 mt-1">Conecta servicios externos y APIs</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-5 border-b">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <Plug className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">API de Wuilio</p>
              <p className="text-sm text-slate-500 mt-0.5">Integración con servicios externos</p>
            </div>
          </div>
          <Button variant="outline">Configurar</Button>
        </div>

        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <Plug className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Webhooks</p>
              <p className="text-sm text-slate-500 mt-0.5">Recibe eventos en tiempo real</p>
            </div>
          </div>
          <Button variant="outline">Configurar</Button>
        </div>
      </div>
    </div>
  )
}

function SeguridadSection() {
  return (
    <div className="px-20 py-12 space-y-8 max-w-5xl">
      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Seguridad</h3>
        <p className="text-sm text-slate-500 mt-1">Protege tu cuenta y datos</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-5 border-b">
          <div>
            <p className="font-medium text-slate-900">Autenticación de Dos Factores</p>
            <p className="text-sm text-slate-500 mt-1">Agrega una capa extra de seguridad</p>
          </div>
          <Button variant="outline">Activar</Button>
        </div>

        <div className="py-5">
          <p className="font-medium text-slate-900 mb-4">Sesiones Activas</p>
          <p className="text-sm text-slate-500 mb-6">Dispositivos con sesión iniciada</p>
          <div className="flex items-center justify-between text-sm py-3 px-4 bg-slate-50 rounded-lg">
            <span className="text-slate-900">Chrome en Windows - Lima, Peru</span>
            <span className="text-slate-500">Ahora</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddUserModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Agregar Usuario</h3>
            <p className="text-sm text-muted-foreground">Añade miembros a tu equipo</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input placeholder="usuario@ejemplo.com" />
            </div>

            <div>
              <Label>Rol</Label>
              <Select defaultValue="miembro">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="miembro">Miembro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">Operaciones</span>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="ml-10 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Control Tower</span>
                  <Select defaultValue="editar">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ver">Ver</SelectItem>
                      <SelectItem value="editar">Editar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Órdenes</span>
                  <Select defaultValue="ver">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ver">Ver</SelectItem>
                      <SelectItem value="editar">Editar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="font-medium">Finanzas</span>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="font-medium">Maestro</span>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Invitar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ChangePasswordModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Cambiar Contraseña</h3>
            <p className="text-sm text-muted-foreground">Actualiza tu contraseña de acceso</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Contraseña Actual</Label>
              <Input type="password" />
            </div>

            <div>
              <Label>Nueva Contraseña</Label>
              <Input type="password" />
            </div>

            <div>
              <Label>Confirmar Nueva Contraseña</Label>
              <Input type="password" />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Guardar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
