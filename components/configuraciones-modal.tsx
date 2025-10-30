"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  X,
  User,
  Building2,
  Users,
  Plug,
  Shield,
  Upload,
  Camera,
  MoreHorizontalIcon,
  Package,
  FileText,
  Grid3x3,
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast, Toaster } from "sonner"

// All countries in the world for País de Nacimiento
const TODOS_LOS_PAISES = [
  { value: "afganistan", label: "Afganistán" },
  { value: "albania", label: "Albania" },
  { value: "alemania", label: "Alemania" },
  { value: "andorra", label: "Andorra" },
  { value: "angola", label: "Angola" },
  { value: "antigua-y-barbuda", label: "Antigua y Barbuda" },
  { value: "arabia-saudita", label: "Arabia Saudita" },
  { value: "argelia", label: "Argelia" },
  { value: "argentina", label: "Argentina" },
  { value: "armenia", label: "Armenia" },
  { value: "australia", label: "Australia" },
  { value: "austria", label: "Austria" },
  { value: "azerbaiyan", label: "Azerbaiyán" },
  { value: "bahamas", label: "Bahamas" },
  { value: "banglades", label: "Bangladés" },
  { value: "barbados", label: "Barbados" },
  { value: "barein", label: "Baréin" },
  { value: "belgica", label: "Bélgica" },
  { value: "belice", label: "Belice" },
  { value: "benin", label: "Benín" },
  { value: "bielorrusia", label: "Bielorrusia" },
  { value: "birmania", label: "Birmania" },
  { value: "bolivia", label: "Bolivia" },
  { value: "bosnia-herzegovina", label: "Bosnia y Herzegovina" },
  { value: "botsuana", label: "Botsuana" },
  { value: "brasil", label: "Brasil" },
  { value: "brunei", label: "Brunéi" },
  { value: "bulgaria", label: "Bulgaria" },
  { value: "burkina-faso", label: "Burkina Faso" },
  { value: "burundi", label: "Burundi" },
  { value: "butan", label: "Bután" },
  { value: "cabo-verde", label: "Cabo Verde" },
  { value: "camboya", label: "Camboya" },
  { value: "camerun", label: "Camerún" },
  { value: "canada", label: "Canadá" },
  { value: "catar", label: "Catar" },
  { value: "chad", label: "Chad" },
  { value: "chile", label: "Chile" },
  { value: "china", label: "China" },
  { value: "chipre", label: "Chipre" },
  { value: "colombia", label: "Colombia" },
  { value: "comoras", label: "Comoras" },
  { value: "corea-del-norte", label: "Corea del Norte" },
  { value: "corea-del-sur", label: "Corea del Sur" },
  { value: "costa-de-marfil", label: "Costa de Marfil" },
  { value: "costa-rica", label: "Costa Rica" },
  { value: "croacia", label: "Croacia" },
  { value: "cuba", label: "Cuba" },
  { value: "dinamarca", label: "Dinamarca" },
  { value: "dominica", label: "Dominica" },
  { value: "ecuador", label: "Ecuador" },
  { value: "egipto", label: "Egipto" },
  { value: "el-salvador", label: "El Salvador" },
  { value: "emiratos-arabes", label: "Emiratos Árabes Unidos" },
  { value: "eritrea", label: "Eritrea" },
  { value: "eslovaquia", label: "Eslovaquia" },
  { value: "eslovenia", label: "Eslovenia" },
  { value: "espana", label: "España" },
  { value: "estados-unidos", label: "Estados Unidos" },
  { value: "estonia", label: "Estonia" },
  { value: "etiopia", label: "Etiopía" },
  { value: "filipinas", label: "Filipinas" },
  { value: "finlandia", label: "Finlandia" },
  { value: "fiyi", label: "Fiyi" },
  { value: "francia", label: "Francia" },
  { value: "gabon", label: "Gabón" },
  { value: "gambia", label: "Gambia" },
  { value: "georgia", label: "Georgia" },
  { value: "ghana", label: "Ghana" },
  { value: "granada", label: "Granada" },
  { value: "grecia", label: "Grecia" },
  { value: "guatemala", label: "Guatemala" },
  { value: "guinea", label: "Guinea" },
  { value: "guinea-bissau", label: "Guinea-Bisáu" },
  { value: "guinea-ecuatorial", label: "Guinea Ecuatorial" },
  { value: "guyana", label: "Guyana" },
  { value: "haiti", label: "Haití" },
  { value: "honduras", label: "Honduras" },
  { value: "hungria", label: "Hungría" },
  { value: "india", label: "India" },
  { value: "indonesia", label: "Indonesia" },
  { value: "irak", label: "Irak" },
  { value: "iran", label: "Irán" },
  { value: "irlanda", label: "Irlanda" },
  { value: "islandia", label: "Islandia" },
  { value: "israel", label: "Israel" },
  { value: "italia", label: "Italia" },
  { value: "jamaica", label: "Jamaica" },
  { value: "japon", label: "Japón" },
  { value: "jordania", label: "Jordania" },
  { value: "kazajistan", label: "Kazajistán" },
  { value: "kenia", label: "Kenia" },
  { value: "kirguistan", label: "Kirguistán" },
  { value: "kiribati", label: "Kiribati" },
  { value: "kuwait", label: "Kuwait" },
  { value: "laos", label: "Laos" },
  { value: "lesoto", label: "Lesoto" },
  { value: "letonia", label: "Letonia" },
  { value: "libano", label: "Líbano" },
  { value: "liberia", label: "Liberia" },
  { value: "libia", label: "Libia" },
  { value: "liechtenstein", label: "Liechtenstein" },
  { value: "lituania", label: "Lituania" },
  { value: "luxemburgo", label: "Luxemburgo" },
  { value: "macedonia", label: "Macedonia del Norte" },
  { value: "madagascar", label: "Madagascar" },
  { value: "malasia", label: "Malasia" },
  { value: "malaui", label: "Malaui" },
  { value: "maldivas", label: "Maldivas" },
  { value: "mali", label: "Malí" },
  { value: "malta", label: "Malta" },
  { value: "marruecos", label: "Marruecos" },
  { value: "mauricio", label: "Mauricio" },
  { value: "mauritania", label: "Mauritania" },
  { value: "mexico", label: "México" },
  { value: "micronesia", label: "Micronesia" },
  { value: "moldavia", label: "Moldavia" },
  { value: "monaco", label: "Mónaco" },
  { value: "mongolia", label: "Mongolia" },
  { value: "montenegro", label: "Montenegro" },
  { value: "mozambique", label: "Mozambique" },
  { value: "namibia", label: "Namibia" },
  { value: "nauru", label: "Nauru" },
  { value: "nepal", label: "Nepal" },
  { value: "nicaragua", label: "Nicaragua" },
  { value: "niger", label: "Níger" },
  { value: "nigeria", label: "Nigeria" },
  { value: "noruega", label: "Noruega" },
  { value: "nueva-zelanda", label: "Nueva Zelanda" },
  { value: "oman", label: "Omán" },
  { value: "paises-bajos", label: "Países Bajos" },
  { value: "pakistan", label: "Pakistán" },
  { value: "palaos", label: "Palaos" },
  { value: "panama", label: "Panamá" },
  { value: "papua-nueva-guinea", label: "Papúa Nueva Guinea" },
  { value: "paraguay", label: "Paraguay" },
  { value: "peru", label: "Perú" },
  { value: "polonia", label: "Polonia" },
  { value: "portugal", label: "Portugal" },
  { value: "reino-unido", label: "Reino Unido" },
  { value: "republica-centroafricana", label: "República Centroafricana" },
  { value: "republica-checa", label: "República Checa" },
  { value: "republica-del-congo", label: "República del Congo" },
  { value: "republica-democratica-del-congo", label: "República Democrática del Congo" },
  { value: "republica-dominicana", label: "República Dominicana" },
  { value: "ruanda", label: "Ruanda" },
  { value: "rumania", label: "Rumania" },
  { value: "rusia", label: "Rusia" },
  { value: "samoa", label: "Samoa" },
  { value: "san-cristobal-y-nieves", label: "San Cristóbal y Nieves" },
  { value: "san-marino", label: "San Marino" },
  { value: "san-vicente-y-las-granadinas", label: "San Vicente y las Granadinas" },
  { value: "santa-lucia", label: "Santa Lucía" },
  { value: "santo-tome-y-principe", label: "Santo Tomé y Príncipe" },
  { value: "senegal", label: "Senegal" },
  { value: "serbia", label: "Serbia" },
  { value: "seychelles", label: "Seychelles" },
  { value: "sierra-leona", label: "Sierra Leona" },
  { value: "singapur", label: "Singapur" },
  { value: "siria", label: "Siria" },
  { value: "somalia", label: "Somalia" },
  { value: "sri-lanka", label: "Sri Lanka" },
  { value: "suazilandia", label: "Suazilandia" },
  { value: "sudafrica", label: "Sudáfrica" },
  { value: "sudan", label: "Sudán" },
  { value: "sudan-del-sur", label: "Sudán del Sur" },
  { value: "suecia", label: "Suecia" },
  { value: "suiza", label: "Suiza" },
  { value: "surinam", label: "Surinam" },
  { value: "tailandia", label: "Tailandia" },
  { value: "tanzania", label: "Tanzania" },
  { value: "tayikistan", label: "Tayikistán" },
  { value: "timor-oriental", label: "Timor Oriental" },
  { value: "togo", label: "Togo" },
  { value: "tonga", label: "Tonga" },
  { value: "trinidad-y-tobago", label: "Trinidad y Tobago" },
  { value: "tunez", label: "Túnez" },
  { value: "turkmenistan", label: "Turkmenistán" },
  { value: "turquia", label: "Turquía" },
  { value: "tuvalu", label: "Tuvalu" },
  { value: "ucrania", label: "Ucrania" },
  { value: "uganda", label: "Uganda" },
  { value: "uruguay", label: "Uruguay" },
  { value: "uzbekistan", label: "Uzbekistán" },
  { value: "vanuatu", label: "Vanuatu" },
  { value: "vaticano", label: "Vaticano" },
  { value: "venezuela", label: "Venezuela" },
  { value: "vietnam", label: "Vietnam" },
  { value: "yemen", label: "Yemen" },
  { value: "yibuti", label: "Yibuti" },
  { value: "zambia", label: "Zambia" },
  { value: "zimbabue", label: "Zimbabue" },
]

// All American countries phone codes (North, Central, and South America)
const CODIGOS_AMERICA = [
  { value: "+1", label: "🇺🇸 +1", country: "Estados Unidos/Canadá" },
  { value: "+1-242", label: "🇧🇸 +1-242", country: "Bahamas" },
  { value: "+1-246", label: "🇧🇧 +1-246", country: "Barbados" },
  { value: "+1-264", label: "🇦🇮 +1-264", country: "Anguila" },
  { value: "+1-268", label: "🇦🇬 +1-268", country: "Antigua y Barbuda" },
  { value: "+1-284", label: "🇻🇬 +1-284", country: "Islas Vírgenes Británicas" },
  { value: "+1-340", label: "🇻🇮 +1-340", country: "Islas Vírgenes (EE.UU.)" },
  { value: "+1-345", label: "🇰🇾 +1-345", country: "Islas Caimán" },
  { value: "+1-441", label: "🇧🇲 +1-441", country: "Bermudas" },
  { value: "+1-473", label: "🇬🇩 +1-473", country: "Granada" },
  { value: "+1-649", label: "🇹🇨 +1-649", country: "Islas Turcas y Caicos" },
  { value: "+1-664", label: "🇲🇸 +1-664", country: "Montserrat" },
  { value: "+1-670", label: "🇲🇵 +1-670", country: "Islas Marianas del Norte" },
  { value: "+1-671", label: "🇬🇺 +1-671", country: "Guam" },
  { value: "+1-684", label: "🇦🇸 +1-684", country: "Samoa Americana" },
  { value: "+1-721", label: "🇸🇽 +1-721", country: "Sint Maarten" },
  { value: "+1-758", label: "🇱🇨 +1-758", country: "Santa Lucía" },
  { value: "+1-767", label: "🇩🇲 +1-767", country: "Dominica" },
  { value: "+1-784", label: "🇻🇨 +1-784", country: "San Vicente y las Granadinas" },
  { value: "+1-787", label: "🇵🇷 +1-787", country: "Puerto Rico" },
  { value: "+1-809", label: "🇩🇴 +1-809", country: "República Dominicana" },
  { value: "+1-829", label: "🇩🇴 +1-829", country: "República Dominicana" },
  { value: "+1-849", label: "🇩🇴 +1-849", country: "República Dominicana" },
  { value: "+1-868", label: "🇹🇹 +1-868", country: "Trinidad y Tobago" },
  { value: "+1-869", label: "🇰🇳 +1-869", country: "San Cristóbal y Nieves" },
  { value: "+1-876", label: "🇯🇲 +1-876", country: "Jamaica" },
  { value: "+52", label: "🇲🇽 +52", country: "México" },
  { value: "+53", label: "🇨🇺 +53", country: "Cuba" },
  { value: "+54", label: "🇦🇷 +54", country: "Argentina" },
  { value: "+55", label: "🇧🇷 +55", country: "Brasil" },
  { value: "+56", label: "🇨🇱 +56", country: "Chile" },
  { value: "+57", label: "🇨🇴 +57", country: "Colombia" },
  { value: "+58", label: "🇻🇪 +58", country: "Venezuela" },
  { value: "+501", label: "🇧🇿 +501", country: "Belice" },
  { value: "+502", label: "🇬🇹 +502", country: "Guatemala" },
  { value: "+503", label: "🇸🇻 +503", country: "El Salvador" },
  { value: "+504", label: "🇭🇳 +504", country: "Honduras" },
  { value: "+505", label: "🇳🇮 +505", country: "Nicaragua" },
  { value: "+506", label: "🇨🇷 +506", country: "Costa Rica" },
  { value: "+507", label: "🇵🇦 +507", country: "Panamá" },
  { value: "+509", label: "🇭🇹 +509", country: "Haití" },
  { value: "+51", label: "🇵🇪 +51", country: "Perú" },
  { value: "+591", label: "🇧🇴 +591", country: "Bolivia" },
  { value: "+592", label: "🇬🇾 +592", country: "Guyana" },
  { value: "+593", label: "🇪🇨 +593", country: "Ecuador" },
  { value: "+594", label: "🇬🇫 +594", country: "Guayana Francesa" },
  { value: "+595", label: "🇵🇾 +595", country: "Paraguay" },
  { value: "+596", label: "🇲🇶 +596", country: "Martinica" },
  { value: "+597", label: "🇸🇷 +597", country: "Surinam" },
  { value: "+598", label: "🇺🇾 +598", country: "Uruguay" },
]

type Section = "perfil" | "empresa" | "usuarios" | "notificaciones" | "integraciones" | "seguridad"

interface ConfiguracionesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConfiguracionesModal({ open, onOpenChange }: ConfiguracionesModalProps) {
  const [activeSection, setActiveSection] = useState<Section>("perfil")
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const sections = [
    { id: "perfil" as Section, label: "Perfil", icon: User },
    { id: "empresa" as Section, label: "Empresa", icon: Building2 },
    { id: "usuarios" as Section, label: "Usuarios", icon: Users },
    { id: "integraciones" as Section, label: "Integraciones", icon: Plug },
    { id: "seguridad" as Section, label: "Seguridad", icon: Shield },
  ]

  const handleSave = () => {
    if (activeSection === "empresa") {
      // Show approval toast for company changes
      toast.success(
        "Los cambios en la información de la empresa han sido enviados para revisión. El equipo de Wuilio los aprobará lo antes posible.",
        {
          duration: 5000,
        },
      )
      setIsDirty(false)
    } else {
      // Normal save for other sections
      console.log("[v0] Saving changes...")
      setIsDirty(false)
    }
  }

  const handleCancel = () => {
    console.log("[v0] Canceling changes...")
    setIsDirty(false)
  }

  return (
    <>
      <Toaster position="top-right" richColors />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-3xl w-full h-[600px] p-0 overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-md">
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
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        activeSection === section.id
                          ? "bg-gray-100 text-gray-900"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                      {section.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 overflow-y-auto px-6 max-h-[600px] py-9 relative">
              {activeSection === "perfil" && <PerfilSection onDirty={() => setIsDirty(true)} />}
              {activeSection === "empresa" && <EmpresaSection onDirty={() => setIsDirty(true)} />}
              {activeSection === "usuarios" && <UsuariosSection />}
              {activeSection === "notificaciones" && <NotificacionesSection onDirty={() => setIsDirty(true)} />}
              {activeSection === "integraciones" && <IntegracionesSection />}
              {activeSection === "seguridad" && <SeguridadSection onDirty={() => setIsDirty(true)} />}

              {isDirty && (
                <div className="sticky bottom-0 left-0 right-0 mt-6 border-t bg-background/80 backdrop-blur-sm p-4 flex justify-end gap-3">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-black hover:bg-gray-900 text-white">
                    Guardar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ChangePasswordModal open={showChangePasswordModal} onOpenChange={setShowChangePasswordModal} />
    </>
  )
}

/* === estilos base === */
const inputClass =
  "h-9 w-full rounded-md bg-muted/40 border border-border text-sm text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none px-3 placeholder:text-muted-foreground"
const sectionTitle = "text-xl font-semibold tracking-tight mb-6"

/* === Sección: Perfil === */
function PerfilSection({ onDirty }: { onDirty: () => void }) {
  const [nombre, setNombre] = useState("Juan Carlos Maldonado")
  const [documento, setDocumento] = useState("72326043")
  const [paisNacimiento, setPaisNacimiento] = useState("peru")
  const [codigoPais, setCodigoPais] = useState("+51")
  const [celular, setCelular] = useState("912132679")
  const [cargoEmpresa, setCargoEmpresa] = useState("gerente")
  const [correo, setCorreo] = useState("juan.maldonado@wuilio.com")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarHover, setAvatarHover] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const handleChange = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    onDirty()
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
        onDirty()
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <h2 className="text-xl tracking-tight font-medium">Información Personal</h2>
        <Separator />
      </div>

      <div className="flex items-center gap-4">
        <div
          className="relative cursor-pointer"
          onClick={handleAvatarClick}
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          <Avatar className="h-16 w-16 ring-2 ring-border">
            {avatarUrl && <AvatarImage src={avatarUrl || "/placeholder.svg"} alt="Profile" />}
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>
          {avatarHover && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <Camera className="h-6 w-6 text-white" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
            Administrador
          </Badge>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Nombres y Apellidos</Label>
          <Input value={nombre} onChange={(e) => handleChange(setNombre)(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>Documento</Label>
          <Input
            value={documento}
            onChange={(e) => handleChange(setDocumento)(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>País de Nacimiento</Label>
          <Select
            value={paisNacimiento}
            onValueChange={(value) => {
              setPaisNacimiento(value)
              onDirty()
            }}
          >
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {TODOS_LOS_PAISES.map((pais) => (
                <SelectItem key={pais.value} value={pais.value}>
                  {pais.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Celular</Label>
          <div className="flex gap-2">
            <Select
              value={codigoPais}
              onValueChange={(value) => {
                setCodigoPais(value)
                onDirty()
              }}
            >
              <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CODIGOS_AMERICA.map((codigo) => (
                  <SelectItem key={codigo.value} value={codigo.value}>
                    {codigo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={celular}
              onChange={(e) => handleChange(setCelular)(e.target.value)}
              placeholder="Número"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Cargo en empresa</Label>
          <Input
            value={cargoEmpresa}
            onChange={(e) => handleChange(setCargoEmpresa)(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Correo</Label>
          <Input
            type="email"
            value={correo}
            onChange={(e) => handleChange(setCorreo)(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}

/* === Sección: Empresa === */
function EmpresaSection({ onDirty }: { onDirty: () => void }) {
  const [nombreEmpresa, setNombreEmpresa] = useState("WUILIO PERU S.A.C.")
  const [ruc, setRuc] = useState("20123456789")
  const [tipoEmpresa, setTipoEmpresa] = useState<string[]>(["exportador", "importador"])
  const [showTipoDropdown, setShowTipoDropdown] = useState(false)

  const logoInputRef = useRef<HTMLInputElement>(null)
  const [logoHover, setLogoHover] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  const [pais, setPais] = useState("peru")
  const [region, setRegion] = useState("Lima")
  const [ciudad, setCiudad] = useState("Lima")
  const [localidad, setLocalidad] = useState("Miraflores")
  const [direccionPrincipal, setDireccionPrincipal] = useState("Av. Principal 123")
  const [codigoPostal, setCodigoPostal] = useState("15074")
  const [showLocalidad, setShowLocalidad] = useState(true)
  const [isCheckingCountry, setIsCheckingCountry] = useState(false)

  const [nombreRepresentante, setNombreRepresentante] = useState("Carlos Rodríguez")
  const [documentoRepresentante, setDocumentoRepresentante] = useState("12345678")
  const [paisNacimientoRep, setPaisNacimientoRep] = useState("peru")
  const [codigoPaisRep, setCodigoPaisRep] = useState("+51")
  const [celularRep, setCelularRep] = useState("987654321")
  const [correoRep, setCorreoRep] = useState("carlos.rodriguez@wuilio.com")

  const tiposEmpresa = [
    { id: "exportador", label: "Exportador" },
    { id: "importador", label: "Importador" },
    { id: "agente", label: "Agente de Aduana" },
    { id: "transporte", label: "Transporte" },
    { id: "operador", label: "Operador Logístico" },
    { id: "deposito", label: "Depósito Temporal" },
    { id: "almacen", label: "Almacén" },
  ]

  const countryToISO: Record<string, string> = {
    peru: "PE",
    chile: "CL",
    colombia: "CO",
    mexico: "MX",
    argentina: "AR",
    "estados-unidos": "US",
    canada: "CA",
    francia: "FR",
    alemania: "DE",
    brasil: "BR",
    ecuador: "EC",
    bolivia: "BO",
    paraguay: "PY",
    uruguay: "UY",
    venezuela: "VE",
    espana: "ES",
    "reino-unido": "GB",
    italia: "IT",
    portugal: "PT",
    // Add more mappings as needed
  }

  const checkCountrySubdivisions = async (countryValue: string) => {
    const isoCode = countryToISO[countryValue]
    if (!isoCode) {
      // If we don't have ISO code mapping, show localidad by default
      setShowLocalidad(true)
      return
    }

    setIsCheckingCountry(true)

    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${isoCode}`)

      if (!response.ok) {
        // If API fails, show localidad by default
        setShowLocalidad(true)
        setIsCheckingCountry(false)
        return
      }

      const data = await response.json()
      const country = data[0]

      // Countries with level 3 subdivisions (districts, municipalities, communes)
      // These typically have more granular administrative divisions
      const countriesWithLevel3 = ["PE", "CL", "CO", "MX", "AR", "BR", "EC", "BO", "PY", "UY", "VE"]

      setShowLocalidad(countriesWithLevel3.includes(isoCode))
    } catch (error) {
      console.error("[v0] Error checking country subdivisions:", error)
      // If API fails, show localidad by default
      setShowLocalidad(true)
    } finally {
      setIsCheckingCountry(false)
    }
  }

  useEffect(() => {
    if (pais) {
      checkCountrySubdivisions(pais)
    }
  }, [pais])

  const toggleTipoEmpresa = (id: string) => {
    setTipoEmpresa((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  const getTipoEmpresaLabel = () => {
    if (tipoEmpresa.length === 0) return "Seleccionar"
    if (tipoEmpresa.length === 1) {
      return tiposEmpresa.find((t) => t.id === tipoEmpresa[0])?.label
    }
    return `${tipoEmpresa.length} seleccionados`
  }

  const handleChange = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    onDirty()
  }

  const handleArrayChange = (setter: (value: string[]) => void) => (value: string[]) => {
    setter(value)
    onDirty()
  }

  const handleLogoClick = () => {
    logoInputRef.current?.click()
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoUrl(reader.result as string)
        onDirty()
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <h2 className="text-xl tracking-tight font-medium">Información de Empresa</h2>
        <Separator />
      </div>

      <div className="flex items-center gap-4">
        <div
          className="relative cursor-pointer"
          onClick={handleLogoClick}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          <div className="h-16 w-16 rounded-lg ring-2 ring-border overflow-hidden bg-muted flex items-center justify-center">
            {logoUrl ? (
              <img src={logoUrl || "/placeholder.svg"} alt="Company Logo" className="h-full w-full object-cover" />
            ) : (
              <Building2 className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          {logoHover && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <Camera className="h-6 w-6 text-white" />
            </div>
          )}
          <input
            ref={logoInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            onChange={handleLogoChange}
          />
        </div>
        <div>
          <p className="text-sm font-medium">Logo de la Empresa</p>
          <p className="text-xs text-muted-foreground">Haz clic para cargar</p>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Nombre de Empresa</Label>
          <Input
            value={nombreEmpresa}
            onChange={(e) => handleChange(setNombreEmpresa)(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>RUC</Label>
          <Input value={ruc} onChange={(e) => handleChange(setRuc)(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-2">
          <Label>Tipo de Empresa</Label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTipoDropdown(!showTipoDropdown)}
              className={cn(inputClass, "flex items-center justify-between cursor-pointer hover:bg-muted/60")}
            >
              <span>{getTipoEmpresaLabel()}</span>
              <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showTipoDropdown && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover p-2 shadow-md">
                {tiposEmpresa.map((tipo) => (
                  <div
                    key={tipo.id}
                    className="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer"
                    onClick={() => {
                      toggleTipoEmpresa(tipo.id)
                      onDirty()
                    }}
                  >
                    <Checkbox checked={tipoEmpresa.includes(tipo.id)} />
                    <label className="text-sm cursor-pointer flex-1">{tipo.label}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>País</Label>
          <Select
            value={pais}
            onValueChange={(value) => {
              setPais(value)
              onDirty()
            }}
          >
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {TODOS_LOS_PAISES.map((pais) => (
                <SelectItem key={pais.value} value={pais.value}>
                  {pais.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Región/Estado</Label>
            <InfoTooltip text="Región, provincia, departamento o estado" />
          </div>
          <Input
            value={region}
            onChange={(e) => handleChange(setRegion)(e.target.value)}
            placeholder="Ej: Lima, California, Buenos Aires"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Ciudad</Label>
          <Input
            value={ciudad}
            onChange={(e) => handleChange(setCiudad)(e.target.value)}
            placeholder="Ej: Lima, Santiago"
            className={inputClass}
          />
        </div>

        {showLocalidad && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Localidad</Label>
              <InfoTooltip text="Distrito, municipio o comuna" />
            </div>
            <Input
              value={localidad}
              onChange={(e) => handleChange(setLocalidad)(e.target.value)}
              placeholder="Ej: Miraflores, Providencia"
              className={inputClass}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Dirección Principal</Label>
          <Input
            value={direccionPrincipal}
            onChange={(e) => handleChange(setDireccionPrincipal)(e.target.value)}
            placeholder="Ej: Av. Principal 123, Piso 4"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Código Postal</Label>
          <Input
            value={codigoPostal}
            onChange={(e) => handleChange(setCodigoPostal)(e.target.value)}
            placeholder="Ej: 15074"
            className={inputClass}
          />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Representante Legal</h3>

        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <Label>Nombres y Apellidos</Label>
            <Input
              value={nombreRepresentante}
              onChange={(e) => handleChange(setNombreRepresentante)(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label>Documento</Label>
            <Input
              value={documentoRepresentante}
              onChange={(e) => handleChange(setDocumentoRepresentante)(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label>País de Nacimiento</Label>
            <Select
              value={paisNacimientoRep}
              onValueChange={(value) => {
                setPaisNacimientoRep(value)
                onDirty()
              }}
            >
              <SelectTrigger className={inputClass}>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {TODOS_LOS_PAISES.map((pais) => (
                  <SelectItem key={pais.value} value={pais.value}>
                    {pais.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Celular</Label>
            <div className="flex gap-2">
              <Select
                value={codigoPaisRep}
                onValueChange={(value) => {
                  setCodigoPaisRep(value)
                  onDirty()
                }}
              >
                <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CODIGOS_AMERICA.map((codigo) => (
                    <SelectItem key={codigo.value} value={codigo.value}>
                      {codigo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={celularRep}
                onChange={(e) => handleChange(setCelularRep)(e.target.value)}
                placeholder="Número"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Correo</Label>
            <Input
              type="email"
              value={correoRep}
              onChange={(e) => handleChange(setCorreoRep)(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Documentos</h3>

        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <Label>Ficha RUC</Label>
            <div className="flex items-center gap-2">
              <Input type="file" accept=".pdf,.jpg,.png" className={inputClass} onChange={() => onDirty()} />
              <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Vigencia de Poder</Label>
            <div className="flex items-center gap-2">
              <Input type="file" accept=".pdf,.jpg,.png" className={inputClass} onChange={() => onDirty()} />
              <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>ID Representante Legal</Label>
            <div className="flex items-center gap-2">
              <Input type="file" accept=".pdf,.jpg,.png" className={inputClass} onChange={() => onDirty()} />
              <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* === Sección: Usuarios === */
function UsuariosSection() {
  const [view, setView] = useState<"list" | "add" | "edit">("list")
  const [editingUserId, setEditingUserId] = useState<number | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const USERS_PER_PAGE = 7

  const [users, setUsers] = useState([
    {
      id: 1,
      nombre: "Juan Carlos Maldonado Martinez",
      email: "juan.maldonado@wuilio.com",
      tipo: "Administrador",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Bruno Fatur Gonzales",
      email: "bruno.fatur@wuilio.com",
      tipo: "Miembro",
      estado: "Activo",
    },
    {
      id: 3,
      nombre: "Maria Rodriguez",
      email: "maria.rodriguez@wuilio.com",
      tipo: "Miembro",
      estado: "Activo",
    },
    {
      id: 4,
      nombre: "Carlos Mendoza",
      email: "carlos.mendoza@wuilio.com",
      tipo: "Miembro",
      estado: "Inactivo",
    },
  ])

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase()
    return user.nombre.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
  })

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const startIndex = (currentPage - 1) * USERS_PER_PAGE
  const endIndex = startIndex + USERS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handleAddUser = () => {
    setView("add")
    setEditingUserId(null)
  }

  const handleEditUser = (userId: number) => {
    setView("edit")
    setEditingUserId(userId)
  }

  const handleBack = () => {
    setView("list")
    setEditingUserId(null)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  if (view === "add" || view === "edit") {
    return <UserFormView onBack={handleBack} userId={editingUserId} isEdit={view === "edit"} />
  }

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl tracking-tight font-medium">Gestión de Usuarios</h2>
          <Button onClick={handleAddUser} size="sm" className="bg-black hover:bg-gray-900 text-white">
            + Agregar Usuario
          </Button>
        </div>
        <Separator />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(inputClass, "pl-9")}
        />
      </div>

      <div className="space-y-2">
        {paginatedUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">No se encontraron usuarios</div>
        ) : (
          paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-4 py-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border px-4 pl-0 bg-secondary"
            >
              <div className="flex-1 min-w-0 max-w-xs">
                <p className="font-medium text-sm truncate px-2.5">{user.nombre}</p>
                <p className="text-xs text-muted-foreground truncate px-2.5">{user.email}</p>
              </div>

              <div className="flex items-center shrink-0 gap-2.5 pr-0">
                <Badge
                  variant="secondary"
                  className={cn(
                    "shrink-0",
                    user.tipo === "Administrador"
                      ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                      : "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20",
                  )}
                >
                  {user.tipo}
                </Badge>

                <Badge
                  variant="secondary"
                  className={cn(
                    "shrink-0 w-20 justify-center",
                    user.estado === "Activo"
                      ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                      : "bg-red-500/10 text-red-600 hover:bg-red-500/20",
                  )}
                >
                  {user.estado}
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                      <MoreHorizontalIcon className="h-4 w-4 pr-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditUser(user.id)}>Editar permisos</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredUsers.length > USERS_PER_PAGE && (
        <div className="flex justify-end items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageClick(page)}
              className={cn("h-8 w-8 p-0", currentPage === page && "bg-black hover:bg-gray-900 text-white")}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

function UserFormView({ onBack, userId, isEdit }: { onBack: () => void; userId: number | null; isEdit: boolean }) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [rol, setRol] = useState<"administrador" | "miembro">("miembro")

  // Permissions state - Operaciones
  const [operacionesEnabled, setOperacionesEnabled] = useState(false)
  const [controlTowerPermission, setControlTowerPermission] = useState("ver")
  const [ordenesPermission, setOrdenesPermission] = useState("ver")
  const [programacionPermission, setProgramacionPermission] = useState("ver")

  // Permissions state - Finanzas
  const [finanzasEnabled, setFinanzasEnabled] = useState(false)
  const [facturasPermission, setFacturasPermission] = useState("ver")
  const [tarifarioPermission, setTarifarioPermission] = useState("ver")

  // Permissions state - Maestro
  const [maestroEnabled, setMaestroEnabled] = useState(false)
  const [clientesPermission, setClientesPermission] = useState("ver")
  const [logisticaPermission, setLogisticaPermission] = useState("ver")
  const [plantasPermission, setPlantasPermission] = useState("ver")
  const [productosPermission, setProductosPermission] = useState("ver")

  const handleRolChange = (value: string) => {
    setRol(value as "administrador" | "miembro")
    // Reset permissions when changing role
    if (value === "administrador") {
      setOperacionesEnabled(false)
      setFinanzasEnabled(false)
      setMaestroEnabled(false)
    }
  }

  const handleSave = () => {
    console.log("[v0] Saving user...")
    onBack()
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>

      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{isEdit ? "Editar Usuario" : "Agregar Usuario"}</h3>
          <p className="text-muted-foreground text-sm">Completa la información del usuario</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Nombre completo</Label>
          <Input
            placeholder="Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="usuario@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Rol</Label>
          <Select value={rol} onValueChange={handleRolChange}>
            <SelectTrigger className={inputClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="administrador">Administrador</SelectItem>
              <SelectItem value="miembro">Miembro</SelectItem>
            </SelectContent>
          </Select>
          {rol === "administrador" && (
            <p className="text-xs text-muted-foreground">
              Los administradores tienen acceso completo a todos los módulos
            </p>
          )}
        </div>

        {rol === "miembro" && (
          <>
            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Permisos por módulo</h4>

              {/* Operaciones */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <span className="font-medium">Operaciones</span>
                  </div>
                  <Switch checked={operacionesEnabled} onCheckedChange={setOperacionesEnabled} />
                </div>

                {operacionesEnabled && (
                  <div className="ml-13 space-y-2 pl-4 border-l-2 border-muted">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Control Tower</span>
                      <Select value={controlTowerPermission} onValueChange={setControlTowerPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Órdenes</span>
                      <Select value={ordenesPermission} onValueChange={setOrdenesPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Programación</span>
                      <Select value={programacionPermission} onValueChange={setProgramacionPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Finanzas */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600" strokeWidth={1.5} />
                    </div>
                    <span className="font-medium">Finanzas</span>
                  </div>
                  <Switch checked={finanzasEnabled} onCheckedChange={setFinanzasEnabled} />
                </div>

                {finanzasEnabled && (
                  <div className="ml-13 space-y-2 pl-4 border-l-2 border-muted">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Facturas</span>
                      <Select value={facturasPermission} onValueChange={setFacturasPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tarifario</span>
                      <Select value={tarifarioPermission} onValueChange={setTarifarioPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Maestro */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Grid3x3 className="h-5 w-5 text-green-600" strokeWidth={1.5} />
                    </div>
                    <span className="font-medium">Maestro</span>
                  </div>
                  <Switch checked={maestroEnabled} onCheckedChange={setMaestroEnabled} />
                </div>

                {maestroEnabled && (
                  <div className="ml-13 space-y-2 pl-4 border-l-2 border-muted">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Clientes</span>
                      <Select value={clientesPermission} onValueChange={setClientesPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Logística</span>
                      <Select value={logisticaPermission} onValueChange={setLogisticaPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Plantas</span>
                      <Select value={plantasPermission} onValueChange={setPlantasPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Productos</span>
                      <Select value={productosPermission} onValueChange={setProductosPermission}>
                        <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ver">Ver</SelectItem>
                          <SelectItem value="editar">Editar</SelectItem>
                          <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <Separator />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-black hover:bg-gray-900 text-white">
            {isEdit ? "Guardar Cambios" : "Invitar"}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* === Notificaciones === */
function NotificacionesSection({ onDirty }: { onDirty: () => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <h2 className="text-xl tracking-tight font-medium">Notificaciones</h2>
        <Separator />
      </div>

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Notificaciones por correo</Label>
          <Select defaultValue="all" onValueChange={() => onDirty()}>
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
          <Switch defaultChecked onCheckedChange={() => onDirty()} />
        </div>
      </div>
    </div>
  )
}

/* === Integraciones === */
function IntegracionesSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <h2 className="text-xl tracking-tight font-medium">Integraciones</h2>
        <Separator />
      </div>
      <p className="text-sm text-muted-foreground">Conecta servicios externos y APIs. (Pronto Disponible) </p>
    </div>
  )
}

/* === Seguridad === */
function SeguridadSection({ onDirty }: { onDirty: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleChange = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    onDirty()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <h2 className="text-xl tracking-tight font-medium">Seguridad</h2>
        <Separator />
      </div>

      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <Label>Contraseña Actual</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => handleChange(setCurrentPassword)(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Nueva Contraseña</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => handleChange(setNewPassword)(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Confirmar Contraseña</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => handleChange(setConfirmPassword)(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}

/* === Modales === */
function AddUserModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [rol, setRol] = useState<"administrador" | "miembro">("miembro")

  // Permissions state
  const [operacionesEnabled, setOperacionesEnabled] = useState(false)
  const [finanzasEnabled, setFinanzasEnabled] = useState(false)
  const [maestroEnabled, setMaestroEnabled] = useState(false)

  const [controlTowerPermission, setControlTowerPermission] = useState("ver")
  const [ordenesPermission, setOrdenesPermission] = useState("ver")

  const handleRolChange = (value: string) => {
    setRol(value as "administrador" | "miembro")
    // Reset permissions when changing role
    if (value === "administrador") {
      setOperacionesEnabled(false)
      setFinanzasEnabled(false)
      setMaestroEnabled(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Agregar Usuario</h3>
              <p className="text-muted-foreground text-sm">Completa la información del usuario</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label>Rol</Label>
              <Select value={rol} onValueChange={handleRolChange}>
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="miembro">Miembro</SelectItem>
                </SelectContent>
              </Select>
              {rol === "administrador" && (
                <p className="text-xs text-muted-foreground">
                  Los administradores tienen acceso completo a todos los módulos
                </p>
              )}
            </div>

            {rol === "miembro" && (
              <>
                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Permisos por módulo</h4>

                  {/* Operaciones */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">Operaciones</span>
                      </div>
                      <Switch checked={operacionesEnabled} onCheckedChange={setOperacionesEnabled} />
                    </div>

                    {operacionesEnabled && (
                      <div className="ml-13 space-y-2 pl-4 border-l-2 border-muted">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Control Tower</span>
                          <Select value={controlTowerPermission} onValueChange={setControlTowerPermission}>
                            <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ver">Ver</SelectItem>
                              <SelectItem value="editar">Editar</SelectItem>
                              <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Órdenes</span>
                          <Select value={ordenesPermission} onValueChange={setOrdenesPermission}>
                            <SelectTrigger className={cn(inputClass, "w-[140px]")}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ver">Ver</SelectItem>
                              <SelectItem value="editar">Editar</SelectItem>
                              <SelectItem value="sin-acceso">Sin acceso</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Finanzas */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="font-medium">Finanzas</span>
                      </div>
                      <Switch checked={finanzasEnabled} onCheckedChange={setFinanzasEnabled} />
                    </div>
                  </div>

                  {/* Maestro */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <Grid3x3 className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="font-medium">Maestro</span>
                      </div>
                      <Switch checked={maestroEnabled} onCheckedChange={setMaestroEnabled} />
                    </div>
                  </div>
                </div>
              </>
            )}

            <Separator />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button className="bg-black hover:bg-gray-900 text-white">Guardar</Button>
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

function InfoTooltip({ text }: { text: string }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground hover:bg-muted-foreground/20 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="text-xs font-medium">i</span>
      </button>
      {showTooltip && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-64 px-3 py-2 text-xs bg-popover border border-border rounded-md shadow-lg">
          {text}
        </div>
      )}
    </div>
  )
}
