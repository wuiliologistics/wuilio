"use client"

import { useState } from "react"
import { X, User, Building2, Users, Bell, Shield, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

type Section = "perfil" | "empresa" | "usuarios" | "notificaciones" | "seguridad"

export default function ConfiguracionesPage() {
  const [activeSection, setActiveSection] = useState<Section>("perfil")
  const router = useRouter()

  return (
    <div className="flex h-screen items-center justify-center bg-background/50 p-4">
      {/* Modal Container */}
      <div className="relative flex h-[600px] w-full max-w-4xl overflow-hidden rounded-lg border bg-card shadow-lg">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-3 top-3 z-10 h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => router.back()}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Left Sidebar */}
        <div className="w-52 border-r bg-muted/30 p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection("perfil")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeSection === "perfil"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              Perfil
            </button>
            <button
              onClick={() => setActiveSection("empresa")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeSection === "empresa"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Empresa
            </button>
            <button
              onClick={() => setActiveSection("usuarios")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeSection === "usuarios"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Usuarios
            </button>
            <button
              onClick={() => setActiveSection("notificaciones")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeSection === "notificaciones"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Bell className="h-4 w-4" />
              Notificaciones
            </button>
            <button
              onClick={() => setActiveSection("seguridad")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeSection === "seguridad"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Shield className="h-4 w-4" />
              Seguridad
            </button>
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeSection === "perfil" && <PerfilSection />}
            {activeSection === "empresa" && <EmpresaSection />}
            {activeSection === "usuarios" && <UsuariosSection />}
            {activeSection === "notificaciones" && <NotificacionesSection />}
            {activeSection === "seguridad" && <SeguridadSection />}
          </div>
        </div>
      </div>
    </div>
  )
}

function PerfilSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Información Personal</h2>
        <button className="mt-1 text-sm text-blue-600 hover:underline">Editar</button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/professional-headshot.png" alt="Juan Maldonado" />
            <AvatarFallback className="text-lg">JM</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-muted ring-2 ring-card">
            <User className="h-3 w-3" />
          </button>
        </div>
        <div>
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
            Administrador
          </Badge>
          <p className="mt-1 text-xs text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Nombre Completo</span>
          <span className="text-sm text-muted-foreground">Juan Carlos Maldonado</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Documento</span>
          <span className="text-sm text-muted-foreground">72326043</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Nacionalidad</span>
          <Select defaultValue="peru">
            <SelectTrigger className="w-48 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="peru">Peruana</SelectItem>
              <SelectItem value="chile">Chilena</SelectItem>
              <SelectItem value="colombia">Colombiana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Correo</span>
          <span className="text-sm text-muted-foreground">juan.maldonado@wuilio.com</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Contacto</span>
          <span className="text-sm text-muted-foreground">+51 912132679</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Cargo</span>
          <Select defaultValue="gerente">
            <SelectTrigger className="w-48 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gerente">Gerente de Exportación</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="operador">Operador</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Password Section */}
      <div className="mt-8 space-y-4 rounded-lg border p-4">
        <h3 className="font-semibold">Contraseña</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">••••••••••</p>
            <p className="mt-1 text-xs text-muted-foreground">Última actualización: hace 1 mes</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Key className="h-4 w-4" />
            Cambiar Contraseña
          </Button>
        </div>
      </div>
    </div>
  )
}

function EmpresaSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Información de Empresa</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Razón Social</span>
          <span className="text-sm text-muted-foreground">WUILIO PERU S.A.C.</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">RUC</span>
          <span className="text-sm text-muted-foreground">20123456789</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">País</span>
          <Select defaultValue="peru">
            <SelectTrigger className="w-48 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="peru">Perú</SelectItem>
              <SelectItem value="chile">Chile</SelectItem>
              <SelectItem value="colombia">Colombia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Dirección</span>
          <span className="text-sm text-muted-foreground">Av. Principal 123, Lima</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-medium">Teléfono</span>
          <span className="text-sm text-muted-foreground">+51 1 234 5678</span>
        </div>
      </div>
    </div>
  )
}

function UsuariosSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
        <Button size="sm">Agregar Usuario</Button>
      </div>
      <p className="text-sm text-muted-foreground">Administra los usuarios que tienen acceso al sistema.</p>
    </div>
  )
}

function NotificacionesSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Notificaciones</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="text-sm font-medium">Notificaciones por correo</p>
            <p className="text-xs text-muted-foreground">Recibe actualizaciones por email</p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="important">Importantes</SelectItem>
              <SelectItem value="none">Ninguna</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="text-sm font-medium">Notificaciones push</p>
            <p className="text-xs text-muted-foreground">Recibe notificaciones en el navegador</p>
          </div>
          <Select defaultValue="enabled">
            <SelectTrigger className="w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="enabled">Activadas</SelectItem>
              <SelectItem value="disabled">Desactivadas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function SeguridadSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Seguridad</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="text-sm font-medium">Autenticación de dos factores</p>
            <p className="text-xs text-muted-foreground">Agrega una capa extra de seguridad</p>
          </div>
          <Button variant="outline" size="sm">
            Configurar
          </Button>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="text-sm font-medium">Sesiones activas</p>
            <p className="text-xs text-muted-foreground">Administra tus sesiones</p>
          </div>
          <Button variant="outline" size="sm">
            Ver sesiones
          </Button>
        </div>
      </div>
    </div>
  )
}
