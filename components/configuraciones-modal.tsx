"use client"

import { useState } from "react"
import { X, User, Building2, Users, Bell, Plug, Shield } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Section = "perfil" | "empresa" | "usuarios" | "notificaciones" | "integraciones" | "seguridad"

interface ConfiguracionesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

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
        <DialogContent className="!max-w-3xl w-full h-[520px] p-0 overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-md">
          <div className="flex h-full">
            {/* Botón de cierre */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4 z-10 h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Sidebar */}
            <div className="w-56 border-r bg-muted/30 p-4 pt-16">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        activeSection === section.id
                          ? "bg-accent text-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {activeSection === "perfil" && <PerfilSection />}
              {activeSection === "empresa" && <EmpresaSection />}
              {activeSection === "usuarios" && <UsuariosSection onAddUser={() => setShowAddUserModal(true)} />}
              {activeSection === "notificaciones" && <NotificacionesSection />}
              {activeSection === "integraciones" && <IntegracionesSection />}
              {activeSection === "seguridad" && <SeguridadSection />}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddUserModal open={showAddUserModal} onOpenChange={setShowAddUserModal} />
      <ChangePasswordModal open={showChangePasswordModal} onOpenChange={setShowChangePasswordModal} />
    </>
  )
}

/* === estilos base === */
const inputClass =
  "h-9 w-full rounded-md bg-muted/40 border border-border text-sm text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none px-3 placeholder:text-muted-foreground"
const sectionTitle = "text-xl font-semibold tracking-tight mb-6"

/* === Sección: Perfil === */
function PerfilSection() {
  const [nombre, setNombre] = useState("Juan Carlos Maldonado")
  const [documento, setDocumento] = useState("72326043")
  const [correo, setCorreo] = useState("juan.maldonado@wuilio.com")
  const [contacto, setContacto] = useState("+51 912132679")

  return (
    <div className="py-0 pb-0 space-y-6 my-0 mb-0 mt-0">
      <h2 className={sectionTitle}>Información Personal</h2>

      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 ring-2 ring-border">
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <div>
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
            Administrador
          </Badge>
          <p className="mt-1 text-xs text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</p>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Nombre Completo</Label>
          <Input value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>Documento</Label>
          <Input value={documento} onChange={(e) => setDocumento(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>Nacionalidad</Label>
          <Select defaultValue="peru">
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="peru">Peruana</SelectItem>
              <SelectItem value="chile">Chilena</SelectItem>
              <SelectItem value="colombia">Colombiana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Correo</Label>
          <Input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>Contacto</Label>
          <Input value={contacto} onChange={(e) => setContacto(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>Cargo</Label>
          <Select defaultValue="gerente">
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gerente">Gerente de Exportación</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="operador">Operador</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

/* === Sección: Empresa === */
function EmpresaSection() {
  const [razonSocial, setRazonSocial] = useState("WUILIO PERU S.A.C.")
  const [ruc, setRuc] = useState("20123456789")
  const [direccion, setDireccion] = useState("Av. Principal 123, Lima")
  const [telefono, setTelefono] = useState("+51 1 234 5678")

  return (
    <div className="space-y-6">
      <h2 className={sectionTitle}>Información de Empresa</h2>

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Razón Social</Label>
          <Input value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>RUC</Label>
          <Input value={ruc} onChange={(e) => setRuc(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>País</Label>
          <Select defaultValue="peru">
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="peru">Perú</SelectItem>
              <SelectItem value="chile">Chile</SelectItem>
              <SelectItem value="colombia">Colombia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Dirección</Label>
          <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>Teléfono</Label>
          <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} className={inputClass} />
        </div>
      </div>
    </div>
  )
}

/* === Usuarios === */
function UsuariosSection({ onAddUser }: { onAddUser: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={sectionTitle}>Gestión de Usuarios</h2>
        <Button onClick={onAddUser} size="sm" className="bg-blue-600 hover:bg-blue-700">
          Agregar Usuario
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">Administra los usuarios que tienen acceso al sistema.</p>
    </div>
  )
}

/* === Notificaciones === */
function NotificacionesSection() {
  return (
    <div className="space-y-6">
      <h2 className={sectionTitle}>Notificaciones</h2>

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Notificaciones por correo</Label>
          <Select defaultValue="all">
            <SelectTrigger className={inputClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="important">Importantes</SelectItem>
              <SelectItem value="none">Ninguna</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Notificaciones push</Label>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  )
}

/* === Integraciones === */
function IntegracionesSection() {
  return (
    <div className="space-y-6">
      <h2 className={sectionTitle}>Integraciones</h2>
      <p className="text-sm text-muted-foreground">Conecta servicios externos y APIs.</p>
    </div>
  )
}

/* === Seguridad === */
function SeguridadSection() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <div className="space-y-6">
      <h2 className={sectionTitle}>Seguridad</h2>

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Contraseña Actual</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Nueva Contraseña</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Confirmar Contraseña</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Actualizar Contraseña
          </Button>
        </div>

        <Separator />

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="font-medium">Autenticación de dos factores</p>
            <p className="text-xs text-muted-foreground">Agrega una capa extra de seguridad</p>
          </div>
          <Button variant="outline" size="sm">
            Configurar
          </Button>
        </div>
      </div>
    </div>
  )
}

/* === Modales === */
function AddUserModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <div className="space-y-6 text-sm">
          <div>
            <h3 className="text-lg font-semibold">Agregar Usuario</h3>
            <p className="text-muted-foreground">Añade miembros a tu equipo</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="usuario@ejemplo.com" className={inputClass} />
            </div>

            <div className="space-y-2">
              <Label>Rol</Label>
              <Select defaultValue="miembro">
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="miembro">Miembro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Invitar</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ChangePasswordModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <div className="space-y-6 text-sm">
          <h3 className="text-lg font-semibold">Cambiar Contraseña</h3>
          <div className="space-y-3">
            <Input type="password" placeholder="Contraseña actual" className={inputClass} />
            <Input type="password" placeholder="Nueva contraseña" className={inputClass} />
            <Input type="password" placeholder="Confirmar nueva contraseña" className={inputClass} />
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
